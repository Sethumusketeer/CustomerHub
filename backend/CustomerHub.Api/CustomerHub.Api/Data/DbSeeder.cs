using CustomerHub.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CustomerHub.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(CustomerHubDbContext context)
    {
        if (await context.Users.AnyAsync())
        {
            return;
        }

        var passwordHasher = new PasswordHasher<User>();

        var admin = new User
        {
            Username = "admin",
            Role = "Admin"
        };

        admin.PasswordHash = passwordHasher.HashPassword(
            admin,
            "Admin@123");

        var user = new User
        {
            Username = "user",
            Role = "User"
        };

        user.PasswordHash = passwordHasher.HashPassword(
            user,
            "User@123");

        context.Users.AddRange(admin, user);

        await context.SaveChangesAsync();
    }
}