package com.warehouse.Service;

import java.util.List;

import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.ReserveStockdto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentsdto;
import com.warehouse.model.Reasons;

public interface InventoryService {

    Inventorydto addStock(Inventorydto dto, Long productId);

   

 

    StockAdjustmentsdto Adjustment(Long productId, int changeInQuanity, Reasons reasons);

   List<SerialNoTrakingdto> TrakingStock(SerialNoTrakingdto trakingdto);





   Inventorydto addStock(Inventorydto dto);





   Inventorydto reserveStock(ReserveStockdto reserveStockdto);





   Inventorydto releaseStock(SerialNoTrakingdto trakingdto);



}
