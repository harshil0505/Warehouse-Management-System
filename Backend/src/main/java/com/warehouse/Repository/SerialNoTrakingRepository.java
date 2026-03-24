package com.warehouse.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.Product;
import com.warehouse.model.SerialNoTraking;

public interface SerialNoTrakingRepository extends JpaRepository<SerialNoTraking,Long>{

    Optional<Product> findBySerialNo(String serialNo);

    long countByProduct(Product product);

}
