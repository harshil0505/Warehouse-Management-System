package com.warehouse.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.Inventory;
import com.warehouse.model.Product;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Inventory findByProduct(Product product);

    Optional<Product> findByProduct(String productName);

}
