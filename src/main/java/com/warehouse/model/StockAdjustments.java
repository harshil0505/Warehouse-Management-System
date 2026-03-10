package com.warehouse.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StockAdjustments {
     private Long Id;
     private int  oldQuantity;
     private int newQuantity;
     private Reasons reasons;
}
