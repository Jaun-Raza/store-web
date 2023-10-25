import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/OrderReducer';
import axios from 'axios';

const OrderContext = createContext();

const initialState = {
    myOrders: [],
    singleOrder: [],
}

const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // Get all Orders

    const getMyOrder = (cartArr, total_price, shipping_fee) => {
        dispatch({ type: "GET_MY_ORDERS", payload: { cartArr, total_price, shipping_fee } })
    }

    const getSingleOrder = async(url) => {
        const res = await axios.get(url);
        const singleOrder = await res.data;
        dispatch({ type: "GET_SINGLE_ORDER", payload: {singleOrder}})
    }

    return <OrderContext.Provider value={{ ...state, getMyOrder, getSingleOrder }}>{children}</OrderContext.Provider>

}

const useOrderProvider = () => {
    return useContext(OrderContext);
}

export { useOrderProvider, OrderProvider }