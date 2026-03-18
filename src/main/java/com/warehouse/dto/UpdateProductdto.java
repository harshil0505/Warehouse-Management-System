package com.warehouse.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateProductdto {
    private String productName;
    private String productDescription;
    private String brand;
    private String category;
    private Integer stockQuantity;
    private Double price;

    private LocalDate manufactureDate;
}
