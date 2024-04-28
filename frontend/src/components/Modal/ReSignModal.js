import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Cookies from "js-cookie";
import { deleteUser } from "../../api/api";
const ReSignModalContainer = styled.div`
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
  height: 350px;
  width: 500px;
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

const TextContainer = styled.div`
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
`;
const Text = styled.p`
  margin: 3px;
  text-align: left;
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
const ReSign = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const handleReSign = async () => {
    try {
      await deleteUser();
    } catch (error) {
      console.log("Api 데이터 삭제 실패");
    }
    Cookies.remove("authToken");
    navigate("/signd");
  };

  return (
    <ReSignModalContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={() => setOpenModal(false)}>X</ModalClose>
          <TextContainer>
            <div>
              <Text style={{ fontWeight: "bold" }}>
                회원탈퇴 신청에 앞서 아래 사항에 대해 확인하시기 바랍니다.
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                탈퇴 후 회원 정보 및 제작한 앱은 모두 삭제 됩니다.
              </Text>
              <Text>
                삭제되는 정산 관련 정보는 아래 항목을 확인해주시기 바랍니다.
                탈퇴 후 해당 정보는 모두 삭제되어 이용할 수 없으며 복구가 불가능
                합니다.
                <br></br>- 회원 데이터
                <br></br>- 생성한 모임 데이터
                <br></br>- 모임의 멤버 데이터
                <br></br>- 모임의 결젠내역 데이터
                <br></br>- 공유된 정산결과 데이터
              </Text>
            </div>
          </TextContainer>
          <Button onClick={handleReSign}>회원탈퇴</Button>
        </Modal>
      </WrapperModal>
    </ReSignModalContainer>
  );
};

export default ReSign;
