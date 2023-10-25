import React, { useState, useEffect } from 'react'
import { Button } from '../styles/Button';
import axios from 'axios';
import styled from "styled-components";
import FormatPrice from '../Helpers/FormatPrice';
import { NavLink } from 'react-router-dom';


const URL = "https://ecommserver-pado7k34.b4a.run/myOrders"

const MyOrders = ({ email }) => {

  const [orders, setOrder] = useState([]);

  const getOrders = async (url) => {
    try {
      const res = await axios.get(url)
      const data = await res.data;

      const userData = data.filter((currElem) => {
        return currElem.username === email;
      })
      const filterData = userData[0].orders;
      setOrder(filterData)

    } catch (error) {
      var newPageURL = 'https://client-kappa-rouge-53.vercel.app/';
      window.location.href = newPageURL;
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders(URL);
  }, [])

  return (
    <Wrapper>
      <div className="order-container">
        <h1 className="order-heading">My Orders</h1>
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="order-card">
              <div>
                <h2 className="order-title">Name: {order.name}</h2>
                <p className="order-info">Email: {order.email}</p>
                <p className="order-info">Date: {order.date}</p>
                {/* Display limited order information here */}
                <p className='order-info'><b style={{ color: 'red' }}>{order.isReturn !== false ? "Returned" : null}</b></p>
                <p className='order-info'><b style={{ color: 'red' }}>{order.isDelivered !== false ? "Delivered" : null}</b></p>
                {
                  order.submissionDate !== "" ? <p className='order-info'><b>({order.submissionDate})</b></p> : null
                }
                <NavLink to={`/orders/${order.userID}`} className="order-link">View Details</NavLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
/* MyOrders.css */

body {
  font-family: 'Roboto', sans-serif;
}

.order-container {
  text-align: center;
  padding: 20px;
  font-family: math;
}

.order-heading {
  font-size: 3.8rem;
  margin-bottom: 20px;
  font-weight: 500;
  color: #333;
  font-family: ui-monospace;
}

.order-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.order-card {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  transition: transform 0.3s;
}

.order-card:hover {
  transform: translateY(-5px);
}

.order-title {
  font-size: 1.7rem;
  margin: 0;
  color: #333;
  font-weight: bold;
  font-family: monospace;
}

.order-info {
  margin: 5px 0;
  color: #555;
  font-family: monospace;
}

.order-link {
  text-decoration: none;
  color: #007bff;
  font-weight: 600;
  transition: color 0.2s;
  font-family: monospace;
  font-size: 1.5rem;
}

.order-link:hover {
  color: #0056b3;
}


`;

export default MyOrders