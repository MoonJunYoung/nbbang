import React from "react";
import styled from "styled-components";
import Nav from "../../components/Nav";
import Googles from "../../components/GoogleLogin";
import KakaoLogin from "../../components/KakaoLogin";
import NaverLogin from "../../components/NaverLogin";
import Login from "../../components/Login";

const SigndContainer = styled.div`
  display: inline-block;
  background-color: azure;
  position: relative;
`;

const PlatformSigndContainer = styled.div`
  margin: 0px 15px 10px;
  position: absolute;
  bottom: 0px;
  left: 20px;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    left: 0px;
  }
`;

const PlatformSigndComent = styled.p`
  position: absolute;
  bottom: 34px;
  left: 102px;
  font-size: 13px;
  color: white;
  font-weight: 700;
  @media (max-width: 768px) {
    left: 87px;
  }
`;

const SigndPage = () => {
  return (
    <SigndContainer>
      <Nav />
      <Login />
      <PlatformSigndComent>SNS계정으로 간편가입하기</PlatformSigndComent>
      <PlatformSigndContainer>
        <Googles />
        <KakaoLogin />
        <NaverLogin />
      </PlatformSigndContainer>
    </SigndContainer>
  );
};

export default SigndPage;
