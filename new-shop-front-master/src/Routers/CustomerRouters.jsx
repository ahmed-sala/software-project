import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from "../Custumer/Pages/HomePage/HomePage"
import Cart from "../Custumer/Components/Cart/Cart"
import Footer from '../Custumer/Components/Footer/Footer'
import Product from '../Custumer/Components/Product/Product'
import ProductDetails from '../Custumer/Components/ProductDetails/ProductDetails'
import Checkout from '../Custumer/Components/Checkout/Checkout'
import Order from '../Custumer/Components/Order/Order'
import OrderDetails from '../Custumer/Components/Order/OrderDetails'
import Navigation from "../Custumer/Components/Navigation/Navigation";
import PaymentSuccess from "../Custumer/Components/Payment/PaymentSuccess";
import PaymentFail from "../Custumer/Components/Payment/PaymentFail";

const CustomerRouters = () => {
    return (
        <div>
            <div>
                <Navigation/>

            </div>
            <Routes>
                <Route path='/login' element={<HomePage/>}></Route>
                <Route path='/register' element={<HomePage/>}></Route>

                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product/>}></Route>
                <Route path='/product/:productId' element={<ProductDetails/>}></Route>
                <Route path='/checkout' element={<Checkout/>}></Route>
                <Route path='/account/order' element={<Order/>}></Route>
                <Route path='/account/order/:orderId' element={<OrderDetails/>}></Route>
                <Route path='/payments/:orderId' element={<PaymentSuccess/>}></Route>
                <Route path='/payments/fail' element={<PaymentFail/>}></Route>


            </Routes>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default CustomerRouters
