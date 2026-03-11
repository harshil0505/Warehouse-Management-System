package com.warehouse.Service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.warehouse.Repository.InventoryRepository;
import com.warehouse.Repository.StorageBinRepository;
import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.ReserveStockdto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentsdto;
import com.warehouse.model.Inventory;
import com.warehouse.model.StorageBin;

import jakarta.persistence.criteria.CriteriaBuilder.In;

public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StorageBinRepository storageBinRepository;

    @Autowired
    private ModelMapper modelmapper;
    
    @Override
    public Inventorydto addStock(Inventorydto dto) {

        Product product=productRepository.findById(dto.getProductId())
            .orElseThrow(()->new ResourceNotFoundException("Product not found with id: "+dto.getProductId()));

                
      Inventory inventory = new Inventory();
       inventory.setId(1L);
       inventory.setProduct(dto.getProduct());
         inventory.setQuantity(dto.getQuantity());
            inventory.setStorageBin(dto.getStorageBin());
     Inventory saveInventory=inventoryRepository.save(inventory);
        return modelmapper.map(saveInventory, Inventorydto.class);
    }

    @Override
    public StockAdjustmentsdto Adjustment(StockAdjustmentsdto stockAdjustmentsdto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'Adjustment'");
    }

    @Override
    public Inventorydto reserveStock(ReserveStockdto reserveStockdto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'reserveStock'");
    }

    @Override
    public Inventorydto releaseStock(SerialNoTrakingdto trakingdto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'releaseStock'");
    }

}
