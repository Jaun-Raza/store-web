import React, { useEffect, useState } from 'react'
import { Button } from '../styles/Button';
import axios from 'axios';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa'
import Cookies from 'js-cookie'


const Login = () => {
    const [user, setuserData] = useState({ email: "", password: "" });
    const [click, setClick] = useState(false);

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

        const { email, password } = user;

        try {

          Cookies.set('razaStore', email, { expires: 1000 * 60 * 60 * 24, path: '/'}); // Expires in 7 days

            await axios.post("https://ecommserver-pado7k34.b4a.run/login", {
                email,
                password
            })

        } catch (error) {
            console.log(error);
        }
    }

    const googleAuth = async () => {
        try {
            
            window.open("https://ecommserver-pado7k34.b4a.run/auth/google", '_self')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Wrapper>
            <h2 style={{ fontFamily: "initial" }}>Log In</h2>
            <div className='container'>
                <form action="/" method="POST">
                    <input type="email" name="email" placeholder='email' value={user.email} onChange={handleInputs} />
                    <br />
                    <br />
                    <input type="password" name="password" placeholder='password' value={user.password} onChange={handleInputs} />
                    <br />
                    <br />
                    <br />
                    {user.email !== "" && user.password !== "" ? <Button type="submit" className={click ? "loading" : null} onClick={PostData}>Log In</Button> : <Button type="submit" disabled style={{ backgroundColor: "grey" }} onClick={PostData}>Log In</Button>}
                </form>
            </div>

            <br />
            <br />
            {/* <Button onClick={googleAuth} style={{ backgroundColor: 'red' }}> <FaGoogle /> Google</Button> */}
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }

    /* Define the loading spinner animation */
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

/* Example usage: Add the 'loading' class to your button element */
  `;


export default Login;