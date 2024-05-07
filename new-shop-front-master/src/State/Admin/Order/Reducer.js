import * as actionTypes from "./ActionType";

const initialState = {
    isLoading: false,
    orders: [],
    error:"",
}
const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_REQUEST:
            return { ...state, isLoading: true };
        case actionTypes.GET_ORDERS_SUCCESS:
            return { ...state, isLoading: false, error: "", orders: action.payload}
        case actionTypes.GET_ORDERS_FAILURE:
            return { ...state, isLoading: false, error: action.payload, order: [] }
        case actionTypes.CONFIRMED_ORDERS_REQUEST:
        case actionTypes.PLACED_ORDERS_REQUEST:
        case actionTypes.DELIVERD_ORDERS_REQUEST:
        case actionTypes.CANCELED_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.CONFIRMED_ORDERS_SUCCESS:
            return {
                ...state,
                confirmed: action.payload,
                isLoading: false,
            };
        case actionTypes.PLACED_ORDERS_SUCCESS:
            return {
                ...state,
                placed: action.payload,
                isLoading: false,
            };
        case actionTypes.DELIVERD_ORDERS_SUCCESS:
            return {
                ...state,
                delivered: action.payload,
                isLoading: false,
            };
        case actionTypes.CANCELED_ORDERS_SUCCESS:
            return {
                delivered: action.payload,
                isLoading: false,
            };
        case actionTypes.CONFIRMED_ORDERS_FAILURE:
        case actionTypes.PLACED_ORDERS_FAILURE:
        case actionTypes.DELIVERD_ORDERS_FAILURE:
        case actionTypes.CANCELED_ORDERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case actionTypes.DELETE_ORDERS_REQUEST:
            return { ...state, loading: true };
        case actionTypes.DELETE_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deletedOrder: action.payload
            };
        case actionTypes.DELETE_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case actionTypes.SHIP_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case actionTypes.SHIP_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                shipped: action.payload
            };
        case actionTypes.SHIP_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
        
};

export default adminOrderReducer;