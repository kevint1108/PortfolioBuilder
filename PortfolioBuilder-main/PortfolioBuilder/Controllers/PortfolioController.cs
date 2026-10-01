using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PortfolioBuilder.Data;
using PortfolioBuilder.Models;

namespace PortfolioBuilder.Controllers
{
    public class PortfolioController : Controller
    {
        public IActionResult Index()
        {
            return View(PortfolioData.Portfolio);
        }

        public IActionResult About()
        {
            return View(PortfolioData.Portfolio);
        }

        // Old link kept so bookmarks to /Portfolio/Privacy still work.
        public IActionResult Privacy()
        {
            return RedirectToActionPermanent(nameof(About));
        }

        [Route("/error/{statusCode:int?}")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error(int? statusCode)
        {
            var code = statusCode ?? 500;
            Response.StatusCode = code;

            return View(new ErrorViewModel
            {
                StatusCode = code,
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}
