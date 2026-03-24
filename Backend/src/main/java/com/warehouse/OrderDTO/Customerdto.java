package com.warehouse.OrderDTO;

import lombok.Data;

@Data
public class Customerdto {
    private Long customerId;
    private String customerName;
    private String email;
    private String phone;
    private String address;
    private String postalCode;
}
