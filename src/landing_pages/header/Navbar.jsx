import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
  height: 13%;
  overflow: hidden;
  z-index:2000;
  position: fixed; 
  top: 0;
  background-color: #efe9e9;
  box-shadow: 12px 2px 9px #888888;
  padding: 16px 120px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
    font-size: 2.2rem;
    color: black;
  }
`

const Navbar = () => {
  return (
    <Nav >
      <div className="logo">
        DEMO POS
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar