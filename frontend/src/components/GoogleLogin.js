import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";

const GooglesContainer = styled.div`
  margin-top: 60px;
`;

const Button = styled.button``;

const Googles = () => {
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=470039216193-568hnttd1011ddmc5j22nqia9rcjm1ah.apps.googleusercontent.com&redirect_uri=https://nbbang.shop/signd";
  const navigate = useNavigate();

  const [popup, setPopup] = useState(null);

  const handleGoogleLogin = () => {
    let newPopup = window.open(authUrl, "Google Login", "width=600,height=400");
  
    let prevPopupUrl = "";
  
    window.addEventListener("message", (event) => {
      if (event.origin === "https://nbbang.shop") {
        const currentPopupUrl = newPopup.location.href;
        
        if (currentPopupUrl !== prevPopupUrl) {
          const accessToken = new URLSearchParams(
            newPopup.location.hash.substring(1)
          ).get("access_token");


          if (accessToken) {
            sendAccessTokenToServer(accessToken);
  
            newPopup.close();
          }
        
          prevPopupUrl = currentPopupUrl;
        }
      }
    });
    setPopup(newPopup);
  };
  
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
        console.error(
          "자격 증명 정보를 서버로 전송하는 중 오류가 발생했습니다." 
        ); 
      }
    } catch (error) {
      console.error("POST 데이터 보내기 실패", error);
    }
  };
 
  return (
    <GooglesContainer>
      <Button onClick={handleGoogleLogin}>구글 로그인</Button>
    </GooglesContainer>
  );
};

export default Googles;
