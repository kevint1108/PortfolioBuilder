namespace PortfolioBuilder.Models
{
    public class ErrorViewModel
    {
        public int StatusCode { get; set; } = 500;
        public string? RequestId { get; set; }

        public bool IsNotFound => StatusCode == 404;
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
