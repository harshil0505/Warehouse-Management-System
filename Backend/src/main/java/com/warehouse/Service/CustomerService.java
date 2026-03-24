package com.warehouse.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.warehouse.OrderDTO.Customerdto;
import com.warehouse.Repository.CustomerRepo;
import com.warehouse.model.Customer;

import java.util.List;

@Service
public class CustomerService implements CustomerServ{

    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public Customer createCustomer(Customerdto dto){
        Customer customer = new Customer();
        customer.setCustomerName(dto.getCustomerName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setPostalCode(dto.getPostalCode());
        return customerRepo.save(customer);
    }

    @Override
    public List<Customer> getallCustomer(){
        return customerRepo.findAll();
    }

    @Override
    public Customer getCustomer(Long id){
        return customerRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    @Override
    public Customer updateCustomer(Customerdto dto, Long id){
        Customer customer1 = customerRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        customer1.setCustomerName(dto.getCustomerName());
        customer1.setEmail(dto.getEmail());
        customer1.setPhone(dto.getPhone());
        customer1.setAddress(dto.getAddress());
        customer1.setPostalCode(dto.getPostalCode());
        return customerRepo.save(customer1);
    }

}
