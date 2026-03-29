package com.warehouse.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class StorageBin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storageBinId;
  
   
    private String zone;

    private Integer row;
    private Integer rack;
    private Integer shelf;
    private Integer bin;

    
    private String Locationcode;

    @Enumerated(EnumType.STRING)
    private LocationcodeType locationcodeType;
    
}
