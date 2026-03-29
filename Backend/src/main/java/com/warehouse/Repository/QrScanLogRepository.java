package com.warehouse.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.ScanLog;

public interface QrScanLogRepository extends JpaRepository<ScanLog, Long> {
 

}
