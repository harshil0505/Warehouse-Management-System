package com.warehouse.Service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.warehouse.Repository.InventoryRepository;
import com.warehouse.Repository.ProductRepository;
import com.warehouse.Repository.ReserveStockRepository;
import com.warehouse.Repository.SerialNoTrakingRepository;
import com.warehouse.Repository.StockAdjustmentRepository;
import com.warehouse.Repository.StorageBinRepository;
import com.warehouse.dto.Inventorydto;
import com.warehouse.dto.ReserveStockdto;
import com.warehouse.dto.SerialNoTrakingdto;
import com.warehouse.dto.StockAdjustmentRequest;
import com.warehouse.dto.StockAdjustmentsdto;
import com.warehouse.ecepasion.ResourceNotFoundException;
import com.warehouse.model.Inventory;
import com.warehouse.model.Product;

import com.warehouse.model.ReserveStock;
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
    private ReserveStockRepository reserveStockRepository;

    @Autowired
    private StockAdjustmentRepository stockAdjustmentsRepository;
    
    @Override
    public Inventorydto addStock(Inventorydto dto, Long productId) {
    
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Product not found with id: " + productId,
                "productId",
                productId.toString()
            ));
    
        StorageBin storageBin = storageBinRepository.findById(dto.getStorageBinId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "StorageBin not found",
                "storageBinId",
                dto.getStorageBinId().toString()
            ));
    
        // 🔥 HANDLE MULTIPLE RESULTS SAFELY
        List<Inventory> list = inventoryRepository
            .findByProductAndStorageBin(product, storageBin);
    
        Inventory inventory;
    
        if (!list.isEmpty()) {
            inventory = list.get(0); // take first record
            inventory.setQuantity(inventory.getQuantity() + dto.getQuantity());
        } else {
            inventory = new Inventory();
            inventory.setProduct(product);
            inventory.setStorageBin(storageBin);
            inventory.setQuantity(dto.getQuantity());
        }
    
        // 🔥 UPDATE PRODUCT STOCK
        product.setStockQuantity(product.getStockQuantity() + dto.getQuantity());
        productRepository.save(product);
    
        Inventory saved = inventoryRepository.save(inventory);
    
        return modelmapper.map(saved, Inventorydto.class);
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

    @Override
    public ReserveStockdto reserveStock(ReserveStockdto reserveStockdto) {


    // 1. Get Product
    Product product = productRepository.findById(reserveStockdto.getProductId())
        .orElseThrow(() -> new ResourceNotFoundException(
            "Product not found with id: " + reserveStockdto.getProductId(),
            "productId",
            reserveStockdto.getProductId().toString()
        ));

    // 2. Check stock
    if (product.getStockQuantity() < reserveStockdto.getReserveQuantity()) {
        throw new IllegalArgumentException("Insufficient stock available for reservation");
    }

    // 3. Update stock
    int updatedStock = product.getStockQuantity() - reserveStockdto.getReserveQuantity();
    product.setStockQuantity(updatedStock);
    productRepository.save(product);

    Inventory inventory = inventoryRepository.findByProduct(product);

    if (inventory == null) {
        throw new RuntimeException("Inventory not found");
    }
    // 5. Create ReserveStock entity
    ReserveStock reserveStock = new ReserveStock();
    reserveStock.setProduct(product);
    reserveStock.setReserveQuantity(reserveStockdto.getReserveQuantity());
    reserveStock.setInventory(inventory);

    // 6. Save reserve stock
    ReserveStock savedReserve = reserveStockRepository.save(reserveStock);

    // 7. Convert to DTO and return
    return modelmapper.map(savedReserve, ReserveStockdto.class);
  }

    @Override
    public StockAdjustmentsdto Adjustment(StockAdjustmentRequest request) {
      Product product=productRepository.findById(request.getProductId())
         .orElseThrow(()->new ResourceNotFoundException("Product not found with id: "+request.getProductId(), "productId","productId" ));

        int oldQuantity = product.getStockQuantity();
        int newQuantity=oldQuantity+request.getChangeInQuantity();

        StockAdjustments stockAdjustments = new StockAdjustments();
        stockAdjustments.setProduct(product);
        stockAdjustments.setOldQuantity(oldQuantity);
        stockAdjustments.setNewQuantity(newQuantity);
        stockAdjustments.setChangeInQuanity(request.getChangeInQuantity());
        stockAdjustments.setReasons(request.getReasons());

        StockAdjustments saveStockAdjustments=stockAdjustmentsRepository.save(stockAdjustments);
        return modelmapper.map(saveStockAdjustments, StockAdjustmentsdto.class);
    }

}


  
  
    




  


