#region Using Statements

using Box.V2;
using Box.V2.Auth;
using Box.V2.Config;
using Box.V2.Exceptions;
using Box.V2.Models;
using Database.Services;
using front_end.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Model;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

#endregion Using Statements

namespace front_end.Controllers
{
    /// <summary>
    /// This Controller handles all communication with Box SDK.
    /// </summary>
    [Route("api/[controller]")]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Await.Warning", "CS4014:Await.Warning")]
    public class BoxController : Controller
    {
        private IConfiguration Configuration { get; set; }
        private IDataProtector _protector { get; set; }
        private readonly ILogger _logger;
        private IHostingEnvironment hostingEnv;

        /// <summary>
        /// Constructor to load Configuration, logger, environment and DataProvider.
        /// </summary>
        /// <param name="config"></param>
        /// <param name="provider"></param>
        /// <param name="logger"></param>
        /// <param name="env"></param>
        public BoxController(IConfiguration config, IDataProtectionProvider provider, ILogger<BoxController> logger, IHostingEnvironment env)
        {
            Configuration = config;
            _protector = provider.CreateProtector(GetType().FullName);
            _logger = logger;
            this.hostingEnv = env;
        }

        /// <summary>
        /// Authenticates the user, exchange authorization code with access and refresh token and produce encrypted cookie.
        /// </summary>
        /// <param name="code"></param>
        ///  <response code="400">Error model</response>
        [Route("Authenticate")]
        [HttpGet]
        public async Task<IActionResult> Authenticate(string code)
        {
            try
            {
                BoxClient client = GetClient();
                OAuthSession Oauth = await client.Auth.AuthenticateAsync(code);
                CookieOptions options = new CookieOptions
                {
                    Path = "/api/Box",
                    Expires = DateTime.Now.AddDays(1),
                    HttpOnly = true
                };

                Response.Cookies.Append("boxCred", _protector.Protect(JsonConvert.SerializeObject(Oauth)), options);
                _logger.LogInformation("Authenticated user using Authorization code => " + code);
                return LocalRedirect("/explorer");
            }
            catch (BoxException exp)
            {
                var a = new { code = exp.StatusCode, message = JsonConvert.DeserializeObject(exp.Message) };
                return Json(a);
            }
        }

        /// <summary>
        /// Upload received files and give back updated files inside the current folder.
        /// </summary>
        /// <param name="currentFolderID"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [SwaggerResponse((int)(HttpStatusCode.OK), Type = typeof(Content[]))]
        [Route("Upload/{currentFolderID}")]
        [HttpPost]
        public async Task<IActionResult> Upload(string currentFolderID)
        { 
            var client = Initialise();

            var files = Request.Form.Files;
            foreach (var file in files)
            {
                var filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
                BoxFile newFile;

                // Create request object with name and parent folder the file should be uploaded to

                int bufferSize = 4096;
                using (FileStream fs = System.IO.File.Create(filename, bufferSize, FileOptions.DeleteOnClose))
                {
                    file.CopyTo(fs);
                    BoxFileRequest req = new BoxFileRequest()
                    {
                        Name = filename,
                        Parent = new BoxRequestEntity() { Id = currentFolderID }
                    };
                    try
                    {
                        newFile = await client.FilesManager.UploadAsync(req, fs);

                        // VERIFY: MATT: Can you get the details for client from the client object, like name, email etc.
                        Task.Run(() => { RecordFileAction(client, newFile.Id, "Upload"); });
                    }
                    catch (BoxException exp)
                    {
                        return StatusCode(Convert.ToInt32(exp.StatusCode));
                    }
                }
            }
            return await GetBoxFolderItems(client, currentFolderID);
        }

        /// <summary>
        /// Get files and folders inside the folder with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [SwaggerResponse((int)(HttpStatusCode.OK), Type = typeof(Content[]))]
        [Route("GetFolderItems/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetFolderItems(string id)
        {
            try
            {
                var client = Initialise();
                _logger.LogInformation("Getting Folder items for folder => " + id);
                return await GetBoxFolderItems(client, id);
            }
            catch (ArgumentNullException)
            {
                return StatusCode(401);
            }
            catch (HttpRequestException)
            {
                return StatusCode(404);
            }
            //catch (Exception)
            //{
            //    return StatusCode(500);
            //}
        }

        /// <summary>
        /// Run a search query to search for files and folders.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [SwaggerResponse((int)(HttpStatusCode.OK), Type = typeof(Content[]))]
        [Route("Search/{query}")]
        [HttpGet]
        public async Task<IActionResult> Search(string query)
        {
            var client = Initialise();
            _logger.LogInformation("Searching with keyword -> " + query);
            var boxCollection = await client.SearchManager.SearchAsync(query);
            return Json(GetCustomCollection(boxCollection));
        }

        /// <summary>
        /// Get Preview Link for the file with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [Route("GetPreview/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetPreview(string id)
        {
            var client = Initialise();
            _logger.LogInformation("Getting Preview Link for file => " + id);
            ////log this preview in database.
            Task.Run(() => { RecordFileAction(client, id, "Preview"); });
            try
            {
                return Json(await client.FilesManager.GetPreviewLinkAsync(id));
            }
            catch (BoxException exp)
            {
                return StatusCode(Convert.ToInt32(exp.StatusCode));
            }
        }

        /// <summary>
        /// Rename the file/folder and give back updates items in the currently open folder.
        /// </summary>
        /// <param name="newName"></param>
        /// <param name="uid"></param>
        /// <param name="currentFolderID"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [SwaggerResponse((int)(HttpStatusCode.OK), Type = typeof(Content[]))]
        [Route("Rename/{newName}/{uid}/{currentFolderID}/{type}")]
        [HttpGet]
        public async Task<IActionResult> Rename(string newName, string uid, string currentFolderID, string type)
        {
            try
            {
                var client = Initialise();
                if (type == "file")
                {
                    BoxFile fileAfterRename = await client.FilesManager.UpdateInformationAsync(new BoxFileRequest() { Id = uid, Name = newName });
                }
                else if (type == "folder")
                {
                    BoxFolder boxFolder = await client.FoldersManager.UpdateInformationAsync(new BoxFolderRequest() { Id = uid, Name = newName });
                }

                Task.Run(() => { RecordFileAction(client, uid, "Rename"); });
                return await GetBoxFolderItems(client, currentFolderID);
            }
            catch (BoxException exp)
            {
                return StatusCode(Convert.ToInt32(exp.StatusCode));
            }
        }

        /// <summary>
        /// Get Shared link for a file/folder.
        /// </summary>
        /// <param name="type"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [Route("GetSharedLink/{type}/{id}")]
        [HttpGet]
        public async Task<JsonResult> GetSharedLink(string type, string id)
        {
            var client = Initialise();
            var request = new BoxSharedLinkRequest() { Access = BoxSharedLinkAccessType.open };
            if (type == "file")
            {
                BoxFile file = await client.FilesManager.CreateSharedLinkAsync(id, request);
                _logger.LogInformation("Getting Shared link for File =>" + id);

                //Logging action to Database
                Task.Run(() => { RecordFileAction(client, id, "Share Link"); });

                return Json(file.SharedLink.Url);
            }
            var folder = await client.FoldersManager.CreateSharedLinkAsync(id, request);
            _logger.LogInformation("Getting Shared link for Folder =>" + id);
            return Json(folder.SharedLink.Url);
        }

        /// <summary>
        /// Delete a file/folder and give back updated items in currently open folder.
        /// </summary>
        /// <param name="type"></param>
        /// <param name="id"></param>
        /// <param name="currentFolderID"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [SwaggerResponse((int)(HttpStatusCode.OK), Type = typeof(Content[]))]
        [Route("Delete/{type}/{id}/{currentFolderID}")]
        [HttpGet]
        public async Task<IActionResult> Delete(string type, string id, string currentFolderID)
        {
            var client = Initialise();

            if (type == "file")
            {
                _logger.LogInformation("Deleting File =>" + id);
                Task.Run(() => { RecordFileAction(client, id, "Delete"); });
                await client.FilesManager.DeleteAsync(id);
                return await GetBoxFolderItems(client, currentFolderID);
            }
            _logger.LogInformation("Deleting Folder =>" + id);
            await client.FoldersManager.DeleteAsync(id, true);

            return await GetBoxFolderItems(client, currentFolderID);
        }

        /// <summary>
        /// Download the file with the given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("Download/{id}")]
        [HttpGet]
        public async Task<FileStreamResult> Download(string id)
        {
            var client = Initialise();
            var stream = await client.FilesManager.DownloadStreamAsync(id);
            var information = await client.FilesManager.GetInformationAsync(id);
            Task.Run(() => { RecordFileAction(client, id, "Download"); });
            return new FileStreamResult(stream, GetMimeTypeByWindowsRegistry(information.Name));
        }

        /// <summary>
        /// Create a new folder with the given name inside the given folder id.
        /// </summary>
        /// <param name="parentID"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [Produces("application/json")]
        [SwaggerResponse((int)(HttpStatusCode.OK), Type = typeof(Content[]))]
        [Route("NewFolder/{parentID}/{name}")]
        [HttpGet]
        public async Task<IActionResult> NewFolder(string parentID, string name)
        {
            if (parentID == "root") { parentID = "0"; }
            var client = Initialise();
            var resp = await client.FoldersManager.CreateAsync(
                new BoxFolderRequest() { Name = name, Parent = new BoxRequestEntity() { Id = parentID } });
            return await GetBoxFolderItems(client, parentID);
        }

        /// <summary>
        /// Log out the user by deleting the Cookie.
        /// </summary>
        /// <returns></returns>
        [Route("Logout")]
        [HttpGet]
        public IActionResult Logout()
        {
            CookieOptions options = new CookieOptions
            {
                Path = "/api/Box",
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true
            };
            Response.Cookies.Append("boxCred", "", options);
            return StatusCode(200);
        }

        private BoxClient Initialise()
        {
            _logger.LogDebug("A new client was initialised");
            string cookie = Request.Cookies["boxCred"];

            cookie = _protector.Unprotect(cookie);
            _logger.LogInformation("Decrypting Cookie");
            return GetClientFromCookie(cookie);
        }

        /// <summary>
        /// GetClient returns BoxClient initialising it with credentials using an OAuthSession from Cookie.
        /// </summary>
        /// <param name="Cookie"></param>
        /// <returns></returns>
        private BoxClient GetClientFromCookie(string Cookie)
        {
            _logger.LogInformation("Getting client from Cookie");
            OAuthSession oAuth = JsonConvert.DeserializeObject<OAuthSession>(Cookie);
            BoxClient client = new BoxClient(new BoxConfig(Configuration["BoxClientId"], Configuration["BoxClientSecret"], new Uri(Configuration["BoxRedirectURL"])), oAuth);
            client.Auth.SessionAuthenticated += Auth_SessionAuthenticated;
            client.Auth.SessionInvalidated += Auth_SessionInvalidated;
            return client;
        }

        private BoxClient GetClient()
        {
            _logger.LogInformation("Initialising a Completely new BoxClient");
            BoxClient client = new BoxClient(new BoxConfig(Configuration["BoxClientId"], Configuration["BoxClientSecret"], new Uri(Configuration["BoxRedirectURL"])));
            return client;
        }

        /// <summary>
        /// GetBoxFolderItems is used to get Box Folder items using FolderManager.GetFolderItemsAsync.
        /// </summary>
        /// <param name="client"> Client that need the folder items.</param>
        /// <param name="ID"> ID of folder.</param>
        /// <returns></returns>
        private async Task<JsonResult> GetBoxFolderItems(BoxClient client, string ID)
        {
            _logger.LogInformation("Filtering data according to what we need");
            var items = await client.FoldersManager.GetFolderItemsAsync(ID, 100000, 0,
                new List<string>()
                {
                    // specify the fields you want to receive.
                    // Large Number of fields have performance implications.
                    BoxFolder.FieldName,
                    BoxFile.FieldName,
                    BoxFolder.FieldSize,
                    BoxFile.FieldSize,
                    BoxFolder.FieldModifiedAt,
                    BoxFile.FieldModifiedAt,

                    //BoxFolder.FieldCreatedAt,
                    //BoxFolder.FieldCreatedBy,
                    //BoxFolder.FieldOwnedBy,
                    //BoxFolder.FieldPathCollection,
                    //BoxFolder.FieldSharedLink,
                    //BoxFile.FieldExtension,
                    //BoxFile.FieldExpiringEmbedLink,
                    //BoxFile.FieldPathCollection,

                    BoxFile.FieldSha1,
                    //BoxFile.FieldSharedLink

                    //BoxFile.FieldSha1,
                    //BoxFile.FieldSharedLink,
                });

            return Json(GetCustomCollection(items));
        }

        private Content[] GetCustomCollection(BoxCollection<BoxItem> items)
        {
            Content[] list = new Content[items.TotalCount];
            for (int i = 0; i < items.TotalCount; i++)
            {
                if (items.Entries[i].Type == "file")
                {
                    BoxFile boxFile = (BoxFile)items.Entries[i];
                    list[i] = GetCustomFileObject(boxFile);
                    continue;
                }
                if (items.Entries[i].Type == "folder")
                {
                    BoxFolder boxFolder = (BoxFolder)items.Entries[i];
                    list[i] = GetCustomFolderObject(boxFolder);
                }
            }
            return list;
        }

        /// <summary>
        /// GetCustomFileObject returns custom content from BoxFile Object.
        /// </summary>
        /// <param name="boxFile"></param>
        /// <returns></returns>
        private Content GetCustomFileObject(BoxFile boxFile)
        {
            Content cont = new Content();
            cont.Type = boxFile.Type;
            cont.Id = boxFile.Id;
            cont.FileName = boxFile.Name;
            cont.Size = boxFile.Size.ToString();
            cont.Hash = boxFile.Sha1;
            cont.LastModified = boxFile.ModifiedAt.ToString();
            cont.Secure = "false";
            return cont;
        }

        /// <summary>
        /// GetCustomFolder returns Content from BoxFolder object.
        /// </summary>
        /// <param name="boxFolder"></param>
        /// <returns></returns>
        private Content GetCustomFolderObject(BoxFolder boxFolder)
        {
            Content cont = new Content
            {
                Type = boxFolder.Type,
                Id = boxFolder.Id,
                FileName = boxFolder.Name,
                Size = boxFolder.Size.ToString(),
                LastModified = boxFolder.ModifiedAt.ToString(),
                Secure = "false"
            };
            return cont;
        }

        private void Auth_SessionInvalidated(object sender, EventArgs e)
        {
            _logger.LogInformation("The session was invalidated, i will renew it myself");
            //do nothing
        }

        private void Auth_SessionAuthenticated(object sender, SessionAuthenticatedEventArgs e)
        {
            _logger.LogInformation("Don't worry! Access Token was renewed => " + Json(e.Session));
            CookieOptions options = new CookieOptions
            {
                Path = "/api/Box",
                Expires = DateTime.Now.AddDays(1),
                HttpOnly = true
            };
            Response.Cookies.Append("boxCred", _protector.Protect(JsonConvert.SerializeObject(e.Session)), options);
        }

        private async Task<Content> GetBoxItem(BoxClient client, string ID)
        {
            _logger.LogInformation("Retrieving data needed to record the file action");
            //String[] fields = new String[1] { BoxFile.FieldSha1 };
            BoxFile boxFile = await client.FilesManager.GetInformationAsync(ID);
            Content content = GetCustomFileObject(boxFile);
            return content;
        }

        private void RecordFileAction(BoxClient client, string fileID, string actionType)
        {
            FileActionController fileActionController = new FileActionController(Configuration);

            Content file = GetBoxItem(client, fileID).Result;
            BoxUser user = client.UsersManager.GetCurrentUserInformationAsync(new String[2] { "name", "login" }).Result;
            string userName = user.Name;
            string userEmail = user.Login;
            System.Diagnostics.Debug.WriteLine(userName + " " + userEmail);

            FileAction action = new FileAction(
                fileID,
                file.Hash,
                "Box",
                userName,
                userEmail,
                actionType,
                DateTime.Now
            );
            fileActionController.RecordFileAction(action);
        }

        private string GetMimeTypeByWindowsRegistry(string fileNameOrExtension)
        {
            string mimeType = "application/unknown";
            string ext = (fileNameOrExtension.Contains(".")) ? System.IO.Path.GetExtension(fileNameOrExtension).ToLower() : "." + fileNameOrExtension;
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null) mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }
    }
}