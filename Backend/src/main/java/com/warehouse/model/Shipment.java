package com.warehouse.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shipmentId;

    //private Long orderId;
    private String trackingNumber;
    private String shipmentStatus;
    private LocalDate dispatchDate;
    private LocalDate deliveryDate;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
