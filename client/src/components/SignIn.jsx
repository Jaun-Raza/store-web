import React, { useState } from 'react'
import { Button } from '../styles/Button';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa'
import Cookies from 'js-cookie'

const SignIn = () => {

    const [user, setuserData] = useState({ email: "", password: "" });
    const [click, setClick] = useState(false);


    const handleInputs = (e) => {
        setuserData({ ...user, [e.target.name]: e.target.value })
    }

    const PostData = async (e) => {
        e.preventDefault();
        
        const { email, password } = user;

        setClick(true);
        
        Cookies.set('razaStore', email, { expires: 1000 * 60 * 60 * 24, path: '/'}); 

        setTimeout(() => {
            var newPageURL = 'https://client-kappa-rouge-53.vercel.app/';

            window.location.href = newPageURL;
        }, 5000);

        try {
            await axios.post("https://ecommserver-pado7k34.b4a.run/signin", {
                email,
                password
            })

        } catch (error) {
            console.log(error);
        }
    }

    const googleAuth = async () => {
        try {
          window.open("https://ecommserver-pado7k34.b4a.run/auth/google", '_self');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper>
            <h2 style={{ fontFamily: "initial" }}>Sign In</h2>
            <div className='container'>
                <form action="/" method="POST">
                    <input type="email" placeholder='email' name="email" value={user.email} onChange={handleInputs} />
                    <br />
                    <br />
                    <input type="password" placeholder='password' name="password" value={user.password} onChange={handleInputs} />
                    <br />
                    <br />
                    <br />
                    {user.email !== "" && user.password !== "" ? <Button type="submit" className={click ? "loading" : null} onClick={PostData}>Sign Up</Button> : <Button type="submit" disabled style={{ backgroundColor: "grey" }} onClick={PostData}>Sign Up</Button>}
                </form>
                <br />
                <p>Already have an account?
                    <NavLink to='/log'>
                        <p style={{ color: 'blue' }}>
                            Log In
                        </p>
                    </NavLink>

                </p>
                <br />

                {/* <Button onClick={googleAuth} style={{ backgroundColor: 'red' }}> <FaGoogle /> Google</Button> */}

            </div>
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
      
  `;

export default SignIn