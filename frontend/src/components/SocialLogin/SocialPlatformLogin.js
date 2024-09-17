import React from "react";
import { SocialLoginForm } from "./SocialLoginForm";

const KakaoLogin = () => {
  const kakaoProps = {
    alt: "Kakao",
    src: "/images/kakao.png",
    comment: "카카오톡 로그인으로 시작하기",
    socialLoginUrl:
      "https://kauth.kakao.com/oauth/authorize?client_id=3d14355e2c9679326b4c15d249b82bc5&redirect_uri=https://nbbang.shop/kakao-redirect&response_type=code",
    containerStyle: {
      backgroundColor: "#FEE500",
      borderColor: "#FEE500",
    },

    buttonStyle: {
      textColor: "black",
      backgroundColor: "#FEE500",
      borderColor: "#FEE500",
    },
  };

  return <SocialLoginForm {...kakaoProps} />;
};

const NaverLogin = () => {
  const naverProps = {
    alt: "Naver",
    src: "/images/naver.png",
    comment: "네이버 로그인으로 시작하기",
    socialLoginUrl:
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=QND4X2NgUTIuoNUvS2uz&redirect_uri=https://nbbang.shop/naver-redirect",
    containerStyle: {},
    buttonStyle: {},
  };

  return <SocialLoginForm {...naverProps} />;
};

const GoogleLogin = () => {
  const googleProps = {
    alt: "google",
    src: "/images/google.png",
    comment: "구글 로그인으로 시작하기",
    socialLoginUrl:
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=470039216193-568hnttd1011ddmc5j22nqia9rcjm1ah.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google-redirect",
      // "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=470039216193-568hnttd1011ddmc5j22nqia9rcjm1ah.apps.googleusercontent.com&redirect_uri=https://nbbang.shop/google-redirect",
    containerStyle: {
      backgroundColor: "white",
      gapSize: "38px"
    },
    imgStyle: {
      imgWidth: "18px",
    },

    buttonStyle: {
      textColor: "black",
      backgroundColor: "white",
      borderColor: "white",
    },
  };

  return <SocialLoginForm {...googleProps} />;
};

export { KakaoLogin, NaverLogin, GoogleLogin };
