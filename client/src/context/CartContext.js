import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/CartReducer';

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("RazaCart");

    if(localCartData == [] || localCartData == null) {
        return [];
    }else {
        return JSON.parse(localCartData);
    }
}


const initialState = {
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
};

const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const addToCart = (id, activeColor, amount, products) => {
        dispatch({type: "ADD_TO_CART", payload: {id, activeColor, amount, products}})
    };

    const removeCartItem = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
    }

    const clearCart = () => {
        dispatch({ type:"CLEAR_BTN" });
    }
    
    
    const setDecrease = (id) => {
        dispatch({type : "DECREASE", payload: id})
    }
    
    const setIncrease = (id) => {
        dispatch({type : "INCREASE", payload: id})
    }

    useEffect(()=>{
        dispatch({type: "SET_ITEM_VAL"});
        dispatch({type: "SET_SUB_TOTAL"})
        localStorage.setItem("RazaCart" , JSON.stringify(state.cart));
    }, [state.cart])

    return <CartContext.Provider value={{...state, addToCart, removeCartItem, clearCart, setDecrease, setIncrease}}>{children}</CartContext.Provider>
}

const useCartProvider = () => {
    return useContext(CartContext);
}

export {useCartProvider, CartProvider};