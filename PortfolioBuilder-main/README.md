# Portfolio Builder

Personal portfolio site for **Binh Tang**, built with ASP.NET Core MVC (.NET 8). It lists my skills and projects, with a page for each project that shows its screenshots in a phone or browser frame.

## Projects shown

| Project | Type | Built with |
| --- | --- | --- |
| [12H Food Delivery](https://github.com/kevint1108/12H_Food_Delivery) | Web | React, Node.js, MongoDB, Stripe, Cloudinary |
| [To-Do Board](https://github.com/kevint1108/todo) | Web | React, Vite |
| [Ice Cream Shopping Cart](https://github.com/kevint1108/Icecream-Shopping-Cart-Project) | Web | HTML, CSS, JavaScript |
| [Quick Kids Quiz](https://github.com/kevint1108/Quick-Kids-Quiz) | Mobile | C#, .NET MAUI |
| [Trivia Game](https://github.com/kevint1108/Trivia_game) | Mobile | Flutter |
| [Flutter Dice App](https://github.com/kevint1108/Flutterproject) | Mobile | Flutter |

## Run it locally

Requires the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

```bash
cd PortfolioBuilder
dotnet run
```

Then open the URL printed in the terminal (for example http://localhost:5166). You can also open `PortfolioBuilder.sln` in Visual Studio and press F5.

## Edit the content

Everything the site shows lives in one file: `PortfolioBuilder/Data/PortfolioData.cs`.

- **Name, intro, About text, skills:** edit the fields at the top.
- **Contact links:** fill in `Email`, `LinkedInUrl` or `ResumeUrl`. Empty values are hidden on the site.
- **Add a project:** copy one `new Project { ... }` block, give it a new `Id`, set `Platform` to `Mobile` or `Web`, and list its screenshots. The first screenshot is the cover image.
- **Screenshots:** put the files in `wwwroot/images/Project/`. File names are case-sensitive once deployed on Linux, so they must match exactly.

## Project structure

```
PortfolioBuilder/
  Controllers/   PortfolioController (home, About, errors), ProjectController (project pages)
  Data/          PortfolioData.cs — all site content
  Models/        Portfolio, Project, ProjectImage, view models
  Views/         Razor views and partials
  wwwroot/       CSS, JavaScript, images
```

## Deploy

The app reads the `PORT` environment variable, so it runs on hosts such as Render or Railway without changes. Build command: `dotnet publish -c Release -o out`, start command: `dotnet out/PortfolioBuilder.dll`.
