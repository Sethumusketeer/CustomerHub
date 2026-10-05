using System.ComponentModel.DataAnnotations;

namespace CustomerHub.Api.Contracts.Requests;

public class CreateCustomerRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;
}