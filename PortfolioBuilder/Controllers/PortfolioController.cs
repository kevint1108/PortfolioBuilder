using Microsoft.AspNetCore.Mvc;
using PortfolioBuilder.Models;

public class PortfolioController : Controller
{
    public IActionResult Privacy()
    {
        return View();
    }
    public IActionResult Index()
    {
        var portfolio = new Portfolio
        {
            FullName = "Binh Tang",
            Bio = "Software Application Developer",
            Avatar = "/images/me.jpg",
            Skills = new List<Skill>
        {
            new Skill { Name = "C#" },
            new Skill { Name = ".Net MAUI" },
            new Skill { Name = "SQL" },
            new Skill { Name = "Javascript"},
            new Skill { Name = "HTML/CSS"},
            new Skill { Name = "Flutter"},
            new Skill { Name = "React + Vite"}
        },
            Projects = new List<Project>
            {
                new Project { Id = 1, Title = "Quick Kids Quiz", Description = ".Net MAUI and C#", ImageName = "MainMenu.jpg", GitHubUrl = "https://github.com/kevint1108/Quick-Kids-Quiz"},
                new Project { Id = 2, Title = "App ToDo", Description = "React + Vite", ImageName = "todoapp.png", GitHubUrl = "https://github.com/kevint1108/todo" },
                new Project { Id = 3, Title = "Icecream Shopping Cart", Description = "HTML/CSS and Javascript", ImageName = "Icecream shopping cart project.png", GitHubUrl = "https://github.com/kevint1108/Icecream-Shopping-Cart-Project" },
                new Project { Id = 4, Title = "Trivia Game", Description = "Flutter", ImageName = "Question(trivia).jpg", GitHubUrl = "https://github.com/kevint1108/Trivia_game" },
                new Project { Id = 5, Title = "Flutter Dice Project App", Description = "Flutter", ImageName = "D20App.jpg", GitHubUrl = "https://github.com/kevint1108/Flutterproject"},
            }
        };

        return View(portfolio);
    }
}
