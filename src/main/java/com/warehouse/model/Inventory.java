package com.warehouse.model;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

public class Inventory { 
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name="Locationcode")
    private StorageBin storageBin;

    private int Quantity;
  
    
}
