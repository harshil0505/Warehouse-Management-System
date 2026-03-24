package com.warehouse.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreType;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreType
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

  
    private Integer  quantity;
    private BigDecimal price;
    private BigDecimal subtotal;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore 
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

  
  

    
}
