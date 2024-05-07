import React, {useEffect} from 'react';
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {getOrderById} from "../../../State/Order/Action";
import {useLocation} from "react-router-dom";
import {createPayment} from "../../../State/Payment/Action";

const OrderSummary = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const orderId=searchParams.get("order_id")
    const {cart} = useSelector(store => store)
    const  {order} = useSelector(store => store)
    useEffect(() => {
        dispatch(getOrderById(orderId))

    }, [orderId]);

    const handleCheckout=()=> {
        dispatch(createPayment(orderId))

    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={order.order?.shippingAddress}/>

            </div>
            <div>
                <div className='lg:grid grid-cols-3 relative'>
                    <div className='col-span-2'>
                        {order.order?.orderItems.map((item) => <CartItem item={item} />)}

                    </div>
                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border '>
                            <p className='uppercase font-bold opacity-60  py-4 px-5'>
                                Price details
                            </p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between px-5 pt-3 text-black'>
                                    <span>Price</span>
                                    <span>${order.order?.totalPrice}</span>
                                </div>
                                <div className='flex justify-between pt-3 px-5'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>-${order.order?.discounte}</span>
                                </div>
                                <div className='flex justify-between pt-3 px-5'>
                                    <span>Delivery Charge</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                                <div className='flex justify-between pt-3  font-bold px-5'>
                                    <span>Total Amount</span>
                                    <span className='text-green-600'>${order.order?.totalDiscountedPrice}</span>
                                </div>
                            </div>
                            <Button variant="contained" className='w-full mt-5 '
                                sx={{ px: "2.5rem", py: ".7rem", background: '#9155fd' }}
                            onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>

                    </div>
                </div>


            </div>

        </div>
    );
};

export default OrderSummary;
