using Microsoft.AspNetCore.Http;
using Box.V2.Auth;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Box.V2.Config;
using Box.V2;
using Newtonsoft.Json;


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
            OAuthSession x =await client.Auth.AuthenticateAsync(authCode);
            var serialisedOAuthSession = JsonConvert.SerializeObject(x);
            HttpContext.Session.SetString("Session", serialisedOAuthSession);
            return x.AccessToken;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
