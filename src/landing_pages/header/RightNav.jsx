import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
    margin: 0px 20px
  }
  li a{
    color: black;
    font-weight: 400;
    font-size: 1.5rem;
    font-weight: 300;
  }
  button{
      border: 2px solid white;
      padding: 0px 20px;
      height: 40px;
      margin: auto 5px;
      width: 130px;
  }

  button a{
    color: white;
    font-size: 1.6rem;
  }
  span{
    margin-left: 5px;
    font-size: 2rem;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #cc19ff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    z-index: 10;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }

    li a{
      color: white;
      font-weight:500;
    }
    button{
      margin: 250px auto;
      background-color: transparent;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>
        <Link to="/">HOME</Link>
        {/* <a href="/home">HOME</a> */}
      </li>
      <li>
      <Link to="/aboutus">ABOUT</Link>
        {/* <a href="/aboutus">ABOUT US</a> */}
      </li>
      <li>      
      <Link to="/contactus">CONTACT US</Link>
        {/* <a href="/contactus">CONTACT US</a> */}
      </li>
      <button >
      <Link to="/login">Login</Link>
        {/* <a href="/login">Login<span>&rarr;</span></a> */}
        </button>

    </Ul>
  )
}

export default RightNav