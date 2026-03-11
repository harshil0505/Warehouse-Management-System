package com.warehouse.model;

import java.io.ObjectInputFilter.Status;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SerialNoTraking {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)     
        private Long Id;
        private String SerialNo;
        private String ProductName;
        private String Locationcode;
        private Status status;
}
