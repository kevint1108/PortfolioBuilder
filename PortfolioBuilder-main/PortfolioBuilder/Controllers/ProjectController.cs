using Microsoft.AspNetCore.Mvc;
using PortfolioBuilder.Data;

namespace PortfolioBuilder.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult Detail(int id)
        {
            var project = PortfolioData.FindProject(id);
            if (project == null)
            {
                return NotFound();
            }

            var projects = PortfolioData.Portfolio.Projects;
            var index = projects.IndexOf(project);
            ViewData["Next"] = projects[(index + 1) % projects.Count];

            return View(project);
        }
    }
}
