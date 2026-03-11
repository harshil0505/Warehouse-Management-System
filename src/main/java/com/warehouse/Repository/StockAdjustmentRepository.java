package com.warehouse.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.StockAdjustments;

public interface StockAdjustmentRepository extends JpaRepository<StockAdjustments, Long> { 

}
