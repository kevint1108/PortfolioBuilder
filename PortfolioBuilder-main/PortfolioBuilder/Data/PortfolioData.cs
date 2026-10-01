using PortfolioBuilder.Models;

namespace PortfolioBuilder.Data
{
    // All site content lives here. Edit this file to change what the portfolio shows.
    public static class PortfolioData
    {
        public static Portfolio Portfolio { get; } = new Portfolio
        {
            FullName = "Binh Tang",
            Title = "Software Application Developer",
            Intro = "I build mobile apps with .NET MAUI and Flutter, and web apps with React and Node.js.",
            About = new()
            {
                "I'm a software application developer who enjoys taking an idea from a blank project to something people can tap, click and use.",
                "My work so far covers cross-platform mobile apps in C# with .NET MAUI and in Dart with Flutter, front-end projects in plain JavaScript and React, and a full-stack MERN food delivery site with Stripe payments and an admin panel.",
                "I'm looking for a role where I can keep shipping real features, learn from a strong team and grow as a full-stack developer."
            },
            Avatar = "/images/me.jpg",

            GitHubUrl = "https://github.com/kevint1108",
            LinkedInUrl = "",   // e.g. "https://www.linkedin.com/in/your-name"
            Email = "",         // e.g. "you@example.com"
            ResumeUrl = "",     // e.g. "/files/resume.pdf"

            SkillGroups = new()
            {
                new SkillGroup { Name = "Languages", Skills = new() { "C#", "JavaScript", "Dart", "SQL", "HTML", "CSS" } },
                new SkillGroup { Name = "Mobile", Skills = new() { ".NET MAUI", "Flutter" } },
                new SkillGroup { Name = "Web", Skills = new() { "React", "Vite", "Node.js", "Express", "ASP.NET Core MVC" } },
                new SkillGroup { Name = "Data and services", Skills = new() { "MongoDB", "Stripe", "Cloudinary", "Vercel" } },
            },

            Projects = new()
            {
                new Project
                {
                    Id = 6,
                    Slug = "12h-food-delivery",
                    Title = "12H Food Delivery",
                    Featured = true,
                    Platform = ProjectPlatform.Web,
                    Summary = "A full-stack food ordering site with a customer storefront, Stripe checkout and an admin panel for menu items and orders.",
                    Description = new()
                    {
                        "12H Food Delivery is a MERN stack web app. Customers browse the menu by category, search for dishes, add them to a cart, enter their delivery details and pay with Stripe.",
                        "A separate admin panel lets the restaurant add menu items with photos stored on Cloudinary, see every order that comes in and update each order's status."
                    },
                    Features = new()
                    {
                        "Menu browsing by category and dish search",
                        "Cart with delivery information and order total",
                        "Card payments with Stripe",
                        "My Orders page for customers",
                        "Admin panel to add items, list items and manage orders"
                    },
                    TechStack = new() { "React", "Node.js", "Express", "MongoDB", "Stripe", "Cloudinary", "Vercel" },
                    GitHubUrl = "https://github.com/kevint1108/12H_Food_Delivery",
                    Images = new()
                    {
                        new("Frontend of 12H.png", "Home page"),
                        new("Favorite dished.png", "Most loved dishes"),
                        new("search button in 12h.png", "Search"),
                        new("Search Result in 12h.png", "Search results"),
                        new("In cart 12h.png", "Cart"),
                        new("Delivery Information and Cart total in 12h.png", "Delivery information and cart total"),
                        new("Stripe payment in 12h.png", "Stripe payment"),
                        new("My orders in 12h.png", "My orders"),
                        new("mobile app icon 12h.png", "Footer with app download links"),
                        new("add item in 12h.png", "Admin: add item"),
                        new("List Order in 12h.png", "Admin: list items"),
                        new("Orders in 12h.png", "Admin: orders"),
                    }
                },
                new Project
                {
                    Id = 1,
                    Slug = "quick-kids-quiz",
                    Title = "Quick Kids Quiz",
                    Platform = ProjectPlatform.Mobile,
                    Summary = "A quiz app for kids with multiple-choice questions, instant feedback and a final score.",
                    Description = new()
                    {
                        "Quick Kids Quiz is a cross-platform mobile app built with .NET MAUI and C#. Kids start a quiz from the main menu, answer one question at a time and see right away whether they got it right.",
                        "At the end of the quiz the app shows their score so they can try again and beat it."
                    },
                    Features = new()
                    {
                        "Main menu with Start Quiz and About",
                        "Multiple-choice questions",
                        "Correct and incorrect answer screens",
                        "Result screen with the final score"
                    },
                    TechStack = new() { "C#", ".NET MAUI" },
                    GitHubUrl = "https://github.com/kevint1108/Quick-Kids-Quiz",
                    Images = new()
                    {
                        new("MainMenu.jpg", "Main menu"),
                        new("About.jpg", "About"),
                        new("questions.jpg", "Question"),
                        new("Correct.jpg", "Correct answer"),
                        new("Incorrect.jpg", "Incorrect answer"),
                        new("Result.jpg", "Result"),
                    }
                },
                new Project
                {
                    Id = 4,
                    Slug = "trivia-game",
                    Title = "Trivia Game",
                    Platform = ProjectPlatform.Mobile,
                    Summary = "A Flutter trivia game that checks each answer and shows your result at the end.",
                    Description = new()
                    {
                        "Trivia Game is a Flutter app that asks a series of multiple-choice questions. Each answer gets immediate feedback, and the last screen shows how many questions you got right."
                    },
                    Features = new()
                    {
                        "Multiple-choice questions",
                        "Feedback after every answer",
                        "Result screen"
                    },
                    TechStack = new() { "Flutter", "Dart" },
                    GitHubUrl = "https://github.com/kevint1108/Trivia_game",
                    Images = new()
                    {
                        new("Question(trivia).jpg", "Question"),
                        new("Correct answer(trivia).jpg", "Correct answer"),
                        new("incorrect answer(trivia).jpg", "Incorrect answer"),
                        new("Result(Trivia).jpg", "Result"),
                    }
                },
                new Project
                {
                    Id = 5,
                    Slug = "flutter-dice-app",
                    Title = "Flutter Dice App",
                    Platform = ProjectPlatform.Mobile,
                    Summary = "A dice roller for tabletop games with a D20 for Dungeons & Dragons and a classic six-sided die.",
                    Description = new()
                    {
                        "A Flutter dice roller for tabletop games. Switch between a twenty-sided die for Dungeons & Dragons and a classic six-sided die, then tap Roll Dice."
                    },
                    Features = new()
                    {
                        "D20 roller",
                        "D6 roller",
                        "One-tap rolling"
                    },
                    TechStack = new() { "Flutter", "Dart" },
                    GitHubUrl = "https://github.com/kevint1108/Flutterproject",
                    Images = new()
                    {
                        new("D20App.jpg", "D20"),
                        new("DiceAppD6.jpg", "D6"),
                    }
                },
                new Project
                {
                    Id = 2,
                    Slug = "todo-app",
                    Title = "To-Do Board",
                    Platform = ProjectPlatform.Web,
                    Summary = "A task board where you tag tasks Home, Work or School and track them from To Do to Complete.",
                    Description = new()
                    {
                        "A to-do app built with React and Vite. Add a task, give it one or more tags and choose its status. Tasks are grouped into To Do, In Progress and Complete columns."
                    },
                    Features = new()
                    {
                        "Add and delete tasks",
                        "Home, Work and School tags",
                        "To Do, In Progress and Complete columns"
                    },
                    TechStack = new() { "React", "Vite", "JavaScript" },
                    GitHubUrl = "https://github.com/kevint1108/todo",
                    Images = new()
                    {
                        new("todoapp.png", "Task board"),
                    }
                },
                new Project
                {
                    Id = 3,
                    Slug = "ice-cream-shopping-cart",
                    Title = "Ice Cream Shopping Cart",
                    Platform = ProjectPlatform.Web,
                    Summary = "An ice cream sundae shop where you pick a flavor, sauce and toppings, then add the sundae to a shopping cart.",
                    Description = new()
                    {
                        "A front-end shopping cart built with plain HTML, CSS and JavaScript. Choose a flavor, a sauce and any toppings, then add the sundae to the cart and see your order build up."
                    },
                    Features = new()
                    {
                        "Flavor, sauce and topping choices",
                        "Shopping cart"
                    },
                    TechStack = new() { "HTML", "CSS", "JavaScript" },
                    GitHubUrl = "https://github.com/kevint1108/Icecream-Shopping-Cart-Project",
                    Images = new()
                    {
                        new("Icecream shopping cart project.png", "Shop"),
                        new("Icecream topping.png", "Toppings"),
                    }
                },
            }
        };

        public static Project? FindProject(int id) =>
            Portfolio.Projects.FirstOrDefault(p => p.Id == id);
    }
}
