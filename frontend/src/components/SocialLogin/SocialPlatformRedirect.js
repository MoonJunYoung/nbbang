import React from "react";
import { OAuthRedirect } from "./SocialRedirectApi";

const GooglesRedirect = () => {
  return (
    <OAuthRedirect
      accessTokenParam="access_token"
      apiUrl="https://nbbang.shop/api/user/google-login"
    />
  );
};

const NaverRedirect = () => {
  return (
    <OAuthRedirect
      accessTokenParam="code"
      apiUrl="https://nbbang.shop/api/user/naver-login"
    />
  );
};

const KakaoRedirect = () => {
  return (
    <OAuthRedirect
      accessTokenParam="code"
      apiUrl="https://nbbang.shop/api/user/kakao-login"
    />
  );
};

export { KakaoRedirect, NaverRedirect, GooglesRedirect };
