package com.warehouse.Service;

import java.util.List;

import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.ReserveStockdto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentRequest;
import com.warehouse.dto.StockAdjustmentsdto;

public interface InventoryService {

    Inventorydto addStock(Inventorydto dto, Long productId);


   List<SerialNoTrakingdto> TrakingStock(SerialNoTrakingdto trakingdto);

   ReserveStockdto reserveStock(ReserveStockdto reserveStockdto);

   StockAdjustmentsdto Adjustment(StockAdjustmentRequest request);








}
