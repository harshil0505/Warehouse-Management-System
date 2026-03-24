package com.warehouse.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.warehouse.OrderDTO.OrderRequestdto;
import com.warehouse.OrderDTO.OrderResponsedto;
import com.warehouse.Service.OrderService;
import com.warehouse.model.Order;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderControler {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderResponsedto> placeOrder(@RequestBody OrderRequestdto dto) {
     OrderResponsedto response = orderService.placeOrder(dto);
     return ResponseEntity.ok(response);
}

    @GetMapping("/allorder")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> orders = orderService.getallOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
