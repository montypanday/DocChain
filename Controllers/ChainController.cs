using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace front_end.Controllers
{
    /// <summary>
    /// This Controller is used to control all operations related to Blockchain.
    /// </summary>
    [Route("api/[controller]")]
    public class ChainController : Controller
    {
        private IConfiguration _configuration;

        /// <summary>
        /// This Configuration API is used access User secrets.
        /// </summary>
        public IConfiguration Configuration { get => _configuration; set => _configuration = value; }

        public ChainController(IConfiguration config) => Configuration = config;

        /// <summary>
        /// Get method is used to verify something exist in Blockchain.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET api/<controller>/5
        [Route("GetAsync")]
        [HttpGet]
        public async Task<Boolean> GetAsync(string hash)
        {
            HttpClient client = GetHTTPClient();
            // gets the response from the Blockchain API and send it back to browser. A GET request is used.
            var response = await client.GetAsync(Configuration["ChainURL"] + hash);
            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Put method is used to put data into the Blockchain.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        // PUT api/<controller>/5
        [Route("PostAsync")]
        [HttpPost]
        public async Task<Boolean> PostAsync(string hash)
        {
            // This method does the same thing as below but sends a PUT request instead. THis puts data on Blockchain

            HttpContent content = new StringContent("jsonstring");
            HttpClient client = GetHTTPClient();
            HttpResponseMessage response = await client.PutAsync(Configuration["ChainURL"] + hash, content);
            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// GetHTTPClient returns HttpClient object which can used to make a call to Blockchain.
        /// </summary>
        /// <returns></returns>
        private HttpClient GetHTTPClient()
        {
            HttpClient client = new HttpClient();
            byte[] bytes = Encoding.UTF8.GetBytes(Configuration["ChainCred"] + ":");
            string base64 = Convert.ToBase64String(bytes);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
            return client;
        }
    }
}