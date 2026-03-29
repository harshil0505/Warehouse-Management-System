package com.warehouse.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehouse.Service.QrScanLogService;
import com.warehouse.dto.ScanLogdto;

@RestController
@RequestMapping("/api/qr")
public class QrController {

    @Autowired
    private QrScanLogService qrScanLogService;

    @PostMapping("/scan")
public ResponseEntity<String> scanQrCode(@RequestBody ScanLogdto scanLogDto) {

    System.out.println("Received DTO: " + scanLogDto);
    System.out.println("Data: " + scanLogDto.getData());

    String result = qrScanLogService.processQr(scanLogDto.getData());

    return ResponseEntity.ok(result);
}
}
