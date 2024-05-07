package com.example.ecommerce.controller;

import com.example.ecommerce.Request.AddItemRequest;
import com.example.ecommerce.config.ApiResponse;
import com.example.ecommerce.exception.ProductException;
import com.example.ecommerce.exception.UserException;
import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.CartService;
import com.example.ecommerce.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart Management",description = "fund user cart, add item to cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @GetMapping("/")
    @Operation(description = "find cart by user id")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization")String jwt) throws UserException, ProductException {
        User user=userService.findUserProfileByJwt(jwt);
        Cart cart =cartService.findUserCart(user.getId());
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }
    @PutMapping("/add")
    @Operation(description = "add item to cart")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestHeader("Authorization")String jwt, @RequestBody AddItemRequest req) throws UserException, ProductException {
        User user=userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), req);
        ApiResponse res=new ApiResponse();
        res.setMessage("item successfully added");
        res.setStatus(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
