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

namespace front_end.Controllers
{
    [Route("api/[controller]")]
    public class FileActionController : Controller
    {
        private FileActionService fileActionService = new FileActionService();

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
                string rowHash = fileActionService.RecordFileAction(fileAction);
                return new JsonResult(JsonConvert.SerializeObject(rowHash));
            } catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                return new JsonResult("Database write failed");
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
                string json = JsonConvert.SerializeObject(actions);
                return new JsonResult(json);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
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
                string json = JsonConvert.SerializeObject(actions);
                return new JsonResult(json);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                throw e;
            }
        }

        [Route("GetDocchainStatus/{fileID}/{platform}/{hash}")]
        [HttpGet]
        public JsonResult GetDocchainStatus([FromRoute]String fileID, [FromRoute]String platform, [FromRoute]String fileHash)
        {
            DocchainResult status;
            try
            {
                status = fileActionService.GetCurrentHashes(fileID, platform);
            } catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                throw e;
            }

            string json = JsonConvert.SerializeObject(status);
            return new JsonResult(json);
        }
    }
}
