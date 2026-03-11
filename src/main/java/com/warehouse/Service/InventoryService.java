package com.warehouse.Service;

import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.ReserveStockdto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentsdto;
import com.warehouse.model.Reasons;

public interface InventoryService {

    Inventorydto addStock(Inventorydto dto);

    StockAdjustmentsdto Adjustment(StockAdjustmentsdto stockAdjustmentsdto);

    Inventorydto reserveStock(ReserveStockdto reserveStockdto);

    Inventorydto releaseStock(SerialNoTrakingdto trakingdto);

    StockAdjustmentsdto Adjustment(Long productId, int changeInQuanity, Reasons reasons);

}
