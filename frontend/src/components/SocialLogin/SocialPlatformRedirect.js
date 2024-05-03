import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Redirect } from "./SocialRedirectApi";

const GooglesRedirect = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = queryParams.get("access_token");
  const apiUrl = "https://nbbang.shop/api/user/google-login";

  return (
    <>
      <Redirect accessToken={accessToken} apiUrl={apiUrl} navigate={navigate} />
    </>
  );
};

const NaverRedirect = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = queryParams.get("access_token");
  const apiUrl = "https://nbbang.shop/api/user/naver-login";

  return (
    <>
      <Redirect accessToken={accessToken} apiUrl={apiUrl} navigate={navigate} />
    </>
  );
};

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = queryParams.get("access_token");
  const apiUrl = "https://nbbang.shop/api/user/kakao-login";

  return (
    <>
      <Redirect accessToken={accessToken} apiUrl={apiUrl} navigate={navigate} />
    </>
  );
};

export { KakaoRedirect, NaverRedirect, GooglesRedirect };
