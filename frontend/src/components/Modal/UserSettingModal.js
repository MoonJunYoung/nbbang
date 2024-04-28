import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Cookies from "js-cookie";
import ReSingModal from "./ReSignModal";
const UserSettingModalContainer = styled.div`
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
  height: 180px;
  width: 250px;
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

const SettingContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const UserSetting = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const [openModal, secondSetOpenModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    secondSetOpenModal(true);
  };

  const handleLogOut = () => {
    Cookies.remove("authToken");
    navigate("/signd");
  };

  return (
    <UserSettingModalContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={() => setOpenModal(false)}>X</ModalClose>
          <SettingContainer>
            <Button onClick={handleLogOut}>로그아웃</Button>
            <Button onClick={handleClick}>회원탈퇴</Button>
            {openModal && <ReSingModal setOpenModal={secondSetOpenModal} />}
          </SettingContainer>
        </Modal>
      </WrapperModal>
    </UserSettingModalContainer>
  );
};

export default UserSetting;
