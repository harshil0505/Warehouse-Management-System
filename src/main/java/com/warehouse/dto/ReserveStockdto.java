package com.warehouse.dto;

import com.warehouse.model.Inventory;
import com.warehouse.model.Product;

import lombok.Data;

@Data
public class ReserveStockdto {
   
    private Long Id;
    private Product product;
    private int ReserveQuantity;
    private Inventory inventory;

    
}
