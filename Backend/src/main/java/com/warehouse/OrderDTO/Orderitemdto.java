package com.warehouse.OrderDTO;



import java.math.BigDecimal;

import lombok.Data;

@Data
public class Orderitemdto {

    private Long productId;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}
