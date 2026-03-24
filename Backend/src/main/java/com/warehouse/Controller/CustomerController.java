package com.warehouse.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.warehouse.OrderDTO.Customerdto;
import com.warehouse.Service.CustomerService;
import com.warehouse.model.Customer;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customerdto customer) {
        Customer customer1 = customerService.createCustomer(customer);
        return new ResponseEntity<>(customer1, HttpStatus.OK);
    }

    @GetMapping("/allcustomer")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getallCustomer();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        Customer customer = customerService.getCustomer(id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customerdto customer, @PathVariable Long id) {
        Customer cus = customerService.updateCustomer(customer,id);
        return new ResponseEntity<>(cus, HttpStatus.OK);
    }

}
