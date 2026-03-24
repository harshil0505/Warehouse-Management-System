package com.warehouse.dto;

import java.time.LocalDate;

import com.warehouse.model.Status;

import lombok.Data;

@Data
public class SerialNoTrakingdto {
  
    private String SerialNo;
    private Long productId;
   private Status status;
    private LocalDate createdAt;
   

}
