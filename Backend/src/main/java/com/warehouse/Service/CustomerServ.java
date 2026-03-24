package com.warehouse.Service;



import java.util.List;

import com.warehouse.OrderDTO.Customerdto;
import com.warehouse.model.Customer;

public interface CustomerServ  {
    Customer createCustomer(Customerdto dto);

    List<Customer> getallCustomer();

    Customer getCustomer(Long id);

    Customer updateCustomer(Customerdto dto, Long id);
}
