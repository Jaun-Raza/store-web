import { createContext, useContext, useEffect, useReducer } from "react";
import Axios from 'axios'
import reducer from '../reducer/productreducer';

const Appcontext = createContext();

const URL = "https://ecommserver-pado7k34.b4a.run/productsData";


const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureproducts: [],
    isSingleLoading : false,
    singleproducts : {}
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (url) => {
        dispatch({ type: "SET-LOADING" })
        try {
            const res = await Axios.get(url)
            const products = await res.data;
            dispatch({ type: "SET-API-DATA", payload: products });
        } catch (error) {
            dispatch({ type: "API-ERROR" });
        }
    }

    const getSingleProducts = async (url) => {
        dispatch({ type: "SET-SINGLE-LOADING" })
        try {
            const res = await Axios.get(url)
            const singleProducts = await res.data;
            dispatch({ type: "SET-SINGLE-DATA", payload: singleProducts });
        } catch (error) {
            dispatch({ type: "SET-SINGLE-ERROR" });
        }
    }

    useEffect(() => {
        getProducts(URL); 
    }, []);

    return <Appcontext.Provider value={{ ...state , getSingleProducts}} >{children}</Appcontext.Provider>

}

const useProductContext = () => {
    return useContext(Appcontext);
}

export { AppProvider, Appcontext, useProductContext };