package com.warehouse.OrderDTO;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestdto {
    private Long customerId;
    private String shippingAddress;
    private List<Orderitemdto> items;
}
