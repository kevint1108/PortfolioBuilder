namespace PortfolioBuilder.Models
{
    public class ScreenshotViewModel
    {
        public ScreenshotViewModel(ProjectImage image, ProjectPlatform platform, bool eager = false)
        {
            Image = image;
            Platform = platform;
            Eager = eager;
        }

        public ProjectImage Image { get; }
        public ProjectPlatform Platform { get; }
        public bool Eager { get; }
    }
}
