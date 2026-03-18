package com.warehouse.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class Productdto {


    private Long productId;


    private String productName;
    private String productDescription;
    private String brand;
    private String category;
    private Integer stockQuantity;
    private Double price;

    private LocalDate manufactureDate;
    private String qrCode;
    
}
