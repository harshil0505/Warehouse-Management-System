package com.warehouse.Service;


import com.warehouse.QRcode.QrCodeGenerator;
import com.warehouse.Repository.OrderitemRepository;
import com.warehouse.Repository.ProductRepository;
import com.warehouse.dto.DisplayProductdto;
import com.warehouse.dto.Productdto;
import com.warehouse.dto.UpdateProductdto;
import com.warehouse.model.Product;

import jakarta.persistence.Column;
import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
@PreAuthorize("hasRole('ADMIN')")
public class ProductServiceImpl implements ProductService {
 
   
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepository  productRepo;

   @Autowired
   private OrderitemRepository orderItemRepo;

    @Override
    public Product saveProduct(Productdto productdto) {
        Product product = new Product();
        product.setProductId(productdto.getProductId());
        product.setProductName(productdto.getProductName());
        product.setProductDescription(productdto.getProductDescription());
        product.setBrand(productdto.getBrand());
        product.setCategory(productdto.getCategory());
        product.setStockQuantity(productdto.getStockQuantity());
        product.setPrice(productdto.getPrice());
        product.setManufactureDate(productdto.getManufactureDate());

        Product savedProduct = productRepo.save(product);

        String qrCodeData = "Product ID: " + savedProduct.getProductId();

        String folderPath = System.getProperty("user.dir") + "/Backend/QRcode_product";
        File folder = new File(folderPath);
        
        if (!folder.exists()) {
            folder.mkdirs();
        }
        
        String qrCodePath = folderPath + "/" + savedProduct.getProductId() + "_QRCode.png";
        
        try {
            QrCodeGenerator.generateQRCodeImage(qrCodeData, qrCodePath);
            System.out.println("QR code generated successfully at: " + qrCodePath);
        
            savedProduct.setQrCode(qrCodePath);
        
        } catch (Exception e) {
            System.err.println("Error generating QR code: " + e.getMessage());
        }
        
        Product saveProduct = productRepo.save(savedProduct);
        return modelMapper.map(saveProduct, Product.class);
    }

    @Override
    public Product updateProduct(UpdateProductdto updatedto ,Long id) {

        Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setProductName(updatedto.getProductName());
        product.setProductDescription(updatedto.getProductDescription());
        product.setBrand(updatedto.getBrand());
        product.setCategory(updatedto.getCategory());
        product.setStockQuantity(updatedto.getStockQuantity());
        product.setPrice(updatedto.getPrice());
        product.setManufactureDate(updatedto.getManufactureDate());

        return  productRepo.save(product);
    }

    @Override
    public List<DisplayProductdto> getAllProduct() {
        List<Product> products = productRepo.findAll();

        return products.stream()
                .map(product -> modelMapper.map(product, DisplayProductdto.class))
                .toList();
    }

    @Override
    public Product deleteProduct(Long id) {
    
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
  
        product.setActive(false);
    
        return productRepo.save(product);
    }

    @Override
    public DisplayProductdto getProductById(Long id) {
        Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        return modelMapper.map(product, DisplayProductdto.class);
    }
    


    
}

