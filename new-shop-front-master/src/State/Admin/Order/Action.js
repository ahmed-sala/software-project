import * as actionTypes from "./ActionType";
import {api} from "../../../config/apiConfig";

export const getOrders = () => {
    console.log("get all orders ");
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_ORDERS_REQUEST });
        try {
            const response = await api.get(`/api/admin/order/`);
            console.log("get all orders ", response.data);
            dispatch({ type: actionTypes.GET_ORDERS_SUCCESS, payload:response.data });
        }
        catch (error) {
            console.log("cach error ", error);
            dispatch({ type: actionTypes.GET_ORDERS_FAILURE, payload: error.message });
        }
    };
};

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: actionTypes.CONFIRMED_ORDERS_REQUEST });
    try {
        const response = await api.put(
            `/api/admin/order/${orderId}/confirmed`
        );
        const data = response.data;
        console.log("confirm_order ", data)
        dispatch({ type: actionTypes.CONFIRMED_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.CONFIRMED_ORDERS_FAILURE, payload: error.message })
    }
};

export const shipOrder = (orderId) => {
    return async (dispatch) => {
        try{
    dispatch({ type: actionTypes.SHIP_ORDERS_REQUEST });
        const {data} = await api.put(
            `/api/admin/order/${orderId}/ship`
        );
      console.log(" shipped order",data);
        dispatch({ type: actionTypes.SHIP_ORDERS_SUCCESS, payload: data });
    } catch (error) {
            dispatch({ type: actionTypes.SHIP_ORDERS_FAILURE, payload: error.message });
    }
    };
};

export const deliverOrder = (orderId) =>  async (dispatch) => {
    dispatch({ type: actionTypes.DELIVERD_ORDERS_REQUEST });
    try {
        const response = await api.put(
            `/api/admin/order/${orderId}/deliver`
        );
        const data = response.data;
        console.log('Delivered Order', data);
        dispatch({ type: actionTypes.DELETE_ORDERS_SUCCESS, payload: data });
    } catch (error) {
            dispatch({ type: actionTypes.DELETE_ORDERS_FAILURE, payload: error.message });
    }
};
    
export const deleteOrder = (orderId) => {
    return async (dispatch) => {
        dispatch({type:actionTypes.DELETE_ORDERS_REQUEST})
        try {
            const { data } = await api.delete(
                `/api/admin/order/${orderId}/delete`
            );
            console.log("delete order ", data)
            dispatch({ type: actionTypes.DELETE_ORDERS_SUCCESS, payload: data });        
        dispatch({ type: actionTypes.SHIP_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            console.log("catch error",error)
            dispatch({ type: actionTypes.DELIVERD_ORDERS_FAILURE, payload: error.message });
    }
    };
};

