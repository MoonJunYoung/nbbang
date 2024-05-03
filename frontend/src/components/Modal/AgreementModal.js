import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";

const AgreementModalContainer = styled.div`
  z-index: 10;
  position: absolute;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px;
  height: auto;
  width: auto;
  background: white;
  border-radius: 8px;
  transition: all 400ms ease-in-out;
  animation: fadeIn 400ms;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalClose = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 8px;
  background: none;
  border: none;
`;

const AgreementContainer = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const AgreementChenckBox = styled.input``;

const SignUpButton = styled.button`
  color: white;
  margin-top: 10px;
  border: 1px solid lightgray;
  font-weight: 600;
  width: 290px;
  height: 40px;
  border-radius: 5px;

  &:not(:disabled) {
    background-color: #0066ffd4;
    border: 1px solid lightgray;
    border-bottom: 1px solid #e1e1e1a8;
    box-shadow: 3px 4px 4px 0px #c6c6c666;
    color: white;
    cursor: pointer;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: white;
  }
`;
const TextBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Button = styled.div`
  cursor: pointer;
  box-shadow: 0px 2px 3px #c3a99759;
  border-radius: 12px;
  border: 1px solid #e6e6e666;
  width: 105px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Agreement = ({ setOpenModal, userData, navigate, apiUrl }) => {
  const [notAllow, setNotAllow] = useState(true);
  const [SginAgreement, setSginAgreement] = useState(false);
  useEffect(() => {
    if (SginAgreement) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [SginAgreement]);

  const handleSingUp = async () => {
    userData.agreement = true;
    try {
      const response = await axios.post(apiUrl, userData);
      console.log(response);
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
  const cancel = () => {
    navigate("/");
  };

  return (
    <AgreementModalContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={cancel}>X</ModalClose>
          <AgreementContainer>
            <AgreementChenckBox
              type="checkbox"
              checked={SginAgreement}
              onChange={(e) => setSginAgreement(e.target.checked)}
            />
            <TextBox>
              <a
                href="https://nbbang.shop/user-protocol"
                target="_blank"
                rel="noopener noreferrer"
              >
                회원가입 및 이용약관
              </a>
              <a>을 모두 확인하였으며, 이에 동의합니다.</a>
            </TextBox>
          </AgreementContainer>
          <SignUpButton
            onClick={handleSingUp}
            type="submit"
            disabled={notAllow}
          >
            가입하기
          </SignUpButton>
        </Modal>
      </WrapperModal>
    </AgreementModalContainer>
  );
};

export default Agreement;
