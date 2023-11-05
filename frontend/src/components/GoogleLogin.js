import React from "react";
import styled from "styled-components";

const GooglesContainer = styled.div`
  margin-top: 55px;
  position: relative;
  img {
    position: absolute;
    width: 25px;
    top: 8px;
    left: 20px;
  }
  &:hover {
    color: black;
    transition: all 0.2s;
    transform: scale(1.10);
  }
`;

const Button = styled.button`
      width: 230px;
    height: 40px;
    background: white;
    border: 1px solid paleturquoise;
    border-radius: 10px;
`;

const Googles = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=470039216193-568hnttd1011ddmc5j22nqia9rcjm1ah.apps.googleusercontent.com&redirect_uri=https://nbbang.shop/signd";
  };

  return (
    <GooglesContainer onClick={handleGoogleLogin} >
        <img 
          alt='N/1'
          src='/images/google.png'
        />
      <Button>구글 로그인</Button>
    </GooglesContainer>
  );
};

export default Googles;
