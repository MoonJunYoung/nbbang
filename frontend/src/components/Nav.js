import styled from 'styled-components'

const NavContainer = styled.div``

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
    <NavContainer>
      <Logo>
        <img 
          alt='N/1'
          src='/images/Logo.png'
          onClick={() => (window.location.href = "/")} 
        />
      </Logo>
    </NavContainer>
  );
}

export default Nav;
