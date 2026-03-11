package com.warehouse.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StorageBin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long StorageBinId;
  
    @OneToMany(mappedBy = "storageBin")
    private String Locationcode;

    @Enumerated(EnumType.STRING)
    private LocationcodeType locationcodeType;
    
}
