package com.warehouse.dto;



import lombok.Data;

@Data
public class StorageBindto {
    
    private Long Id;

    private String zone;
    private int row;
    private int rack;
    private int shelf;
    private int bin;
    private String Locationcode;
   
}
