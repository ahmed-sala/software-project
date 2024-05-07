package com.example.ecommerce.service;

import com.example.ecommerce.Request.AddItemRequest;
import com.example.ecommerce.exception.ProductException;
import com.example.ecommerce.exception.UserException;
import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.CartItem;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.CartRepository;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService {

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;
    private UserService userService;

    public CartServiceImplementation(CartRepository cartRepository, CartItemService cartItemService, ProductService productService, UserService userService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
        this.userService = userService;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException, UserException {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            User user = userService.findUserByld(userId);
            cart = createCart(user);
        }
        if (cart == null) {
            User user = new User();
            user.setId(userId);
            cart = createCart(user);
        }
        Product product = productService.findProductByld(req.getProductId());
        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);
        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setUserId(userId);
            int price = req.getQuantity()*product.getDiscountedPrice();
            cartItem.setPrice(price);
            cartItem.setSize(req.getSize());
            CartItem createdCartItem = cartItemService.createCartItem(cartItem);

            cart.getCartItems().add(createdCartItem);
        }
        return "Item added to the cart";
    }

    @Override
    public Cart findUserCart(Long userId) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        int totalPrice = 0;
        int totalDiscountPrice = 0;
        int totalItem = 0;


        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice = totalPrice + cartItem.getPrice();
            totalDiscountPrice = totalDiscountPrice + cartItem.getDiscountedPrice();
            totalItem = totalItem + cartItem.getQuantity();

        }
        cart.setTotalPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalDiscountedPrice(totalDiscountPrice);
        cart.setDiscounte(totalPrice-totalDiscountPrice);
        return cartRepository.save(cart);
    }


    @Override
    public void deleteCart(Long userId) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            cartRepository.delete(cart);
        } else {
            throw new ProductException("Cart not found for user ID: " + userId);
        }
    }
}
