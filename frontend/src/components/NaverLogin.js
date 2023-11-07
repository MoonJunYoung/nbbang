import React from "react";
import styled from "styled-components";

const NaverLoginContainer = styled.div`
  margin-top: 30px;
  position: relative;
  img {
    position: absolute;
    width: 25px;
    top: 8px;
    left: 20px;
  }
`;

const Button = styled.button`
  color: white;
  width: 230px;
  height: 40px;
  background: #03C75A;
  border: 1px solid paleturquoise;
  border-radius: 10px;
  cursor: pointer;
`;

const NaverLogin = () => {
  const handleNaverLogin = () => {
      window.location.href =
        "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=QND4X2NgUTIuoNUvS2uz&redirect_uri=https://nbbang.shop/naver-redirect";
  };

  return (
    <NaverLoginContainer onClick={handleNaverLogin}>
      <img alt="naver" src="/images/naver.png" />
      <Button>네이버 로그인</Button>
    </NaverLoginContainer>
  );
};

export default NaverLogin;
