import React from "react";
import styled from "styled-components";
import Nav from "../../components/Nav";
import Googles from "../../components/GoogleLogin";
import KakaoLogin from "../../components/KakaoLogin";
import NaverLogin from "../../components/NaverLogin";

const SigndContainer = styled.div`
  height: 100vh;
  display: inline-block;
  background-color: azure;
`;

const SigndPage = () => {

  return (
    <SigndContainer>
      <Nav />
      <Googles />
      <KakaoLogin />
      <NaverLogin />
    </SigndContainer>
  );
};

export default SigndPage;
