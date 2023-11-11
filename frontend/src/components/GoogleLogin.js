import React from "react";
import styled from "styled-components";

const GooglesContainer = styled.div`

  width: 90px;
  height: 30px;
  background: white;
  border: 1px solid paleturquoise;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  img {
    width: 15px;
    margin-bottom: 3px;
  }
`;

const Button = styled.button`
  color: black;
  background: white;
  border: 1px solid white;
  cursor: pointer;
`;

const Googles = () => {
  const handleGoogleLogin = () => {
    if (navigator.userAgent.includes("KAKAOTALK")) {
      alert(
        "구글 SNS 로그인을 지원하지 않는 브라우저 앱 입니다. 다른 로그인 기능을 이용해주세요!"
      );
    } else {
      window.location.href =
        "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=470039216193-568hnttd1011ddmc5j22nqia9rcjm1ah.apps.googleusercontent.com&redirect_uri=https://nbbang.shop/google-redirect";
    }
  };

  return (
    <GooglesContainer onClick={handleGoogleLogin}>
      <img alt="google" src="/images/google.png" />
      <Button>로그인</Button>
    </GooglesContainer>
  );
};

export default Googles;
