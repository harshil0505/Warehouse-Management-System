package com.warehouse.Service;

import java.util.List;

import com.warehouse.dto.DisplayProductdto;
import com.warehouse.dto.Productdto;
import com.warehouse.dto.UpdateProductdto;
import com.warehouse.model.Product;


public interface ProductService {

    Product saveProduct(Productdto productdto);



    List<DisplayProductdto> getAllProduct();

    Product updateProduct(UpdateProductdto updateddto, Long id);

    Product deleteProduct(Long id);

    DisplayProductdto getProductById(Long id);

}
