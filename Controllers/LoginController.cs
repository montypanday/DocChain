using Box.V2.Auth;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Box.V2.Config;
using Box.V2;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using front_end.Models;
using System.Collections.Generic;
using Box.V2.Models;
using System.IO;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive;

namespace front_end.Controllers
{

    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(string authCode)
        {
            // This method exchanges the authorization code with a OAuthSession object which has access token, refresh token inside it.

            BoxClient client = new BoxClient(new BoxConfig("3syx1zpgoraznjex526u78ozutwvgeby", "0vf9isuhRisKTy9nvR1CLVaSObuaG3lx", new Uri("https://127.0.0.1")));
            OAuthSession Oauth = await client.Auth.AuthenticateAsync(authCode);
            // Access token from that x object is returned to browser which is stored in cache and attached with each request which is made to BOX

            return Json(Oauth);
        }
        [HttpPost("{id}")]
        public async Task<HttpResponseMessage> Put(string hash)
        {
            // This method does the same thing as below but sends a PUT request instead. THis puts data on Blockchain
            HttpClient client = new HttpClient();
            byte[] bytes = Encoding.UTF8.GetBytes("9564bc6125903af5c17cd1fea2101dda7e663dfc18fa8589e122473600c2c7e4" + ":");
            string base64 = Convert.ToBase64String(bytes);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
            HttpContent content = new StringContent("jsonstring");
            var response = await client.PutAsync("https://ctxp-deakin.lincd.co/data/" + hash, content);
            return response;
        }

        [HttpPut("{id}")]
        // This checks if the same hash exists in Blockchain before.
        public async Task<HttpResponseMessage> Check(string hash)
        {
            // this is receiving the hash of the file and sending it as a query string to the Blockchain API
            // after converting it into Base64 format.
            HttpClient client = new HttpClient();
            byte[] bytes = Encoding.UTF8.GetBytes("9564bc6125903af5c17cd1fea2101dda7e663dfc18fa8589e122473600c2c7e4" + ":");
            string base64 = Convert.ToBase64String(bytes);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
            // gets the response from the Blockchain API and send it back to browser. A GET request is used.
            var response = await client.GetAsync("https://ctxp-deakin.lincd.co/data/" + hash);
            return response;
        }

        [Route("GetBoxFiles")]
        [HttpGet]
        public async Task<JsonResult> GetBoxFiles(string token)
        {
            var oobject = JsonConvert.DeserializeObject<OAuthSession>(token);
            OAuthSession session = new OAuthSession(oobject.AccessToken, oobject.RefreshToken, oobject.ExpiresIn, oobject.TokenType);
            BoxClient client = new BoxClient(new BoxConfig("3syx1zpgoraznjex526u78ozutwvgeby", "0vf9isuhRisKTy9nvR1CLVaSObuaG3lx", new Uri("https://127.0.0.1")), session);
            BoxCollection<BoxItem> items = await client.FoldersManager.GetFolderItemsAsync("0", 500,0, new List<string>()
            {
                BoxFolder.FieldCreatedAt,BoxFolder.FieldCreatedBy,BoxFolder.FieldFolderUploadEmail,
                BoxFolder.FieldHasCollaborations,BoxFolder.FieldItemCollection,BoxFolder.FieldItemStatus, BoxFolder.FieldModifiedAt,BoxFolder.FieldModifiedBy,
                BoxFolder.FieldName, BoxFolder.FieldOwnedBy,BoxFolder.FieldPathCollection,BoxFolder.FieldPermissions,
                BoxFolder.FieldSharedLink,BoxFolder.FieldSize,
                BoxFile.FieldExpiringEmbedLink, BoxFile.FieldExtension, BoxFile.FieldModifiedAt, BoxFile.FieldModifiedBy,
                BoxFile.FieldName, BoxFile.FieldOwnedBy, BoxFile.FieldPathCollection, BoxFile.FieldSha1, BoxFile.FieldSharedLink, BoxFile.FieldSize

            });
            Content[] list = new Content[items.TotalCount];
            for (int i = 0; i < items.TotalCount; i++)
            {
                if (items.Entries[i].Type == "file")
                {
                    BoxFile boxFile = (BoxFile)items.Entries[i];
                    //boxFile = await client.FilesManager.GetInformationAsync(items.Entries[i].Id);
                    //string embedurl = "";
                    if (Path.GetExtension(items.Entries[i].Name) != ".zip")
                    {
                        //var embedUrl = await client.FilesManager.GetPreviewLinkAsync(items.Entries[i].Id);
                        //embedurl = embedUrl.ToString();
                    }
                    var downloadlink = await client.FilesManager.GetDownloadUriAsync(items.Entries[i].Id);
                    list[i] = new Content(boxFile.Type, boxFile.Id, boxFile.Name, ((boxFile.Size / 1000) + " KB").ToString(), boxFile.Sha1, boxFile.ModifiedAt.ToString(), boxFile.ExpiringEmbedLink.Url.ToString(), downloadlink.ToString());
                }
                else
                {
                    BoxFolder boxFolder = (BoxFolder)items.Entries[i];
                    //boxFolder = await client.FoldersManager.GetInformationAsync(items.Entries[i].Id);
                    list[i] = new Content(boxFolder.Type, boxFolder.Id, boxFolder.Name, ((boxFolder.Size / 1000) + " KB").ToString(), "", boxFolder.ModifiedAt.ToString(), "", "");
                }
            }
            return Json(list);
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
            request.Fields = @"files(*)";
            // List files.
            IList<Google.Apis.Drive.v3.Data.File> files = request.Execute().Files;
            //DriveService service = new DriveService(new BaseClientService.Initializer());
            //FilesResource.ListRequest request = service.Files.List();
            //FileList files = request.Execute();

            Content[] list = new Content[files.Count];

            for(int i=0; i<files.Count;i++)
            {
                list[i] = new Content(files[i].Kind, files[i].Id, files[i].Name, files[i].Size.ToString(), files[i].Md5Checksum, files[i].ModifiedTime.ToString(), files[i].WebViewLink, files[i].WebContentLink);
            }
            return Json(list);
        }
    }
}
