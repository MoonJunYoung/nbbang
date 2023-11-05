import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const GooglesRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");

    if (accessToken) {
      sendAccessTokenToServer(accessToken);
    } 
  }, []);

  const sendAccessTokenToServer = async (accessToken) => {
    try {
      const response = await axios.post(
        "https://nbbang.shop/api/user/google-login",
        { token: accessToken }
      );

      if (response.status === 201) {
        console.log("자격 증명 정보가 서버로 전송되었습니다.");
        Cookies.set("authToken", response.data, { expires: 30 });
        navigate("/");
      } else {
        console.error("자격 증명 정보를 서버로 전송하는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("POST 데이터 보내기 실패", error);
    }
  };

  return (
    <>
    </>
  );
};

export default GooglesRedirect;
