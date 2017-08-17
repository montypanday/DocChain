using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace front_end.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //if (response.IsError()) return Error(Request.QueryString["error"], Request.QueryString["error_description"]);
            //if (IsCode()) return await Token(Request.QueryString["code"], Request.QueryString["state"]);

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
