namespace PortfolioBuilder.Models
{
    public enum ProjectPlatform
    {
        Mobile,
        Web
    }

    public class Project
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;

        // One sentence shown on the home page card.
        public string Summary { get; set; } = string.Empty;

        // Longer text shown on the project page. One string per paragraph.
        public List<string> Description { get; set; } = new();

        public List<string> Features { get; set; } = new();
        public ProjectPlatform Platform { get; set; }
        public List<string> TechStack { get; set; } = new();
        public string GitHubUrl { get; set; } = string.Empty;
        public string LiveUrl { get; set; } = string.Empty;
        public bool Featured { get; set; }

        // Screenshots in wwwroot/images/Project. The first one is the cover.
        public List<ProjectImage> Images { get; set; } = new();

        public ProjectImage? Cover => Images.FirstOrDefault();
        public string PlatformLabel => Platform == ProjectPlatform.Mobile ? "Mobile app" : "Web app";
    }

    public class ProjectImage
    {
        public ProjectImage(string file, string caption)
        {
            File = file;
            Caption = caption;
        }

        public string File { get; }
        public string Caption { get; }
        public string Url => "/images/Project/" + Uri.EscapeDataString(File);
    }
}
