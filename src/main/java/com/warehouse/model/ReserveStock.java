package com.warehouse.model;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

public class ReserveStock {

    private Long  Id;

    @ManyToOne
    @JoinColumn(name = "product")
    private Product product;

    private int  ReserveQuantity;

    @OneToOne
    @JoinColumn(name ="quantity")
    private Inventory inventory;
}
