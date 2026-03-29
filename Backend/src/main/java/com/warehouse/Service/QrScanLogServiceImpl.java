package com.warehouse.Service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.warehouse.Repository.QrScanLogRepository;
import com.warehouse.model.ScanLog;

@Service
public class QrScanLogServiceImpl implements QrScanLogService {

    @Autowired
    private QrScanLogRepository qrScanLogRepository;

     @Override
    public String processQr(String data) {
       ScanLog log =new ScanLog();
         log.setData(data);
         log.setScanTime(LocalDateTime.now());
         qrScanLogRepository.save(log);

         if (data.contains("_QRCode")) {
            String id = data.split("_")[0];
            return "Product ID: " + id;
        } else {
            return " QR code : " + data;
        }
    }

}
