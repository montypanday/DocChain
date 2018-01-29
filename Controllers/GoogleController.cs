using Database.Services;
using front_end.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Drive.v3;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DriveData = Google.Apis.Drive.v3.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace front_end.Controllers
{
    /// <summary>
    /// GoogleController manages all communication with Google Drive SDK.
    /// </summary>
    [Route("api/[controller]")]
    public class GoogleController : Controller
    {
        /// <summary>
        /// Configuration is used to access User credentials during development.
        /// </summary>
        public IConfiguration Configuration { get; set; }

        /// <summary>
        /// _protector protects/encrypt data, any data protected by it can only be Unprotected by the same protector instance.
        /// </summary>
        private IDataProtector _protector { get; set; }

        /// <summary>
        /// Used to Log in console and file.
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Initialise Google Controller.
        /// </summary>
        /// <param name="config"></param>
        /// <param name="provider"></param>
        /// <param name="logger"></param>
        public GoogleController(IConfiguration config, IDataProtectionProvider provider, ILogger<BoxController> logger)
        {
            Configuration = config;
            _protector = provider.CreateProtector(GetType().FullName);
            _logger = logger;
        }

        /// <summary>
        /// Reads Client Secrets from Configuration.
        /// </summary>
        /// <returns></returns>
        private ClientSecrets GetClientSecrets() => new ClientSecrets() { ClientId = Configuration["GoogleClientID"], ClientSecret = Configuration["GoogleClientSecret"] };

        /// <summary>
        /// Returns UserCredential after reading and Decrypting Cookie.
        /// </summary>
        /// <returns></returns>
        private UserCredential GetUserCredentials()
        {
            string Cookie = Request.Cookies["GoogleCred"];
            Cookie = _protector.Unprotect(Cookie);
            TokenResponse tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(Cookie);
            return new UserCredential(
                new GoogleAuthorizationCodeFlow
                (
                     new GoogleAuthorizationCodeFlow.Initializer
                     {
                         ClientSecrets = GetClientSecrets()
                     }
                ),
                "user", tokenResponse);
        }


        /// <summary>
        /// Creates DriveService after reading UserCredentials from encryted Cookie.
        /// </summary>
        /// <returns></returns>
        private DriveService GetService()
        {
            UserCredential credential = GetUserCredentials();
            return new DriveService(new Google.Apis.Services.BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "LINCD-Blockchain"
            });
        }

        /// <summary>
        /// Authenticate is used to exchange Google authorization code with Google access token and refresh token which is then stored in encryted cookie.
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [Route("Authenticate")]
        [HttpGet]
        public async Task<LocalRedirectResult> Authenticate(string code)
        {
            HttpClient client = new HttpClient();
            _logger.LogWarning("I was redirected");
            HttpResponseMessage response = await client.PostAsync("https://www.googleapis.com/oauth2/v4/token?code=" + code + "&client_id=" + Configuration["GoogleClientID"] + "&redirect_uri=" + Configuration["GoogleRedirectURL"] + "&client_secret=" + Configuration["GoogleClientSecret"] + "&grant_type=authorization_code", new StringContent(""));
            //TokenResponse token = new TokenResponse() { };
            string tokenString = await response.Content.ReadAsStringAsync();
            _logger.LogInformation(tokenString);

            if (response.IsSuccessStatusCode)
            {
                CookieOptions options = new CookieOptions
                {
                    Path = "/api/Google",
                    Expires = DateTime.Now.AddDays(1),
                    HttpOnly = true
                };
                TokenResponse tokenresponse = JsonConvert.DeserializeObject<TokenResponse>(tokenString);

                Response.Cookies.Append("GoogleCred", _protector.Protect(JsonConvert.SerializeObject(tokenresponse)), options);
            }
            return LocalRedirect("/driveExplorer");
        }

        /// <summary>
        /// GetFolderItems accepts folder id and returns folder items.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("GetFolderItems/{id}")]
        [HttpGet]
        public IActionResult GetFolderItems(string id)
        {
            DriveService service = GetService();
            _logger.LogInformation("Getting Folder items for Folder -> " + id);
            return GetGoogleFolderItems(service, id);
        }

        /// <summary>
        /// Upload accepts files sent in a POST request, which are uploaded inside a folder using a given folder id.
        /// </summary>
        /// <param name="currentFolderID"></param>
        /// <returns></returns>
        [Route("Upload/{currentFolderID}")]
        [HttpPost]
        public IActionResult Upload(string currentFolderID)
        {
            var service = GetService();

            var files = Request.Form.Files;
            foreach (var file in files)
            {
                var filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
                var requestCheckIfNameExists = service.Files.List();
                requestCheckIfNameExists.PageSize = 2;
                requestCheckIfNameExists.Q = "name = '" + filename + "' and '" + currentFolderID + "' in parents";
                requestCheckIfNameExists.Fields = @"files(name)";
                var list = requestCheckIfNameExists.Execute().Files;
                if (list.Count != 0)
                {
                    continue;
                }

                int bufferSize = 4096;
                using (FileStream fs = System.IO.File.Create(filename, bufferSize, FileOptions.DeleteOnClose))
                {
                    file.CopyTo(fs);
                    var fileMetadata = new Google.Apis.Drive.v3.Data.File()
                    {
                        Name = filename,
                        Parents = new List<string>() { currentFolderID }
                    };
                    FilesResource.CreateMediaUpload request;

                    request = service.Files.Create(fileMetadata, fs, file.ContentType);
                    request.Fields = "id";
                    request.Upload();
                    //RecordFileAction(GetDriveFile(request.ResponseBody.Id), service, "Upload");

                }
            }
            return GetGoogleFolderItems(service, currentFolderID);
        }

        /// <summary>
        /// Downloads and returns the file/folder as stream.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("Download/{id}")]
        [HttpGet]
        public IActionResult Download(string id)
        {
            var service = GetService();
            var request_1 = service.Files.Get(id);
            var file = request_1.Execute();
            var request_2 = service.Files.Get(id);
            var stream = new MemoryStream();
            request_2.Download(stream);
            return new FileStreamResult(stream, file.MimeType);
        }

        /// <summary>
        /// Search runs a search query using the given string and returns the results.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Route("Search/{query}")]
        [HttpGet]
        public IActionResult Search(string query)
        {
            var service = GetService();
            FilesResource.ListRequest request = service.Files.List();
            request.PageSize = 100;
            request.PrettyPrint = true;
            request.Q = "name contains '" + query + "' and trashed = false";
            request.Fields = @"files(id,name,kind,md5Checksum,modifiedTime,mimeType,iconLink,size)";
            IList<Google.Apis.Drive.v3.Data.File> files = request.Execute().Files;
            return Json(ConvertToSend(files));
        }

        /// <summary>
        /// NewFolder is used to create a new folder with the given name and parent folder id.
        /// </summary>
        /// <param name="parentID"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [Route("NewFolder/{parentID}/{name}")]
        [HttpGet]
        public IActionResult NewFolder(string parentID, string name)
        {
            var service = GetService();
            var newFolder = new Google.Apis.Drive.v3.Data.File()
            {
                Name = name,
                Parents = new List<string>() { parentID },
                MimeType = "application/vnd.google-apps.folder"
            };
            var request = service.Files.Create(newFolder);
            var verify = request.Execute();
            if (verify.Name == name)
            {
                return GetGoogleFolderItems(service, parentID);
                //return StatusCode(200);
            }
            return StatusCode(500);
        }

        /// <summary>
        /// Deletes a file or folder using the given id and returns the contents of its parent folder which updates the UI.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentFolderID"></param>
        /// <returns></returns>
        [Route("Delete/{id}/{currentFolderID}")]
        [HttpGet]
        public IActionResult Delete(string id, string currentFolderID)
        {
            var service = GetService();
            //DriveData.File fileData = GetDriveFile(id, service); //Need to retrieve this before deleting in order to record the action
            var deleterequest = service.Files.Delete(id);
            deleterequest.Execute();
            //RecordFileAction(fileData, service, "Delete");
            return GetGoogleFolderItems(service, currentFolderID);
        }

        /// <summary>
        /// Get Preview is used to get a preview link
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("GetPreview/{id}")]
        [HttpGet]
        public IActionResult GetPreview(string id)
        {

            DriveService service = GetService();
            //RecordFileAction(GetDriveFile(id, service), service, "Preview");

            return Json("https://docs.google.com/viewer?srcid=" + id + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true");
        }

        /// <summary>
        /// Renames the file using the given newName and returns the contents of its parent folder.
        /// </summary>
        /// <param name="newName"></param>
        /// <param name="uid"></param>
        /// <param name="currentFolderID"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [Route("Rename/{newName}/{uid}/{currentFolderID}/{type}")]
        [HttpGet]
        public IActionResult Rename(string newName, string uid, string currentFolderID, string type)
        {
            var service = GetService();
            DriveData.File file = new DriveData.File()
            {
                Name = newName
            };
            
            var request = service.Files.Update(file, uid);
            var response = request.Execute();
            System.Diagnostics.Debug.WriteLine(uid + " " + file);
            //string userID = GetUserID(service);
            //Task.Run(() => { RecordFileAction(uid, userID, "Rename"); });

            //RecordFileAction(GetDriveFile(uid, service), service, "Rename");

            return GetGoogleFolderItems(service, currentFolderID);
           
        }

        /// <summary>
        /// Returns a URl link for sharing a file or folder.
        /// </summary>
        /// <param name="type"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("GetSharedLink/{id}")]
        [HttpGet]
        public IActionResult GetSharedLink(string id)
        {
            var service = GetService();
            var request = service.Files.Get(id);
            request.Fields = "webViewLink";
            //RecordFileAction(GetDriveFile(id, service), service, "Share");
            return Json(request.Execute().WebViewLink);
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
                Path = "/api/Google",
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true
            };
            Response.Cookies.Append("GoogleCred", "", options);
            return StatusCode(200);
        }

        /// <summary>
        /// Maps and filters received data.
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        private Content[] ConvertToSend(IList<Google.Apis.Drive.v3.Data.File> files)
        {
            Content[] list = new Content[files.Count];
            for (int i = 0; i < files.Count; i++)
            {
                Content cont = new Content();
                cont.Type = files[i].MimeType == "application/vnd.google-apps.folder" ? "folder" : "file";
                cont.Id = files[i].Id;
                cont.FileName = files[i].Name;
                cont.Size = files[i].Size.GetValueOrDefault().ToString();
                cont.Hash = files[i].Md5Checksum;
                cont.LastModified = files[i].ModifiedTime.ToString();
                cont.MimeType = files[i].MimeType;
                cont.Secure = "false";
                list[i] = cont;
            }
            return list;
        }

        /// <summary>
        /// Get Folder items using service and folder id.
        /// </summary>
        /// <param name="service"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        private IActionResult GetGoogleFolderItems(DriveService service, string id)
        {
            FilesResource.ListRequest request = service.Files.List();
            request.PageSize = 100;
            request.PrettyPrint = true;
            if (id == "'sharedWithMe'" || id == "sharedWithMe")
            {
                request.Q = "sharedWithMe = true and trashed = false";
            }
            else
            {
                if (id == "root" || id == "''root''") { id = "'root'"; }
                else
                {
                    id = "'" + id + "'";
                }
                request.Q = id + " in parents and trashed = false";
            }

            //request.Fields = @"files(*)";
            request.Fields = @"files(id,name,kind,md5Checksum,modifiedTime,mimeType,size)";
            IList<DriveData.File> files = request.Execute().Files;

            return Json(ConvertToSend(files));
        }

        /// <summary>
        /// Return a DriveData.File using the specified id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private DriveData.File GetDriveFile(string id, DriveService service)
        {
            // TODO Matt: We don't need to create a new service just for this request. Please pass that service as parameter and use it here.
            FilesResource.GetRequest request = service.Files.Get(id);
            // TO MATT: Verify: We have to specify the fields we want to get.
            // If it does not work please reopen the issue. if it works delete these comments.
            request.Fields = @"files(id,name,kind,md5Checksum)";
            return request.Execute();
        }

        private void RecordFileAction(DriveData.File file, DriveService service, string actionType)
        {
            FileActionController fileActionController = new FileActionController(Configuration);

            string[] userDetails = GetUserDetails(service);
            FileAction action = new FileAction(
                file.Id,
                file.Md5Checksum,
                "Drive",
                userDetails[0],
                userDetails[1],
                actionType,
                DateTime.Now);

            Task.Run(() => { fileActionController.RecordFileAction(action); });
        }

        private string[] GetUserDetails(DriveService service)
        {
            string[] details = new string[2];
            AboutResource.GetRequest request = service.About.Get();
            request.Fields = "user(emailAddress, displayName)";
            details.SetValue(request.Execute().User.EmailAddress, 0);
            details.SetValue(request.Execute().User.DisplayName, 1);
            return details;
        }
    }
}