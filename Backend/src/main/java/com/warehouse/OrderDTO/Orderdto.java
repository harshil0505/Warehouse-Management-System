package com.warehouse.OrderDTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Orderdto {

    private Long orderId;
    private LocalDate orderDate;
    private String orderStatus;
    private BigDecimal totalAmount;
    private String paymentStatus;
    private String shippingAddress;
    private Long customerId;
}
