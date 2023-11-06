import React from "react";
import styled from "styled-components";

const GooglesContainer = styled.div`
  margin-top: 40px;
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
    if (navigator.userAgent.includes("KAKAOTALK")) {
      alert("구글 SNS 로그인을 지원하지 않는 브라우저 앱 입니다. 다른 브라우저를 이용해주세요!");
    } else {
      window.location.href =
        "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=470039216193-568hnttd1011ddmc5j22nqia9rcjm1ah.apps.googleusercontent.com&redirect_uri=https://nbbang.shop/google-redirect";
    }
  };

  return (
    <GooglesContainer onClick={handleGoogleLogin}>
      <img alt="google" src="/images/google.png" />
      <Button>구글 로그인</Button>
    </GooglesContainer>
  );
};

export default Googles;
