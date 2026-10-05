using CustomerHub.Api.Models;
using CustomerHub.Api.Repositories;

namespace CustomerHub.Api.Services;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository customerRepository;

    public CustomerService(ICustomerRepository customerRepository)
    {
        this.customerRepository = customerRepository;
    }

    public async Task<List<Customer>> GetCustomersAsync()
    {
        return await customerRepository.GetAllAsync();
    }

    public async Task<Customer?> GetCustomerByIdAsync(int id)
    {
        return await customerRepository.GetByIdAsync(id);
    }

    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        return await customerRepository.CreateAsync(customer);
    }

    public async Task<Customer?> UpdateCustomerAsync(int id, Customer customer)
    {
        var existingCustomer = await customerRepository.GetByIdAsync(id);

        if (existingCustomer == null)
        {
            return null;
        }

        existingCustomer.Name = customer.Name;
        existingCustomer.Email = customer.Email;
        existingCustomer.Phone = customer.Phone;

        await customerRepository.UpdateAsync(existingCustomer);

        return existingCustomer;
    }

    public async Task<bool> DeleteCustomerAsync(int id)
    {
        var customer = await customerRepository.GetByIdAsync(id);

        if (customer == null)
        {
            return false;
        }

        await customerRepository.DeleteAsync(customer);

        return true;
    }
}