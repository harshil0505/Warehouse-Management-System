package com.warehouse.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ReserveStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  Id;

    @ManyToOne
    @JoinColumn(name = "product")
    private Product product;

    private int  ReserveQuantity;

    @OneToOne
    @JoinColumn(name ="quantity")
    private Inventory inventory;
}
