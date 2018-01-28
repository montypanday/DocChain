using Database.Services;
using front_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
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

        private readonly ILogger _logger;

        /// <summary>
        /// This Configuration API is used access User secrets.
        /// </summary>
        private IConfiguration Configuration { get; set; }

        /// <summary>
        /// Manages all communication with Blockchain API.
        /// </summary>
        /// <param name="config"></param>
        /// <param name="logger"></param>
        public ChainController(IConfiguration config, ILogger<BoxController> logger)
        {
            Configuration = config;
            _logger = logger;
        }

        /// <summary>
        /// Get method is used to verify something exist in Blockchain.
        /// </summary>
        /// <returns></returns>
        // GET api/<controller>/5
        [Route("GetAsync/{hash}")]
        [HttpGet]
        public async Task<JsonResult> GetAsync(string hash)
        {
            var client = GetHTTPClient();
            return Json(await client.GetAsync(Configuration["ChainURL"] + ConvertToBase64(hash)));
        }

        /// <summary>
        /// Put method is used to put data into the Blockchain.
        /// </summary>
        /// <param name="hash"></param>
        // PUT api/<controller>/5
        [Route("PutAsync/{hash}")]
        [HttpGet]
        public async Task<JsonResult> PutAsync(string hash)
        {
            var content = new StringContent(string.Empty, Encoding.UTF8, "application/json");
            var client = GetHTTPClient();
            return  Json(await client.PutAsync(Configuration["ChainURL"] + ConvertToBase64(hash), content));
        }

        private string ConvertToBase64(string hash)
        {
            byte[] encodedBytes = System.Text.Encoding.Unicode.GetBytes(hash);
            return Convert.ToBase64String(encodedBytes);
        }


        private bool ValidateItem(Content item)
        {
            if (item.Hash == "" || item.Type == "folder" || item.Id == "sharedWithMe" || item.Hash == null)
            {
                return false;
            }
            return true;
        }

        [Route("CheckIfTracked")]
        [HttpGet]
        public Boolean CheckIfTracked(string fileID, string platform)
        {
            TrackedFileService fileTracker = new TrackedFileService();

            bool isTracked = fileTracker.CheckIfTracked(fileID, platform);
            return isTracked;
        }

        [Route("TrackFile")]
        [HttpPost]
        public Boolean TrackFile(string fileID, string platform)
        {
            TrackedFileService fileTracker = new TrackedFileService();

            bool request = fileTracker.TrackFile(fileID, platform);
            return request;
        }

        [Route("UntrackFile")]
        [HttpPost]
        public Boolean UntrackFile(string fileID, string platform)
        {
            TrackedFileService fileTracker = new TrackedFileService();

            bool request = fileTracker.TrackFile(fileID, platform);
            return request;
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