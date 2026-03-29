package com.warehouse.dto;



import com.warehouse.model.LocationcodeType;

import lombok.Data;

@Data
public class StorageBindto {
    
    private Long storageBinId;

    private String zone;
    private Integer row;
    private Integer rack;
    private Integer shelf;
    private Integer bin;
    private String Locationcode;
    private LocationcodeType locationcodeType;
   
}
