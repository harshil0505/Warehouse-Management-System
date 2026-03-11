package com.warehouse.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehouse.Service.InventoryService;
import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.ReserveStockdto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentsdto;
import com.warehouse.model.Reasons;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;
    
    @PostMapping("/add-stock")
    public ResponseEntity<Inventorydto> addStock(@RequestBody Inventorydto dto){
       Inventorydto inventorydto = inventoryService.addStock(dto);
       return new ResponseEntity<>(inventorydto,HttpStatus.CREATED);
    }
    @PostMapping("/adjust-stock")
    public ResponseEntity<StockAdjustmentsdto> Adjustment(Long productId,int changeInQuanity,Reasons reasons){
        StockAdjustmentsdto stockAdjustmentsdto1 = inventoryService.Adjustment(productId, changeInQuanity, reasons);
        return new ResponseEntity<>(stockAdjustmentsdto1,HttpStatus.CREATED);
    }
    @PostMapping("/reserve-stock")
    public ResponseEntity<Inventorydto> reserveStock(@RequestBody ReserveStockdto reserveStockdto){
        Inventorydto inventorydto1 = inventoryService.reserveStock(reserveStockdto);
        return new ResponseEntity<>(inventorydto1,HttpStatus.CREATED);    
    }

    @PostMapping("/traking-stock")
    public ResponseEntity<Inventorydto> TrakingStock(@RequestBody SerialNoTrakingdto trakingdto){
        Inventorydto inventorydto2 = inventoryService.releaseStock(trakingdto);
        return new ResponseEntity<>(inventorydto2,HttpStatus.CREATED);    
    }
}
