namespace PortfolioBuilder.Models
{
    public class Portfolio
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty; 
        public List<Skill> Skills { get; set; } = new List<Skill>();         
        public List<Project> Projects { get; set; } = new List<Project>();    
    }
}
