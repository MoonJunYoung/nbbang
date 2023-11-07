import React from "react";
import styled from "styled-components";

const KakaoContainer = styled.div`
  margin-top: 30px;
  position: relative;
  img {
    position: absolute;
    width: 30px;
    top: 5px;
    left: 17px;
  }
`;

const Button = styled.button`
  width: 230px;
  height: 40px;
  background: #FDEF72;
  border: 1px solid papayawhip;
  border-radius: 10px;
  font-weight: 600;
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
      <Button>
        kakao 로그인
      </Button>
    </KakaoContainer>
  );
};

export default KakaoLogin;
