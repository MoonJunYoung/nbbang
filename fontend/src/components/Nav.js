import React from 'react'
import styled from 'styled-components' 

const Logo = styled.a`
  display: inline-block;
  width: 100px;
  margin: 20px;
  img{
    display: block;
    width: 100%;
    border-radius: 15px;
  }
`

const Nav = () => {
  return (
    <Logo>
      <img 
        alt='N/1'
        src='/images/Logo.png'
        onClick = {()=> (window.location.href = "/")} 
      />
    </Logo>
  )
}

export default Nav