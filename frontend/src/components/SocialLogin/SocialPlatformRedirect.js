import { sendAccessToken } from "./SocialRedirectApi";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GooglesRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = queryParams.get("access_token");
    if (accessToken) {
      sendAccessToken("https://nbbang.shop/api/user/google-login", accessToken);
      navigate("/");
    }
  }, []);

  return <></>;
};

const NaverRedirect = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("code");

    if (accessToken) {
      sendAccessToken("https://nbbang.shop/api/user/naver-login", accessToken);
      navigate("/");
    }
  }, []);

  return <></>;
};

const KakaoRedirect = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("code");

    if (accessToken) {
      sendAccessToken("https://nbbang.shop/api/user/kakao-login", accessToken);
      navigate("/");
    }
  }, []);

  return <></>;
};

export { KakaoRedirect, NaverRedirect, GooglesRedirect };
