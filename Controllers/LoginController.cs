using Microsoft.AspNetCore.Http;
using Box.V2.Auth;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Box.V2.Config;
using Box.V2;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace front_end.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<string> Get(string authCode)
        {
            var client = new BoxClient(new BoxConfig("3syx1zpgoraznjex526u78ozutwvgeby", "0vf9isuhRisKTy9nvR1CLVaSObuaG3lx", new Uri("https://127.0.0.1")));
            OAuthSession x = await client.Auth.AuthenticateAsync(authCode);
            string serialisedOAuthSession = JsonConvert.SerializeObject(x);
            HttpContext.Session.SetString("Session", serialisedOAuthSession);
            return x.AccessToken;
        }
        [HttpPost("{id}")]
        public async Task<HttpResponseMessage> Put(string hash)
        {
            HttpClient client = new HttpClient();
            byte[] bytes = Encoding.UTF8.GetBytes("9564bc6125903af5c17cd1fea2101dda7e663dfc18fa8589e122473600c2c7e4" + ":");
            string base64 = Convert.ToBase64String(bytes);

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
            
            HttpContent content = new StringContent("jsonstring");

            
            var response = await client.PutAsync("https://ctxp-deakin.lincd.co/data/" + hash,content);

            //HttpResponseMessage response = await client.PutAsync($"api/products/{hash}");
            return response;
        }

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<HttpResponseMessage> Check(string hash)
        {
            HttpClient client = new HttpClient();
            byte[] bytes = Encoding.UTF8.GetBytes("9564bc6125903af5c17cd1fea2101dda7e663dfc18fa8589e122473600c2c7e4" + ":");
            string base64 = Convert.ToBase64String(bytes);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
            var response = await client.GetAsync("https://ctxp-deakin.lincd.co/data/" + hash);
            return response;
        }

        ///// <param name="id"></param>
        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
