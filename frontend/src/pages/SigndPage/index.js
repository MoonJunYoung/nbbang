import React from "react";
import styled from "styled-components";
import {
  NaverLogin,
  KakaoLogin,
  GoogleLogin,
} from "../../components/SocialLogin/SocialPlatformLogin";
import { Link } from "react-router-dom";
import SigndLogo from "../../components/Auth/SigndLogo";

const SigndContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const SigndTopLine = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const SigndLine = styled.div`
  border-top: 1px solid silver;
  width: 135px;

  margin-top: 10px;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const SigndLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

const SingndLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const SigndPage = () => {
  return (
    <SigndContainer>
      <SigndLogo />
      {navigator.userAgent.includes("KAKAOTALK") ? null : <GoogleLogin />}
      <KakaoLogin />
      <NaverLogin />
      <SigndTopLine>
        <SigndLine></SigndLine>
        <SigndLineComent>or</SigndLineComent>
        <SigndLine></SigndLine>
      </SigndTopLine>
      <SingndLink>
        <Link
          to="/sign-in"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          로그인 하러가기
        </Link>
        <span style={{ marginBottom: "4px" }}>/</span>
        <Link
          to="/sign-up"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          간편 회원가입 하러가기
        </Link>
      </SingndLink>
    </SigndContainer>
  );
};

export default SigndPage;
