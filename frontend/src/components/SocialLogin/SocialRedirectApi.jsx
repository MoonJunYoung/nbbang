import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AgreementModal from "../Modal/AgreementModal";

export const Redirect = ({ accessToken, apiUrl, navigate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(false);
  const RedirectAPI = async () => {
    try {
      const response = await axios.post(apiUrl, { token: accessToken });
      if (response.status === 201) {
        Cookies.set("authToken", response.data, { expires: 30 });
        navigate("/");
      } else if (response.status === 202) {
        setUserData(response.data);
        setOpenModal(true);
      } else {
        console.log("APi 서버로 전송하는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.log("Api 데이터 보내기 실패");
    }
  };
  useEffect(() => {
    RedirectAPI();
  }, []);

  return (
    <>
      {openModal && (
        <AgreementModal
          setOpenModal={setOpenModal}
          userData={userData}
          navigate={navigate}
          apiUrl={apiUrl}
        />
      )}
    </>
  );
};
