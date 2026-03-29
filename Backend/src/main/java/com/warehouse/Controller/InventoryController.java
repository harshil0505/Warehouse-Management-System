package com.warehouse.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehouse.Service.InventoryService;
import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.ReserveStockdto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentRequest;
import com.warehouse.dto.StockAdjustmentsdto;


@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;
    
 @PostMapping("/add-stock/{productId}")
public ResponseEntity<Inventorydto> addStock(@RequestBody Inventorydto dto,@PathVariable Long productId) {
    Inventorydto inventorydto = inventoryService.addStock(dto, productId);
    return new ResponseEntity<>(inventorydto, HttpStatus.CREATED);
}
    @PostMapping("/adjust-stock")
    public ResponseEntity<StockAdjustmentsdto> Adjustment(@RequestBody StockAdjustmentRequest request){
        StockAdjustmentsdto stockAdjustmentsdto1 = inventoryService.Adjustment(request);
        return new ResponseEntity<>(stockAdjustmentsdto1,HttpStatus.CREATED);
    }
    @PostMapping("/reserve-stock")
    public ResponseEntity<ReserveStockdto> reserveStock(@RequestBody ReserveStockdto reserveStockdto){
      ReserveStockdto resStockdto = inventoryService.reserveStock(reserveStockdto);
        return new ResponseEntity<>(resStockdto,HttpStatus.CREATED);    
    }

    @PostMapping("/traking-stock")
    public ResponseEntity <List<SerialNoTrakingdto>> TrakingStock(@RequestBody SerialNoTrakingdto trakingdto){
       List<SerialNoTrakingdto> serialNoTrakingdto =  inventoryService.TrakingStock(trakingdto);
        return new ResponseEntity<>(serialNoTrakingdto,HttpStatus.CREATED);    
    }
}
