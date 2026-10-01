namespace PortfolioBuilder.Models
{
    public class Portfolio
    {
        public string FullName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Intro { get; set; } = string.Empty;
        public List<string> About { get; set; } = new();
        public string Avatar { get; set; } = string.Empty;

        // Contact links. Leave a value empty to hide it on the site.
        public string GitHubUrl { get; set; } = string.Empty;
        public string LinkedInUrl { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ResumeUrl { get; set; } = string.Empty;

        public List<SkillGroup> SkillGroups { get; set; } = new();
        public List<Project> Projects { get; set; } = new();
    }

    public class SkillGroup
    {
        public string Name { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new();
    }
}
