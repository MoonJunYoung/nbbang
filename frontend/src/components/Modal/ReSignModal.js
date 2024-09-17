import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Cookies from "js-cookie";
import { deleteUser,Token } from "../../api/api";
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
  height: auto;
  width: auto;
  max-width: 650px;
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
  font-size: 16px;
  top: 0;
  right: 5px;
  background: none;
  border: none;
`;

const TextContainer = styled.div`
  margin-top: 15px;
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
`;
const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  margin: 3px;
  text-align: left;
`;

const Button = styled.button`
  margin-top: 10px;
  border: 1px solid lightgray;
  font-weight: 600;
  width: 160px;
  height: 30px;
  border-bottom: 1px solid #e1e1e1a8; 
  box-shadow: 3px 4px 4px 0px #c6c6c666;
  border-radius: 12px;

  &:not(:disabled) {
    background-color: #0066ffd4;
    color: white;
    cursor: pointer;

  &:disabled {
    background-color: #d3d3d3;
    color: #c9c9c9;
  }
}
`;

const Agreement = styled.input``;

const ReSignModal = ({ secondSetOpenModal }) => {
  const navigate = useNavigate();
  const [ReSginAgreement, setReSginAgreement] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleReSign = async () => {
    try {
      console.log("ofnsdfbndsofsdbof")
      await deleteUser();
      Cookies.remove("authToken");
      navigate("/signd");
    } catch (error) {
      console.log("Api 데이터 삭제 실패");
    }
  };



  useEffect(() => {
    if (ReSginAgreement) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [ReSginAgreement]);

  return (
    <ReSignModalContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={() => secondSetOpenModal(false)}>X</ModalClose>
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
                탈퇴 후 해당 정보는 모두 삭제되어 이용할 수 없으며 복구가
                불가능합니다.
                <br></br>- 회원 데이터
                <br></br>- 생성한 모임 데이터
                <br></br>- 모임의 멤버 데이터
                <br></br>- 모임의 결제내역 데이터
                <br></br>- 공유된 정산결과 데이터
                <br></br>
              </Text>
            </div>
          </TextContainer>
          <ButtonContainer>
            <div>
              <Agreement
                type="checkbox"
                checked={ReSginAgreement}
                onChange={(e) => setReSginAgreement(e.target.checked)}
              />
              안내 사항을 모두 확인하였으며, 이에 동의합니다.
            </div>
            <Button disabled={notAllow} onClick={handleReSign}>
              회원탈퇴
            </Button>
          </ButtonContainer>
        </Modal>
      </WrapperModal>
    </ReSignModalContainer>
  );
};

export default ReSignModal;
