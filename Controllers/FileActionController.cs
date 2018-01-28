using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Model;
using Database.Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using System.Text;

namespace front_end.Controllers
{
    [Route("api/[controller]")]
    public class FileActionController : Controller
    {
        private FileActionService fileActionService = new FileActionService();

        private IConfiguration _configuration;

        /// <summary>
        /// This Configuration API is used access User secrets.
        /// </summary>
        public IConfiguration Configuration { get; set; }

        public FileActionController(IConfiguration config)
        {
            Configuration = config;
        }

        // GET: /<controller>/
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [Route("LogAction")]
        [HttpPost]
        public async Task<JsonResult> LogAction([FromBody] JObject json)
        {
            FileAction fileAction;
            string rowHash;
            try
            {
                fileAction = new FileAction(json);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                return new JsonResult("Json deserializing failed");
            }

            try
            {
                rowHash = fileActionService.RecordFileAction(fileAction);                
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                return new JsonResult("Logging action to the database failed");
            }

            try
            {
                return new JsonResult(await EmbeddToDocchain(rowHash));
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                return new JsonResult("Embedding action to the blockchain failed");
            }
        }

        [Route("GetActionsByFile/{fileID}/{platform}")]
        [HttpGet]
        public JsonResult GetActionsByFile([FromRoute]String fileID, [FromRoute]String platform)
        {
            List<FileAction> actions = new List<FileAction>();
            try
            {
                actions = fileActionService.GetActionsByFile(fileID, platform);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                throw e;
            }

            List<ValidatedFileAction> validatedActions = new List<ValidatedFileAction>();
            try
            {
                validatedActions = (from a in actions
                                    select ValidateAction(a)).ToList();

                string json = JsonConvert.SerializeObject(validatedActions);
                System.Diagnostics.Debug.WriteLine(json);
                return new JsonResult(json);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Checking against blockchain failed");
                throw e;
            }
        }

        [Route("GetActionsByUser/{email}")]
        [HttpGet]
        public JsonResult GetActionsByUser([FromRoute]String email)
        {
            List<FileAction> actions = new List<FileAction>();
            try
            {
                actions = fileActionService.GetActionsByUser(email);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                throw e;
            }

            List<ValidatedFileAction> validatedActions = new List<ValidatedFileAction>();
            try
            {
                validatedActions = (from a in actions
                                    select ValidateAction(a)).ToList();

                string json = JsonConvert.SerializeObject(validatedActions);
                System.Diagnostics.Debug.WriteLine(json);
                return new JsonResult(json);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Checking against blockchain failed");
                throw e;
            }
        }

        [Route("GetDocchainStatus/{fileID}/{platform}/{fileHash}")]
        [HttpGet]
        public JsonResult GetDocchainStatus([FromRoute]String fileID, [FromRoute]String platform, [FromRoute]String fileHash)
        {
            FileAction action;
            ValidatedFileAction validatedAction;
            try
            {
                action = fileActionService.GetCurrentHashes(fileID, platform);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                validatedAction = new ValidatedFileAction(new FileAction());
                return new JsonResult(JsonConvert.SerializeObject(validatedAction));
            }

            validatedAction = new ValidatedFileAction(action);

            HttpResponseMessage response = (HttpResponseMessage) CheckWithDocchain(action.RowHash).Result.Value;
            if (response.IsSuccessStatusCode && validatedAction.FileHash == fileHash)
                validatedAction.isValid = true;

            string json = JsonConvert.SerializeObject(validatedAction);
            return new JsonResult(json);
        }

        private ValidatedFileAction ValidateAction(FileAction action)
        {
            ValidatedFileAction validatedAction = new ValidatedFileAction(action);

            HttpResponseMessage response = (HttpResponseMessage)CheckWithDocchain(validatedAction.RowHash).Result.Value;
            if (response.IsSuccessStatusCode && validatedAction.FileHash == action.FileHash)
                validatedAction.isValid = true;

            return validatedAction;
        }

        private async Task<JsonResult> CheckWithDocchain(string hash)
        {
            var client = GetHTTPClient();
            return Json(await client.GetAsync(Configuration["ChainURL"] + ConvertToBase64(hash)));
        }

        private async Task<JsonResult> EmbeddToDocchain(string hash)
        {
            var content = new StringContent(string.Empty, Encoding.UTF8, "application/json");
            var client = GetHTTPClient();
            return Json(await client.PutAsync(Configuration["ChainURL"] + ConvertToBase64(hash), content));
        }

        private string ConvertToBase64(string hash)
        {
            byte[] encodedBytes = System.Text.Encoding.Unicode.GetBytes(hash);
            return Convert.ToBase64String(encodedBytes);
        }

        private HttpClient GetHTTPClient()
        {
            HttpClient client = new HttpClient();
            byte[] bytes = Encoding.UTF8.GetBytes(Configuration["ChainCred"] + ":");
            string base64 = Convert.ToBase64String(bytes);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
            return client;
        }

        [HttpPost]
        public async void RecordFileAction(FileAction action)
        {
            string rowHash = fileActionService.RecordFileAction(action);
            await EmbeddToDocchain(rowHash);
        }
    }
}
