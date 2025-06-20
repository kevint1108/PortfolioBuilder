namespace PortfolioBuilder.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageName { get; set; } = string.Empty; // Comma-separated image filenames
        public string Platform { get; set; } = string.Empty; // Ví dụ: ".NET MAUI"
        public string TechStack { get; set; } = string.Empty;// Ví dụ: "C#, MAUI, SQLite"
        public string GitHubUrl { get; set; } = string.Empty; // Optional
    }

}
