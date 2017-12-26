using Box.V2.Auth;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Box.V2.Config;
using Box.V2;
using Newtonsoft.Json;
using System.Net.Http;
using front_end.Models;
using System.Collections.Generic;
using Box.V2.Models;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.DataProtection;

namespace front_end.Controllers
{

    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        public IConfiguration Configuration { get; set; }
        IDataProtector _protector { get; set; }

        public LoginController(IConfiguration config,IDataProtectionProvider provider)
        {
            Configuration = config;
            _protector = provider.CreateProtector(GetType().FullName);
        }
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(string authCode)
        {
            // This method exchanges the authorization code with a OAuthSession object which has access token, refresh token inside it.

            BoxClient client = new BoxClient(new BoxConfig("3syx1zpgoraznjex526u78ozutwvgeby", "0vf9isuhRisKTy9nvR1CLVaSObuaG3lx", new Uri("https://127.0.0.1")));
            OAuthSession Oauth = await client.Auth.AuthenticateAsync(authCode);
            // Access token from that x object is returned to browser which is stored in cache and attached with each request which is made to BOX

            CookieOptions options = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(1),
                HttpOnly = true
            };
            Response.Cookies.Append("boxCred", _protector.Protect(JsonConvert.SerializeObject(Oauth)), options);
            return Json(Oauth);
        }
        [Route("GetBoxFiles")]
        [HttpGet]
        public async Task<JsonResult> GetBoxFiles(string token)
        {
            //string cookieValueFromReq = JsonConvert.DeserializeObject<OAuthSession>(Json(Request.Cookies["boxCred"]).ToString());
            var a = Request.Cookies["boxCred"];
            var b = Json(a);
            var c = JsonConvert.SerializeObject(a.ToString());



            //System.Diagnostics.Debug.WriteLine(oAuthSession);
            var session = JsonConvert.DeserializeObject<OAuthSession>(token);
            //OAuthSession session = new OAuthSession(oobject.AccessToken, oobject.RefreshToken, oobject.ExpiresIn, oobject.TokenType);
            //BoxClient client = new BoxClient(new BoxConfig("3syx1zpgoraznjex526u78ozutwvgeby", "0vf9isuhRisKTy9nvR1CLVaSObuaG3lx", new Uri("https://127.0.0.1")), session);
            BoxClient client = new BoxClient(new BoxConfig(Configuration["BoxClientId"], Configuration["BoxClientSecret"], new Uri("https://127.0.0.1")), session);
            BoxCollection<BoxItem> items = await client.FoldersManager.GetFolderItemsAsync("0", 500, 0, new List<string>()
            {
                //BoxFolder.FieldCreatedAt,
                //BoxFolder.FieldCreatedBy,
                                                            BoxFolder.FieldModifiedAt,
                                                            BoxFolder.FieldName,
                //BoxFolder.FieldOwnedBy,
                //BoxFolder.FieldPathCollection,
                //BoxFolder.FieldSharedLink,
                                                            BoxFolder.FieldSize,

                //BoxFile.FieldExtension,
                //BoxFile.FieldExpiringEmbedLink,
                                                            BoxFile.FieldModifiedAt,
                                                            BoxFile.FieldName,
                //BoxFile.FieldPathCollection,
                //BoxFile.FieldSha1,
                //BoxFile.FieldSharedLink,
                                                            BoxFile.FieldSize

            });
            Content[] list = new Content[items.TotalCount];
            for (int i = 0; i < items.TotalCount; i++)
            {
                if (items.Entries[i].Type == "file")
                {
                    BoxFile boxFile = (BoxFile)items.Entries[i];
                    //boxFile = await client.FilesManager.GetInformationAsync(items.Entries[i].Id);
                    //string embedurl = "";
                    //if (System.IO.Path.GetExtension(items.Entries[i].Name) != ".zip")
                    //{
                    //    //var embedUrl = await client.FilesManager.GetPreviewLinkAsync(items.Entries[i].Id);
                    //    //embedurl = embedUrl.ToString();
                    //}
                    //var downloadlink = await client.FilesManager.GetDownloadUriAsync(items.Entries[i].Id);
                    Content cont = new Content();
                    cont.Type = boxFile.Type;
                    cont.Id = boxFile.Id;
                    cont.FileName = boxFile.Name;
                    cont.Size = boxFile.Size.ToString();
                    //cont.Hash = boxFile.Sha1;
                    cont.LastModified = boxFile.ModifiedAt.ToString();
                    //cont.embedLink = boxFile.ExpiringEmbedLink.Url.ToString();
                    //cont.DownloadUrl = downloadlink.ToString();
                    list[i] = cont;
                }
                else
                {
                    BoxFolder boxFolder = (BoxFolder)items.Entries[i];
                    //boxFolder = await client.FoldersManager.GetInformationAsync(items.Entries[i].Id);
                    Content cont = new Content();
                    cont.Type = boxFolder.Type;
                    cont.Id = boxFolder.Id;
                    cont.FileName = boxFolder.Name;
                    cont.Size = boxFolder.Size.ToString();
                    cont.LastModified = boxFolder.ModifiedAt.ToString();
                    list[i] = cont;
                }
            }
            return Json(list);
            //return (Json(items));

        }

        [Route("GetGoogleSession")]
        [HttpGet]
        public JsonResult GetGoogleSession(string google_access_token, string google_refresh_token)
        {
            var token = new Google.Apis.Auth.OAuth2.Responses.TokenResponse()
            {
                AccessToken = google_access_token,
                RefreshToken = google_refresh_token,
                ExpiresInSeconds = 3600
            };
            var fakeflow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = "900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com",
                    ClientSecret = "i1EN7mH7usgONgINmnNKbOFi"
                }
            });
            UserCredential credential = new UserCredential(fakeflow, "fakeid", token);
            var serviceInitializer = new BaseClientService.Initializer()
            {
                ApplicationName = "LINCD-Blockchain",
                HttpClientInitializer = credential
            };
            DriveService service = new DriveService(serviceInitializer);
            FilesResource.ListRequest request = service.Files.List();
            request.PageSize = 100;
            request.PrettyPrint = true;
            request.Q = "'root' in parents and trashed = false";
            request.Fields = @"files(*)";
            IList<Google.Apis.Drive.v3.Data.File> files = request.Execute().Files;
            Content[] list = new Content[files.Count];
            for (int i = 0; i < files.Count; i++)
            {
                list[i] = new Content(files[i].Kind, files[i].Id, files[i].Name, files[i].Size.ToString(), files[i].Md5Checksum, files[i].ModifiedTime.ToString(), files[i].WebViewLink, files[i].WebContentLink);
            }
            return Json(list);
        }

        [Route("RefreshBox")]
        [HttpGet]
        public async Task<JsonResult> RefreshBox(string previousSession)
        {
            var oobject = JsonConvert.DeserializeObject<OAuthSession>(previousSession);
            OAuthSession session = new OAuthSession(oobject.AccessToken, oobject.RefreshToken, oobject.ExpiresIn, oobject.TokenType);
            BoxClient client = new BoxClient(new BoxConfig("3syx1zpgoraznjex526u78ozutwvgeby", "0vf9isuhRisKTy9nvR1CLVaSObuaG3lx", new Uri("https://127.0.0.1")), session);
            OAuthSession newSession = await client.Auth.RefreshAccessTokenAsync(oobject.AccessToken);
            return Json(newSession);
        }

        [Route("refreshGoogle")]
        [HttpGet]
        public async Task<HttpResponseMessage> RefreshGoogle(string accessToken, string refreshToken)
        {
            HttpClient httpClient = new HttpClient();
            Dictionary<string, string> content = new Dictionary<string, string>
            {
                { "client_id", "900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com" },
                { "client_secret", "i1EN7mH7usgONgINmnNKbOFi" },
                { "refresh_token", refreshToken },
                { "grant_type", "refresh_token" }
            };
            FormUrlEncodedContent formContent =
                new FormUrlEncodedContent(content);

            //var content = new FormUrlEncodedContent(new[]
            //{
            //    new KeyValuePair<string, string>("client_id","900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com"),
            //    new KeyValuePair<string, string>("client_secret","i1EN7mH7usgONgINmnNKbOFi"),
            //    new KeyValuePair<string, string>("refresh_token",refreshToken),
            //    new KeyValuePair<string, string>("grant_type", "refresh_token")
            //});
            //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/x-www-form-urlencoded");
            var response = await httpClient.PostAsync("https://www.googleapis.com/oauth2/v4/token", formContent);
            return response;
        }
    }
}
