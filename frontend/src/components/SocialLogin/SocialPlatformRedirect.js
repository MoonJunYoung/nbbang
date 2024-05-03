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
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("code");

    if (accessToken) {
      sendAccessToken(
        accessToken,
        "https://nbbang.shop/api/user/naver-login",
        navigate
      );
    }
  }, []);

  return <></>;
};

const KakaoRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("code");

    if (accessToken) {
      sendAccessToken(
        accessToken,
        "https://nbbang.shop/api/user/kakao-login",
        navigate
      );
    }
  }, []);

  return <></>;
};

export { KakaoRedirect, NaverRedirect, GooglesRedirect };
