package com.warehouse.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String productName;
    private String productDescription;
    private String brand;
    private String category;
    private Integer stockQuantity; 
    private BigDecimal price;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate manufactureDate;
    private String qrCode;
     
  
    @OneToMany(mappedBy = "product")
    private List<SerialNoTraking> serialNumbers;




    


    

   

}
