package com.warehouse.dto;

import com.warehouse.model.Inventory;

@Data
public class ReserveStockdto {
   
    private Long Id;
    private Product product;
    private int ReserveQuantity;
    private Inventory inventory;

    
}
