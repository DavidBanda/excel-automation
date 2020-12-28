using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using excel_automation.Models;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace excel_automation.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(List<IFormFile> excel, List<IFormFile> template)
        {
            foreach (var formFile in excel)
            {
                Console.WriteLine(formFile.FileName);
                Console.WriteLine(formFile.ContentType);
                Console.WriteLine(formFile.Name);
                Console.WriteLine(formFile.Headers);
                Console.WriteLine(formFile.ContentDisposition);
                Console.WriteLine(formFile.Length);
                Console.WriteLine();
            }

            foreach (var formFile in template)
            {
                Console.WriteLine(formFile.FileName);
                Console.WriteLine(formFile.ContentType);
                Console.WriteLine(formFile.Name);
                Console.WriteLine(formFile.Headers);
                Console.WriteLine(formFile.ContentDisposition);
                Console.WriteLine(formFile.Length);
                Console.WriteLine();
            }
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
