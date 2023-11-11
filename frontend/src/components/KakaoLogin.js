import React from "react";
import styled from "styled-components";

const KakaoContainer = styled.div`
  width: 90px;
  height: 30px;
  background: #fdef72;
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
    color: black;
    background: #fdef72;
    border: 1px solid #fdef72;
    cursor: pointer;
`;

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=904f6d1fcb87f1741d5c8cfad188ffc2&redirect_uri=https://nbbang.shop/kakao-redirect&response_type=code";
  };

  return (
    <KakaoContainer onClick={handleKakaoLogin}>
      <img alt="Kakao" src="/images/kakao.png" />
      <Button>로그인</Button>
    </KakaoContainer>
  );
};

export default KakaoLogin;
