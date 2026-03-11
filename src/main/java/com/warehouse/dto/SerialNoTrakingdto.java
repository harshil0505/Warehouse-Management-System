package com.warehouse.dto;

import lombok.Data;

@Data
public class SerialNoTrakingdto {
    private Long Id;
    private String SerialNo;
    private String ProductName;
    private String Locationcode;
    private String Status;
}
