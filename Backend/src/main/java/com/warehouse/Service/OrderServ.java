package com.warehouse.Service;


import java.util.List;

import com.warehouse.OrderDTO.OrderRequestdto;
import com.warehouse.OrderDTO.OrderResponsedto;
import com.warehouse.model.Order;

public interface OrderServ {
    OrderResponsedto placeOrder(OrderRequestdto dto);

    List<Order> getallOrders();
}
