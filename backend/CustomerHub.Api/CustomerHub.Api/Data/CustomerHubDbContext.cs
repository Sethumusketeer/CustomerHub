using CustomerHub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerHub.Api.Data;

public class CustomerHubDbContext : DbContext
{
    public CustomerHubDbContext(
        DbContextOptions<CustomerHubDbContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers => Set<Customer>();

    public DbSet<User> Users { get; set; }
}