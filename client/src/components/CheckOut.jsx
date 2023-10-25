import React, { useState } from 'react'
import { Button } from '../styles/Button';
import axios from 'axios';
import styled from "styled-components";
import FormatPrice from '../Helpers/FormatPrice';

const CheckOut = ({ data, isAuthenticated, email }) => {

  const randomNum = Math.random();
  const randomId = JSON.stringify(randomNum).slice(2, 8);
  const [click, setClick] = useState(false);

  const [user, setuserData] = useState({
    userID: randomId,
    order: data,
    email: email,
    name: JSON.stringify(email).slice(1, -11),
    number: "",
    address: "",
    instructions: "",
    paymentMethod: "COD",
  });

  const handleInputs = (e) => {
    setuserData({ ...user, [e.target.name]: e.target.value })
  }

  const PostData = async (e) => {
    e.preventDefault();

    setClick(true);

    setTimeout(() => {
      var newPageURL = 'https://client-kappa-rouge-53.vercel.app/';

      window.location.href = newPageURL;
    }, 5000);

    const { userID, order, name, email, number, address, instructions, paymentMethod } = user;

    try {

      await axios.post("https://ecommserver-pado7k34.b4a.run/ordersData", {
        userID, order, name, email, number, address, instructions, paymentMethod
      })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>

      <div className='container'>
        <div className="grid grid-two-column">
          <div className='order-details'>
            <h3>Order Details:</h3>
            <br />
            <form action='/' method='POST'>
              <input type="username" name="name" placeholder='Username' value={user.name} onChange={handleInputs} readOnly />
              <br />
              <br />
              <input type="tell" name="number" placeholder='Number' value={user.number} onChange={handleInputs} />
              <br />
              <br />
              <input type="email" name="email" placeholder='Email' value={user.email} onChange={handleInputs} readOnly />
              <br />
              <br />
              <input type="text" name="address" placeholder='Address' value={user.address} style={{ width: '100%' }} onChange={handleInputs} />
              <br />
              <br />
              <textarea type="text" name="instructions" placeholder='Any Instructions?' style={{ width: '100%', height: '150px' }} value={user.instructions} onChange={handleInputs} />
              <br />
              <br />
              <input type="number" name="paymentMethod" value={user.paymentMethod} placeholder={user.paymentMethod} onChange={handleInputs} />
              <br />
              <br />
              <p style={{ color: 'red' }} >Payment method will be "COD" because this store only contains "COD".</p>
              <br />
              {user.name !== "" && user.number !== "" && user.address !== "" && user.number !== "" && isAuthenticated !== false ? <Button className={click ? "loading" : null} type="submit" onClick={PostData}>CheckOut</Button> : <Button type="submit" disabled style={{ backgroundColor: "grey" }} onClick={PostData}>Complete All Fields & Also Login To CheckOut</Button>}

            </form>
          </div>
          <div className='checkout-orders' >
            <div>
              {
                data !== undefined ? data.cartArr.map((currElem) => {
                  return (
                    <div className='cart_heading grid grid-five-column' >
                      <div className="cart-image--name">
                        <div>
                          <figure>
                            <img src={currElem.image} alt={currElem.id} />
                          </figure>
                        </div>
                        <div>
                          <p>{currElem.name}</p>
                          <div className="color-div">
                            <p>Color:</p>
                            <div className="color-style" style={{ backgroundColor: currElem.color, color: currElem.color }}></div>
                          </div>
                        </div>
                      </div>

                      <p style={{ color: 'purple' }} >x{currElem.amount}</p>

                      <div>
                        <p style={{ color: 'red' }} ><FormatPrice price={currElem.price * currElem.amount} /></p>
                      </div>

                    </div>
                  )
                }) : null
              }
            </div>

            <div className="order-total--amount" style={{ width: '100%' }}>
              <div className="order-total--subdata">
                <div>
                  <p>Subtotal:</p>
                  <p><FormatPrice price={data.total_price} /></p>
                </div>
                <div>
                  <p>Shipping Fee:</p>
                  <p><FormatPrice price={data.shipping_fee} /></p>
                </div>
                <hr />
                <div>
                  <p>Grand Total:</p>
                  <p><FormatPrice price={data.total_price + data.shipping_fee} /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Style the button */
  .loading {
    position: relative;
    overflow: hidden;
    cursor: not-allowed;
  }
  
  .loading:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #3498db;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  /* Optional: Adjust the button appearance */
  .loading-text {
    opacity: 0; /* Hide button text while loading */
  }
  
  /* Optional: Change button background color */
  .loading-background {
    background-color: #ccc; /* Change to your preferred background color */
  }
  

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    align-items: normal;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  .checkout-orders {
    width: 100%
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .order-details {
      width: 100%;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .checkout-orders {
      width: 100%
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;
      align-items: normal;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default CheckOut