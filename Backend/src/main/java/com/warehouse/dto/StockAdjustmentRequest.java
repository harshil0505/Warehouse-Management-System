package com.warehouse.dto;

import com.warehouse.model.Reasons;
import lombok.Data;

@Data
public class StockAdjustmentRequest {

    private Long productId;
    private Integer changeInQuantity;
    private Reasons reasons;

}