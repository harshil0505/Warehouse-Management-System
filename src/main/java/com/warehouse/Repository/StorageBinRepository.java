package com.warehouse.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.StorageBin;

public interface StorageBinRepository extends JpaRepository<StorageBin, Long> {

}
