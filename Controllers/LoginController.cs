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
//using Google.Apis.Drive.v3;
//using Google.Apis.Drive.v3.Data;
//using Google.Apis.Services;

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
            OAuthSession Oauth= await client.Auth.AuthenticateAsync(authCode);
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
            var response = await client.PutAsync("https://ctxp-deakin.lincd.co/data/" + hash,content);
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
            BoxClient client = new BoxClient(new BoxConfig("3syx1zpgoraznjex526u78ozutwvgeby", "0vf9isuhRisKTy9nvR1CLVaSObuaG3lx", new Uri("https://127.0.0.1")),session);
            var items = await client.FoldersManager.GetFolderItemsAsync("0", 500);
            
            File[] list = new File[items.TotalCount];
           
            for(int i= 0; i<items.TotalCount;i++)
            {
                var fileitem = await client.FilesManager.GetInformationAsync(items.Entries[i].Id);
                var embedurl = await client.FilesManager.GetPreviewLinkAsync(items.Entries[0].Id);
                var downloadlink = await client.FilesManager.GetDownloadUriAsync(items.Entries[0].Id);

                list[i] =new File(items.Entries[i].Type, items.Entries[i].Id, items.Entries[i].Name, ((fileitem.Size/1000)+" KB").ToString(),fileitem.Sha1,fileitem.ModifiedAt.ToString(),embedurl.ToString(),downloadlink.ToString());
            }
            

            return Json(list);
        }

        //[Route("GetGoogleSession")]
        //[HttpGet]
        //public async Task<JsonResult> GetGoogleSession(string google_access_token, string google_refresh_token)
        //{
        //    DriveService service = new DriveService(new BaseClientService.Initializer());
        //    FilesResource.ListRequest request = service.Files.List();
        //    FileList files = request.Execute();
        //    return null;
        //}
    }
}
