package com.warehouse.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.warehouse.Service.ProductService;
import com.warehouse.dto.DisplayProductdto;
import com.warehouse.dto.Productdto;
import com.warehouse.dto.UpdateProductdto;
import com.warehouse.model.Product;

import java.util.List;

//@Controller
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService  productService;

    @GetMapping("/Product")
    public ResponseEntity<List<DisplayProductdto>> getAll(){
        List<DisplayProductdto> products = productService.getAllProduct();
        return new ResponseEntity<>(products,HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,@RequestBody UpdateProductdto updateddto) {
        Product Updateproduct = productService.updateProduct(updateddto,id);
        return new ResponseEntity<>(Updateproduct, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<?> savedProduct(@RequestBody Productdto productdto) {
        Product product1 = null;
        try {
            product1 = productService.saveProduct(productdto);
            return new ResponseEntity<>(product1,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Long id) {
        Product product1 = productService.deleteProduct(id);
        return new  ResponseEntity<>(product1,HttpStatus.OK);
    }


    @GetMapping("/product/{id}")
    public ResponseEntity<DisplayProductdto> getProduct(@PathVariable Long id) {
        DisplayProductdto dis = productService.getProductById(id);
        return new ResponseEntity<>(dis,HttpStatus.OK);
    }
}
