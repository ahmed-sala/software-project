import React, {useEffect, useState} from 'react'
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrderById} from "../../../State/Order/Action";
import {updatePayment} from "../../../State/Payment/Action";
import {Alert, AlertTitle} from "@mui/material";
import OrderTracker from "..//Order/OrderTracker";
import Grid from "@mui/material/Grid";
import AddressCard from "../AddressCard/AddressCard";
import Button from "@mui/material/Button";
import {data} from "../../../State/Payment/Action";

const PaymentSuccess = () => {

    const [paymentId, setPaymentId] = useState()
    // const [referenceId, setReferenceId] = useState()
    // const [paymentStatus, setPaymentStatus] = useState()
    const {orderId} = useParams()
    console.log("OrderId:" + orderId)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {order} = useSelector(store => store)
    console.log("order", order.orders)
//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search)
//         setPaymentId(urlParams.get("razorpay_payment_id"))
//         setPaymentStatus(urlParams.get("razorpay_payment_link_status"))
//
//     }, [])
//
//     useEffect(() => {
// if(paymentId) {
//     const data = {orderId, paymentId}
//     dispatch(getOrderById(orderId))
//     dispatch(updatePayment(data))
// }
//     }, [orderId, paymentId]);
        useEffect(() => {
            setPaymentId(localStorage.getItem("payment_link_id"))
            if(paymentId) {
                const data = {orderId, paymentId}
                dispatch(getOrderById(orderId))
                dispatch(updatePayment(data))
            }
    }, [orderId, paymentId]);
    console.log("order", order)

    return (
        <div className="px-2 lg: px-36 ">
            <div className="flex flex-col justify-center items-center">
                <Alert variant="filled" severity="success" sx={{mb:6, width: "fit-content"}}>
                    <AlertTitle>
                        Payment Success
                    </AlertTitle>
                    Congratulations Your Order Get Placed
                </Alert>
                <Button onClick={()=>navigate("/")} variant="contained" className="py-5" sx={{margin:"1rem 0rem"}}>Go To Home</Button>
            </div>
            <OrderTracker activeStep={1}></OrderTracker>
            <Grid container className="space-y-5 py-5 pt-20">
                {order.orders?.orderItems?.map((item)=><Grid container item className="shadow-x1 rounded-md p-5"
                                           sx={{alignItems: "center", justifyContent: "space-between"}}>
                    <Grid item xs={6}>
                        <div className="flex items-center">
                            <img className="w-[5rem] h-[5rem] object-cover object-top"
                                 src={item.product.imageUrl}
                                 alt=""/>
                            <div className="ml-5 space-y-2">
                                <p>{item.product.title}</p>
                                <div className="opacity-50 text-xs font-semibold space-x-5">
                                    <span>Color: {item.color}</span>
                                    <span>Size: {item.size}</span>
                                </div>
                                <p>Seller: {item.product.brand}</p>
                                <p>$ {item.price}</p>
                            </div>

                        </div>
                    </Grid>
                    <Grid item>
                        <AddressCard address={order.orders?.shippingAddress}>

                        </AddressCard>
                    </Grid>

                </Grid>)}
            </Grid>

        </div>
    )
}
export default PaymentSuccess
