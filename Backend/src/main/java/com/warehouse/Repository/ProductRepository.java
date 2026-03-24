package com.warehouse.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.warehouse.model.Product;

@Repository
public interface ProductRepository extends  JpaRepository<Product,Long> {

   

    Optional<Product> findFirstByProductName(String productName);


   

}
