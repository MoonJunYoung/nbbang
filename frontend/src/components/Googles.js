import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import styled from "styled-components";
import axios from "axios";

const GooglesContainer = styled.div`
  margin-top: 60px;
`;

const Googles = () => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(googleClientId)
  const navigate = useNavigate();
  const handlePostData = async (res) => {
    const updatedFormData = { token: res.credential };
    try {
      const response = await axios.post(
        "https://nbbang.shop/api/user/google-login",
        updatedFormData
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
  const handleFailure = (err) => {
    console.log(err);
  };

  return (
    <GooglesContainer>
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLogin onSuccess={handlePostData} onFailure={handleFailure} />
      </GoogleOAuthProvider>
    </GooglesContainer>
  );
};

export default Googles;
