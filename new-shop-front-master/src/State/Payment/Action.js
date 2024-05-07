import {
    CREATE_PAYMENT_FAILURE,
    CREATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST
} from "./ActionType";
import {api} from "../../config/apiConfig";

export const createPayment = (orderId) => async (dispatch) => {
    dispatch({type: CREATE_PAYMENT_REQUEST})
    try{
        const {data} = await api.post(`/api/payments/${orderId}`, {})
        console.log(data)
        if(data.payment_link_url){
            localStorage.setItem("payment_link_id", data.payment_link_id);
            window.location.href = data.payment_link_url;
        }

       return data
    } catch (e) {
        dispatch({type: CREATE_PAYMENT_FAILURE, payload: e.message})
    }
  
}

// export const updatePayment = (reqData) => async (dispatch) => {
//     dispatch({type: UPDATE_PAYMENT_REQUEST})
//     try{
//         const {data} = await api.get(`/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`)
//         console.log("updatePayment", data)
//     } catch (e) {
//         dispatch({type: CREATE_PAYMENT_FAILURE, payload: e.message})
//     }
//
// }

export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({type: UPDATE_PAYMENT_REQUEST})
    try{
        const {data} = await api.get(`/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`)
        console.log("updatePayment", data)
    } catch (e) {
        dispatch({type: UPDATE_PAYMENT_FAILURE, payload: e.message})
    }

}

