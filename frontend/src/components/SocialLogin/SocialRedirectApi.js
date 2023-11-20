import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const sendAccessToken = async (accessToken, apiUrl) => {
  const navigate = useNavigate();
  try {
    const response = await axios.post(apiUrl, { token: accessToken });

    if (response.status === 201) {
      Cookies.set("authToken", response.data, { expires: 30 });
      navigate("/");
    } else {
      console.log("APi 서버로 전송하는 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.log("Api 데이터 보내기 실패");
  }
};

export const OAuthRedirect = ({ accessTokenParam, apiUrl }) => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get(accessTokenParam);

    if (accessToken) {
      sendAccessToken(accessToken, apiUrl);
    }
  }, [accessTokenParam, apiUrl]);

  return <></>;
};

