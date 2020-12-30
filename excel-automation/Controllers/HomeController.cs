using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using excel_automation.Models;
using Microsoft.AspNetCore.Http;
using Syncfusion.XlsIO;
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
            //New instance of ExcelEngine is created 
            //Equivalent to launching Microsoft Excel with no workbooks open
            //Instantiate the spreadsheet creation engine
            ExcelEngine excelEngine = new ExcelEngine();

            //Instantiate the Excel application object
            IApplication application = excelEngine.Excel;

            //Assigns default application version
            application.DefaultVersion = ExcelVersion.Xlsx;

            using (var sampleFile = excel[0].OpenReadStream())
            {
                IWorkbook workbook = application.Workbooks.Open(sampleFile);

                //Access first worksheet from the workbook.
                IWorksheet worksheet = workbook.Worksheets[1];

                Console.WriteLine(worksheet.Name);
                Console.WriteLine(worksheet.Range["A2"].Value);

                ////Set Text in cell A3.
                //worksheet.Range["A3"].Text = "Ejemplo de modificacion de excel";

                ////Defining the ContentType for excel file.
                //string ContentType = "Application/msexcel";

                ////Define the file name.
                //string fileName = "Output.xlsx";

                ////Creating stream object.
                //MemoryStream stream = new MemoryStream();

                ////Saving the workbook to stream in XLSX format
                //workbook.SaveAs(stream);

                //stream.Position = 0;

                ////Closing the workbook.
                //workbook.Close();

                ////Dispose the Excel engine
                //excelEngine.Dispose();

                ////Creates a FileContentResult object by using the file contents, content type, and file name.
                //return File(stream, ContentType, fileName);
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
