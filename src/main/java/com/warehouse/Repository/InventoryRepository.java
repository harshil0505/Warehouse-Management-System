package com.warehouse.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

}
