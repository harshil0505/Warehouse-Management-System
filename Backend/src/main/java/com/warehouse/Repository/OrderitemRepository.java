package com.warehouse.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.OrderItem;

public interface OrderitemRepository extends JpaRepository<OrderItem, Long> {

   

}
