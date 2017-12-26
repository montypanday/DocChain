using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Box.V2;
using Box.V2.Auth;
using Box.V2.Config;
using Box.V2.Models;
using front_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace front_end.Controllers
{
    [Route("api/[controller]")]
    public class BoxController : Controller
    {
        public IConfiguration Configuration { get; set; }
        IDataProtector _protector { get; set; }
        private readonly ILogger _logger;

        public BoxController(IConfiguration config, IDataProtectionProvider provider, ILogger<BoxController> logger)
        {
            Configuration = config;
            _protector = provider.CreateProtector(GetType().FullName);
            _logger = logger;
        }

       
        [Route("Authenticate")]
        [HttpGet]
        public async Task<LocalRedirectResult> Authenticate(string code)
        {
            BoxClient client = GetClient();
            OAuthSession Oauth = await client.Auth.AuthenticateAsync(code);
            CookieOptions options = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(1),
                HttpOnly = true
            };
            
            Response.Cookies.Append("boxCred", _protector.Protect(JsonConvert.SerializeObject(Oauth)), options);
            _logger.LogInformation("Authenticated user using Authorization code => " + code);
            return LocalRedirect("/explorer");
        }


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
            catch (Exception)
            {
                return StatusCode(500);
            }
            
        }
        [Route("GetPreview/{id}")]
        [HttpGet]
        public async Task<string> GetPreview(string id)
        {
            var client = Initialise();
            _logger.LogInformation("Getting Preview Link for file => "+ id);
            
            //log this preview in database.
            return (await client.FilesManager.GetPreviewLinkAsync(id)).ToString();
        }

        [Route("Rename/{id}/{newName}")]
        [HttpPost]
        public async Task<Boolean> RenameFile(string id, string newName)
        {
            var client = Initialise();
            BoxFile fileAfterRename = await client.FilesManager.UpdateInformationAsync(new BoxFileRequest() { Name = newName });
            if (fileAfterRename.Name == newName)
            {
                
                return true;
            }
            return false;
        }

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
                return Json(file);
            }
            var folder = await client.FoldersManager.CreateSharedLinkAsync(id, request);
            _logger.LogInformation("Getting Shared link for Folder =>" + id);
            return Json(folder);
        }

        [Route("Delete/{type}/{id}")]
        [HttpDelete]
        public async Task<Boolean> Delete(string type, string id)
        {
            var client = Initialise();
            
            if (type == "file")
            {
                _logger.LogInformation("Deleting File =>" + id);
                return await client.FilesManager.DeleteAsync(id);
            }
            _logger.LogInformation("Deleting Folder =>" + id);
            return await client.FoldersManager.DeleteAsync(id);
        }
        //public async Boolean Delete(string ID)
        //{

        //}

        //public async JsonResult Share(string ID)
        //{

        //}

        //public async string GetDownloadLink(string ID)
        //{


        //}

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
                    //BoxFile.FieldSharedLink,
                });
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
            return Json(list);
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
            //cont.embedLink = boxFile.ExpiringEmbedLink.Url.ToString();
            //cont.DownloadUrl = downloadlink.ToString();
            return cont;
        }

        /// <summary>
        /// GetCustomFolder returns Content from BoxFolder object.
        /// </summary>
        /// <param name="boxFolder"></param>
        /// <returns></returns>
        private Content GetCustomFolderObject(BoxFolder boxFolder)
        {
            Content cont = new Content();
            cont.Type = boxFolder.Type;
            cont.Id = boxFolder.Id;
            cont.FileName = boxFolder.Name;
            cont.Size = boxFolder.Size.ToString();
            cont.LastModified = boxFolder.ModifiedAt.ToString();
            return cont;
        }

        private void Auth_SessionInvalidated(object sender, EventArgs e)
        {
            _logger.LogInformation("The session was invalidated, i will renew it myself");
            //do nothing
        }

        private void Auth_SessionAuthenticated(object sender, SessionAuthenticatedEventArgs e)
        {
            
            _logger.LogInformation("Don't worry! Access Token was renewed => "+ Json(e.Session));
            CookieOptions options = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(1),
                HttpOnly = true
            };
            Response.Cookies.Append("boxCred", _protector.Protect(JsonConvert.SerializeObject(e.Session)), options);
        }

        [Route("Logout")]
        [HttpGet]
        public IActionResult Logout()
        {
            CookieOptions options = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true
            };
            Response.Cookies.Append("boxCred", "", options);
            return StatusCode(200);
        }
    }
}
