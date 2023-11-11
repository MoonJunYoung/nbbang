import React from "react";
import styled from "styled-components";

const NaverLoginContainer = styled.div`
  width: 90px;
  height: 30px;
  background: #03c75a;
  border: 1px solid paleturquoise;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  img {
    width: 25px;
    margin-bottom: 3px;
  }
`;

const Button = styled.button`
  color: white;

  background: #03c75a;
  border: 1px solid #03c75a;

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
      <Button>로그인</Button>
    </NaverLoginContainer>
  );
};

export default NaverLogin;
