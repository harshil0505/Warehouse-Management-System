package com.warehouse.dto;

import com.warehouse.model.Product;
import com.warehouse.model.Reasons;
import lombok.Data;

@Data
public class StockAdjustmentsdto {
   private Long Id;
   private Product product;
   private int  oldQuantity;
   private int newQuantity;
   private int changeInQuanity;
   private Reasons reasons;
}
