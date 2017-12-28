using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using front_end.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace front_end.Controllers
{
    [Route("api/[controller]")]
    public class GoogleController : Controller
    {
        public IConfiguration Configuration { get; set; }
        IDataProtector _protector { get; set; }
        private readonly ILogger _logger;

        public GoogleController(IConfiguration config, IDataProtectionProvider provider, ILogger<BoxController> logger)
        {
            Configuration = config;
            _protector = provider.CreateProtector(GetType().FullName);
            _logger = logger;
        }

        private ClientSecrets GetClientSecrets() => new ClientSecrets() { ClientId = Configuration["GoogleClientID"], ClientSecret = Configuration["GoogleClientSecret"] };

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
        private DriveService GetService()
        {
            UserCredential credential = GetUserCredentials();
            return new DriveService(new Google.Apis.Services.BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "LINCD-Blockchain"
            });
        }

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

        [Route("GetFolderItems/{id}")]
        [HttpGet]
        public IActionResult GetFolderItems(string id)
        {
            DriveService service = GetService();
            return GetGoogleFolderItems(service, id);

        }
        private IActionResult GetGoogleFolderItems(DriveService service, string id)
        {
            FilesResource.ListRequest request = service.Files.List();
            request.PageSize = 100;
            request.PrettyPrint = true;
            if (id == "'sharedWithMe'")
            {
                request.Q = "sharedWithMe = true and trashed = false";
            }
            else
            {
                if(id == "root" || id == "''root''") { id = "'root'"; }
                request.Q = id + " in parents and trashed = false";
            }

            //request.Fields = @"files(*)";
            request.Fields = @"files(id,name,kind,md5Checksum,modifiedTime,mimeType,iconLink,size)";
            IList<Google.Apis.Drive.v3.Data.File> files = request.Execute().Files;
            return Json(ConvertToSend(files));
        }

        [Route("NewFolder/{parentID}/{name}")]
        [HttpGet]
        public IActionResult NewFolder(string parentID, string name)
        {
            var service = GetService();
            var newFolder = new File()
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

        private GoogleContent[] ConvertToSend(IList<Google.Apis.Drive.v3.Data.File> files)
        {
            GoogleContent[] list = new GoogleContent[files.Count];
            for (int i = 0; i < files.Count; i++)
            {
                list[i] = new GoogleContent(
                    files[i].Kind,
                    files[i].Id,
                    files[i].Name,
                    files[i].Size.GetValueOrDefault().ToString(),
                    files[i].Md5Checksum,
                    files[i].ModifiedTime.ToString(),
                    files[i].IconLink,
                    files[i].MimeType);
            }
            return list;
        }

        //[Route("GetFolderItems/{id}")]


    }
}
