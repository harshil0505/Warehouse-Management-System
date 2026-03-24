package com.warehouse.OrderDTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Data
public class OrderResponsedto {

    private String orderId;
    private LocalDate orderDate;
    private String orderStatus;
    private BigDecimal totalAmount;
    private String paymentStatus;

    private String customerName;        
    private String shippingAddress;     

    private List<Orderitemdto> items;

   

    
}