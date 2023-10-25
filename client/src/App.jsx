import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './Products';
import Contact from './Contact';
import SingleProduct from './SingleProduct';
import Cart from './Cart'
import Error from './Error'
import GlobalStyle from './GlobalStyle'
import { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import { useCartProvider } from './context/CartContext'
import { useOrderProvider } from './context/OrdersContext'
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import MyOrders from "./components/MyOrders";
import CheckOut from "./components/CheckOut";
import { useState, useEffect } from 'react'
import AllOrders from './components/AllOrders';
import SingleOrder from './SingleOrder';
import AllSingleOrders from './AllSingleOrders';
import Cookies from 'js-cookie'

const cookie = Cookies.get('razaStore');

const App = () => {

  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  const getUserData = async (cookie) => {

    if (cookie) {
      setisAuthenticated(true);
      setEmail(cookie)
    }

  }

  useEffect(() => {
    getUserData(cookie);
  }, [])


  const { total_item } = useCartProvider();
  const { myOrders, getSingleOrder, singleOrder } = useOrderProvider();

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme} >
      <Router>
        <GlobalStyle />
        <Header total_item={total_item} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact email={email} />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/log" element={<Login />} />
          <Route path="/myOrders" element={<MyOrders email={email} />} />
          <Route path="/checkout" element={<CheckOut data={myOrders} isAuthenticated={isAuthenticated} email={email} />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/orders/:id" element={<SingleOrder getSingleOrder={getSingleOrder} singleOrder={singleOrder} email={email} />} />
          <Route path="/allOrders/:id" element={<AllSingleOrders getSingleOrder={getSingleOrder} singleOrder={singleOrder} />} />
          <Route path="/allOrders132" element={<AllOrders />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
};

export default App;
