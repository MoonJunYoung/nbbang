import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components' 
import Nav from '../../components/Nav';

const Container = styled.div`
  width: 100%;
`

const MainPage = () => {
  const navigate = useNavigate();
  const authToken = Cookies.get('authToken');
  useEffect(() => {
    if (!authToken) {
      navigate("/signd");
    }
  }, [authToken, navigate]);

  return (
    <Container>
      <Nav />
    </Container>
  );
}

export default MainPage;
