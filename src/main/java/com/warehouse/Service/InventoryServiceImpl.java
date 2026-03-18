package com.warehouse.Service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.warehouse.Repository.InventoryRepository;
import com.warehouse.Repository.ProductRepository;
import com.warehouse.Repository.SerialNoTrakingRepository;
import com.warehouse.Repository.StockAdjustmentRepository;
import com.warehouse.Repository.StorageBinRepository;
import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentsdto;
import com.warehouse.ecepasion.ResourceNotFoundException;
import com.warehouse.model.Inventory;
import com.warehouse.model.Product;
import com.warehouse.model.Reasons;
import com.warehouse.model.SerialNoTraking;
import com.warehouse.model.StockAdjustments;
import com.warehouse.model.StorageBin;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    int Count =1 ;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StorageBinRepository storageBinRepository;

    @Autowired
    private ModelMapper modelmapper;

    @Autowired
    private SerialNoTrakingRepository serialNoTrakingRepository;

    @Autowired
    private StockAdjustmentRepository stockAdjustmentsRepository;
    
    @Override
    public Inventorydto addStock(Inventorydto dto, Long productId) {
    
        Product product=productRepository.findById(productId)
        .orElseThrow(()->new ResourceNotFoundException("Product not found with id: "+productId, "productId","productId" ));

          StorageBin storageBin = storageBinRepository
            .findAll()
            .stream()
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("No storage bins available", "StorageBin", "storageBinId"));
                
      Inventory inventory = new Inventory();

       inventory.setProduct(product);
       inventory.setQuantity(dto.getQuantity());
       inventory.setStorageBin(storageBin);
        
       int UpdateStock =product.getStockQuantity()+dto.getQuantity();
       product.setStockQuantity(UpdateStock);

       productRepository.save(product);

     Inventory saveInventory=inventoryRepository.save(inventory);
        return modelmapper.map(saveInventory, Inventorydto.class);
    }

    @Override
    public StockAdjustmentsdto Adjustment(Long productId, int changeInQuanity, Reasons reasons) {
       Product product=productRepository.findById(productId)
         .orElseThrow(()->new ResourceNotFoundException("Product not found with id: "+productId, "productId","productId" ));

        int oldQuantity = product.getStockQuantity();
        int newQuantity=oldQuantity+changeInQuanity;

        StockAdjustments stockAdjustments = new StockAdjustments();
        stockAdjustments.setProduct(product);
        stockAdjustments.setOldQuantity(oldQuantity);
        stockAdjustments.setNewQuantity(newQuantity);
        stockAdjustments.setChangeInQuanity(changeInQuanity);
        stockAdjustments.setReasons(reasons);

        StockAdjustments saveStockAdjustments=stockAdjustmentsRepository.save(stockAdjustments);
        return modelmapper.map(saveStockAdjustments, StockAdjustmentsdto.class);

    }

  

    @Override
    public List<SerialNoTrakingdto> TrakingStock(SerialNoTrakingdto trakingdto) {
      Product product = productRepository.findById(trakingdto.getProductId())
           .orElseThrow(() -> new ResourceNotFoundException("Product not found", "productId", trakingdto.getProductId()));
       
           long count = serialNoTrakingRepository.countByProduct(product);
           

          List<SerialNoTraking> serialList =new ArrayList<>();

        for(int i = 1; i <= product.getStockQuantity(); i++){

          String SerialNo = product.getProductName().substring(0,3).toUpperCase()+String.format("%03d",Count + i);
        
           SerialNoTraking serialNoTraking = new SerialNoTraking();
          serialNoTraking.setSerialNo(SerialNo);
         serialNoTraking.setStatus(trakingdto.getStatus());
          serialNoTraking.setProduct(product);
         serialNoTraking.setCreatedAt(trakingdto.getCreatedAt());
          serialList.add(serialNoTraking);
        }
         List<SerialNoTraking> savedTrakingList = serialNoTrakingRepository.saveAll(serialList);

         modelmapper.typeMap(SerialNoTraking.class, SerialNoTrakingdto.class)
         .addMappings(mapper -> mapper.map(
             src -> src.getProduct().getProductId(),
             SerialNoTrakingdto::setProductId
         ));
     
     return serialList.stream()
             .map(serial -> modelmapper.map(serial, SerialNoTrakingdto.class))
             .toList();

  }
  
    
}




  


