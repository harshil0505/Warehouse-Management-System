package com.warehouse.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SerialNoTraking {
        private Long Id;
        private String SerialNo;
        private String ProductName;
        private String Locationcode;
        private String Status;
}
