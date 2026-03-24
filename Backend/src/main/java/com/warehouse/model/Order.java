package com.warehouse.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreType;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")  
@JsonIgnoreType
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderId;
    private LocalDate orderDate;
    private String orderStatus;
    private BigDecimal totalAmount;
    private String paymentStatus;
    private String shippingAddress;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @OneToOne(mappedBy = "order")
    private Shipment shipment;
}
