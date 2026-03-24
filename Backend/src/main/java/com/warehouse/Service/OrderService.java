package com.warehouse.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.warehouse.OrderDTO.OrderRequestdto;
import com.warehouse.OrderDTO.OrderResponsedto;
import com.warehouse.OrderDTO.Orderitemdto;
import com.warehouse.Repository.CustomerRepo;
import com.warehouse.Repository.OrderRepo;
import com.warehouse.Repository.ProductRepository;
import com.warehouse.model.Customer;
import com.warehouse.model.Order;
import com.warehouse.model.OrderItem;
import com.warehouse.model.Product;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements OrderServ {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CustomerRepo customerRepo;

    // ✅ MAIN METHOD
    @Override
    public OrderResponsedto placeOrder(OrderRequestdto dto) {

        Customer customer = customerRepo.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Order order = new Order();
        order.setOrderDate(LocalDate.now());
        order.setOrderStatus("CREATED");
        order.setCustomer(customer);
        order.setShippingAddress(dto.getShippingAddress());

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (Orderitemdto itemDto : dto.getItems()) {

    Product product = productRepo.findById(itemDto.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

    OrderItem item = new OrderItem();
    item.setProduct(product);
    item.setQuantity(itemDto.getQuantity());
    BigDecimal price = product.getPrice();
    item.setPrice(price);
    BigDecimal subtotal = price.multiply(BigDecimal.valueOf(itemDto.getQuantity()));

    item.setSubtotal(subtotal);
    item.setOrder(order);

    totalAmount = totalAmount.add(subtotal);
    orderItems.add(item);
}

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepo.save(order);

        return mapToResponse(savedOrder); 
    }


    private OrderResponsedto mapToResponse(Order order) {

        OrderResponsedto response = new OrderResponsedto();
        response.setOrderId(order.getOrderId());
        response.setOrderDate(order.getOrderDate());
        response.setOrderStatus(order.getOrderStatus());
        response.setTotalAmount(order.getTotalAmount());
        response.setCustomerName(order.getCustomer().getCustomerName());
        response.setShippingAddress(order.getShippingAddress());

        List<Orderitemdto> items = order.getOrderItems()
                .stream()
                .map(item -> {
                    Orderitemdto dto = new Orderitemdto();
                    dto.setProductId(item.getProduct().getProductId());
                    dto.setQuantity(item.getQuantity());
                    dto.setPrice(item.getPrice());
                    dto.setSubtotal(item.getSubtotal());
                    return dto;
                })
                .toList();

        response.setItems(items);

        return response;
    }

 
    @Override
    public List<Order> getallOrders() {
        return orderRepo.findAll();
    }
}