package com.warehouse.OrderDTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Shipmentdto {

    private Long shipmentId;
    private String trackingNumber;
    private String shipmentStatus;
    private LocalDate dispatchDate;
    private LocalDate deliveryDate;
    private Long orderId;
}
