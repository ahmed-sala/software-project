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

const PaymentFail = () => {
    // const [paymentId, setPaymentId] = useState()
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
    return (
        <div className="px-2 lg: px-36 ">
            <div className="flex flex-col justify-center items-center">
                <Alert variant="filled" severity="error" sx={{mb:6, width: "fit-content"}}>
                    <AlertTitle>
                        Payment Failed
                    </AlertTitle>
                    There's something wrong happened
                </Alert>
                <Button onClick={()=>navigate("/")} variant="contained" className="py-5" sx={{margin:"1rem 0rem"}}>Go To Home</Button>
            </div>
        </div>
    )
}
export default PaymentFail
