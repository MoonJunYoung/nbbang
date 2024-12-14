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

const OAuthContainer = styled.div`
  margin-top: 100px;
`


const SigndLineComent = styled.p`
  margin: 30px 0px;
  font-size: 14px;
  color: silver;
  font-weight: 700;
`;

const SingnUpLink = styled(Link)`
  display: inline-block;
  border-radius: 10px;
  width: 340px;
  height: 45px;
  border: 1px solid #E5E7EB;
  text-align: center;
  align-content: center;
`;

const SingnInLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Notice = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
`

const SigndPage = () => {
  return (
    <SigndContainer>
      <SigndLogo />
      <Notice>회원님의 개인정보 보호를 위해 가입 시 이름 정보만 저장됩니다.</Notice>
      <OAuthContainer>
        <KakaoLogin />
        <NaverLogin />
        {navigator.userAgent.includes("KAKAOTALK") ? null : <GoogleLogin />}
      </OAuthContainer>
      <SigndLineComent>또는</SigndLineComent>
      <SingnUpLink
          to="/sign-up"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
         아이디로 가입하기
      </SingnUpLink>
      <SingnInLink>
        <SigndLineComent>이미 아이디가 있으신가요?</SigndLineComent>
        <Link
          to="/sign-in"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          로그인하기
        </Link>
      </SingnInLink>
    </SigndContainer>
  );
};

export default SigndPage;
