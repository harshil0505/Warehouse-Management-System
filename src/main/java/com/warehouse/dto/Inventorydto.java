package com.warehouse.dto;

import com.warehouse.model.Product;
import com.warehouse.model.StorageBin;

import lombok.Data;

@Data
public class Inventorydto {
 
    private Long Id; 
    private  Product product;
    private StorageBin storageBin;
    private int quantity;
}
