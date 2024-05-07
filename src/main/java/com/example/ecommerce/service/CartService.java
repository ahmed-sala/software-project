package com.example.ecommerce.service;

import com.example.ecommerce.Request.AddItemRequest;
import com.example.ecommerce.exception.ProductException;
import com.example.ecommerce.exception.UserException;
import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.User;

public interface CartService {
    public Cart createCart(User user);
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException, UserException;
    public Cart findUserCart(Long userId) throws ProductException;

    public void deleteCart(Long userId) throws ProductException;
}
