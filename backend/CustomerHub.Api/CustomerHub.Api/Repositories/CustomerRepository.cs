using CustomerHub.Api.Data;
using CustomerHub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerHub.Api.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly CustomerHubDbContext _dbContext;

    public CustomerRepository(
        CustomerHubDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Customer>> GetAllAsync()
    {
        return await _dbContext.Customers.ToListAsync();
    }

    public async Task<Customer?> GetByIdAsync(int id)
    {
        return await _dbContext.Customers
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Customer> CreateAsync(Customer customer)
    {
        _dbContext.Customers.Add(customer);

        await _dbContext.SaveChangesAsync();

        return customer;
    }

    public async Task UpdateAsync(Customer customer)
    {
        _dbContext.Customers.Update(customer);

        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Customer customer)
    {
        _dbContext.Customers.Remove(customer);

        await _dbContext.SaveChangesAsync();
    }
}