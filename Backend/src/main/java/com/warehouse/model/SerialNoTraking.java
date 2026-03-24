package com.warehouse.model;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "serial_no_tracking")
public class SerialNoTraking {
        @Id
        @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
        private Long Id;
       
        private String SerialNo;

        @ManyToOne
        @JoinColumn(name = "product_id")
        @JsonIgnore
        private Product product;

   
        @Enumerated(jakarta.persistence.EnumType.STRING)
        private Status status;

        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate createdAt;

      
}
