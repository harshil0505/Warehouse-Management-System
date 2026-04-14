package com.warehouse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreType;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIgnoreType
public class StockAdjustments {
     @jakarta.persistence.Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long Id;

     @ManyToOne
    
     private Product product;

     private Integer  oldQuantity;

     private Integer newQuantity;

     private Integer changeInQuanity;

     @Enumerated(jakarta.persistence.EnumType.STRING)
     private Reasons reasons;
}
