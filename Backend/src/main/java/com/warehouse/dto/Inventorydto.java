package com.warehouse.dto;



import lombok.Data;

@Data
public class Inventorydto {
 
    private Long Id; 
    private  Long productId;
    private Long storageBinId;
    private int quantity;

}
