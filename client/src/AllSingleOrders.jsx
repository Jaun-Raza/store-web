import React, { useState, useEffect } from 'react'
import { Button } from './styles/Button';
import axios from 'axios';
import styled from "styled-components";
import FormatPrice from './Helpers/FormatPrice';
import { useParams } from 'react-router-dom'
import { useOrderProvider } from './context/OrdersContext'
import { NavLink } from 'react-router-dom';


const URL = "https://ecommserver-pado7k34.b4a.run/allOrders/"

const SingleOrder = () => {

  const { getSingleOrder, singleOrder } = useOrderProvider();
  const [click, setClick] = useState(false);


  const { id } = useParams();

  const [orders, setOrders] = useState({});
  const [cart, setCartArr] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [user, setuserData] = useState({
    email: "",
    userID: "",
    isReturn: false,
    isDelivered: false
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setuserData({
      ...user,
      [name]: value
    });

  }

  const postData = async (e) => {
    e.preventDefault();

    setClick(true);

    const { email, userID, isReturn, isDelivered } = user;

    setTimeout(() => {
      var newPageURL = 'https://client-kappa-rouge-53.vercel.app/allOrders132';

      window.location.href = newPageURL;
    }, 5000)

    try {

      await axios.post("https://ecommserver-pado7k34.b4a.run/postAction", {
        email,
        userID,
        isReturn,
        isDelivered,
      })

    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    getSingleOrder(URL + id);
  }, [])

  setTimeout(() => {
    setOrders(singleOrder.singleOrder);
    setCartArr(singleOrder.singleOrder.order);
  }, 3000)

  // Simulate loading for a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoadingSpinner>
            <div className="loader"></div>
            <p>Loading...</p>
          </LoadingSpinner>
        </div>
      ) : (
        <div className='container'>
          <div className="grid grid-two-column">
            <div className='order-details'>
              <h3 className='order-info'>Order Details: {orders !== undefined ? orders.userID : null}</h3>
              <br />
              <br />
              <hr />
              <br />
              <div>
                <p className='order-info'><strong>Username:</strong> {orders !== undefined ? orders.name : null}</p>
              </div>
              <hr />
              <br />
              <div>
                <p className='order-info'><strong>Number:</strong> {orders !== undefined ? orders.number : null}</p>
              </div>
              <hr />
              <br />
              <div>
                <p className='order-info'><strong>Email:</strong> {orders !== undefined ? orders.email : null}</p>
              </div>
              <hr />
              <br />
              <div>
                <p className='order-info'><strong>Address:</strong> {orders !== undefined ? orders.address : null}</p>
              </div>
              <hr />
              <br />
              <div>
                <p className='order-info'><strong>Any Instructions:</strong> {orders !== undefined ? orders.instructions : null}</p>
              </div>
              <hr />
              <br />
              <div>
                <p className='order-info'><strong>Payment Method:</strong> {orders !== undefined ? orders.paymentMethod : null}</p>
              </div>
              <hr />
              <br />
              <div>
                <p className='order-info'><strong>Date:</strong> {orders !== undefined ? orders.date : null}</p>
              </div>
              <hr />
              <br />
              <div>
                {
                  orders !== undefined && orders.submissionDate !== "" ? <p className='order-info'><strong>SubmissionDate:</strong> {orders.submissionDate}</p>: null
                }
              </div>
              <hr />
              <br />
            </div>
            <div className='checkout-orders' >
              <div>
                {
                  cart.cartArr !== undefined ? cart.cartArr.map((currElem) => {
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
                    {
                      cart !== undefined ? <p><FormatPrice price={cart.total_price} /></p> : null
                    }
                  </div>
                  <div>
                    <p>Shipping Fee:</p>
                    {cart !== undefined ? <p><FormatPrice price={cart.shipping_fee} /></p> : null}
                  </div>
                  <hr />
                  <div>
                    <p>Grand Total:</p>
                    {cart !== undefined ? <p><FormatPrice price={cart.total_price + cart.shipping_fee} /></p> : null}
                  </div>
                </div>
              </div>
              <div>
                {
                  orders !== undefined && orders.isDelivered !== false ? <p><b style={{ color: 'red' }}>Devlivered</b></p> : null
                }
                {
                  orders !== undefined && orders.isReturn !== false ? <p className='order-info'><b style={{ color: 'red' }}>Returned</b></p> : null
                }
              </div>
              <br />
              <br />
              <div className='action-form'>
                <form method="post">
                  <input type="email" name='email' value={user.email} onChange={handleInputs} placeholder='email' />
                  <br />
                  <br />
                  <input type="Number" name='userID' value={user.userID} onChange={handleInputs} placeholder='userID' />
                  <br />
                  <br />
                  <p><b>Return: <input type="checkbox" name="isReturn" value={user.isReturn} id="" onChange={handleInputs} /></b></p>
                  <br />
                  <p><b>Delivered: <input type="checkbox" name="isDelivered" value={user.isDelivered} id="" onChange={handleInputs} /></b></p>
                  <br />
                  <Button type='submit' className={click ? "loading" : null} onClick={postData}>Proceed</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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

  .order-details {
    width: 100%;
    border-radius: 1rem;
    background: ghostwhite;
    padding: 3rem;
}

.order-info{
  line-height: 1.8;
    color: #575757;
    font-family: monospace;
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

const LoadingSpinner = styled.div`
  text-align: center;
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  p {
    margin-top: 16px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default SingleOrder;