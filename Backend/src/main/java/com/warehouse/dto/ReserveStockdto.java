package com.warehouse.dto;

import com.warehouse.model.Inventory;


import lombok.Data;

@Data
public class ReserveStockdto {
   
    private Long Id;
    private Long productId;
    private int ReserveQuantity;
    private Inventory inventory;

    
}
