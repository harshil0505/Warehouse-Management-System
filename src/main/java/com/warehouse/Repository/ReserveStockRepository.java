package com.warehouse.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.ReserveStock;

public interface ReserveStockRepository extends JpaRepository<ReserveStock, Long> {

}
