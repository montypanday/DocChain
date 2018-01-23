using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Model;
using Database.Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        public JsonResult LogAction([FromBody] JObject json)
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
                fileActionService.RecordFileAction(fileAction);
                return new JsonResult(JsonConvert.SerializeObject(fileAction));
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
                return new JsonResult("File Action Query Failed");
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
                return new JsonResult("File Action Query Failed");
            }
        }
    }
}
