import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useParams } from "react-router-dom";
import {
  PatchBillingUserKaKaoDeposit,
  PatchBillingMeetingKakaoDeposit,
} from "../../api/api";
import KakaoIdExplain from "./KakaoIdExplain";

const BillingResultContainer = styled.div`
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
  height: 290px;
  width: 250px;
  background: white;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
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

const ModalClose = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 30px;
  border: 1px solid #cce5ff;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  width: 150px;
`;

const Button = styled.button`
  margin-top: 5px;
  border: 1px solid #fdef72;
  background-color: #fdef72;
  color: lightslategrey;
  border-radius: 8px;
  height: 25px;
`;
const Message = styled.p`
  font-size: 12px;
  width: 175px;
  margin: 0;
  font-weight: 600;
  color: lightslategrey;
`;
const PopUp = styled.span`
  display: inline-block;
  font-size: 11px;
  border: 1px solid #fdef72;
  color: gray;
  width: 13px;
  height: 13px;
  border-radius: 20px;
  margin-right: 2px;
`;

const KakaoIdExplanationContainer = styled.div`
  &:hover {
    transition: all 0.2s;
    transform: scale(1.1);
  }
`;

const KakaoIdExplanation = styled.span`
  color: darkmagenta;
  font-size: 14px;
`;
const KakaoIdExplanationLine = styled.div`
  width: 80px;
  border-top: 1px solid darkmagenta;
`;

const KakaoIdDelete = styled.span`
  cursor: pointer;
  border: 1px solid silver;
  padding: 3px;
  font-size: 12px;
  color: white;
  background-color: silver;
  border-radius: 5px;
`;

const BillingKakaoModal = ({ setKakaoModalOpen, meetingName }) => {
  const ref = useRef();
  const { meetingId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    kakao_deposit_id: meetingName.kakao_deposit_information.kakao_deposit_id,
  });

  const handlePutBankData = async (e, action) => {
    e.preventDefault();
    try {
      if (action === "이번에만 사용하기") {
        const responsePostData = await PatchBillingMeetingKakaoDeposit(
          meetingId,
          formData
        );
        if (responsePostData.status === 200) {
          alert("입금정보가 수정 되었습니다!");
          setKakaoModalOpen(false);
        }
      } else if (action === "계속해서 사용하기") {
        await PatchBillingUserKaKaoDeposit(formData);
        const responsePostData = await PatchBillingMeetingKakaoDeposit(
          meetingId,
          formData
        );
        if (responsePostData.status === 200) {
          alert("입금정보가 수정 되었습니다!");
          setKakaoModalOpen(false);
        }
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: null,
      }));
    } else {
      const lastSlashIndex = value.split("/");
      const extractedString = lastSlashIndex[lastSlashIndex.length - 1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: extractedString,
      }));
    }
  };
  const handleIdDelete = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      kakao_deposit_id: null,
    }));
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useOnClickOutside(ref, () => {
    setKakaoModalOpen(false);
  });

  return (
    <BillingResultContainer>
      <WrapperModal>
        <Modal ref={ref}>
          <ModalClose onClick={() => setKakaoModalOpen(false)}>X</ModalClose>
          {/* <Message>
            <PopUp>?</PopUp>텍스트로 공유할떄 하단에 계좌번호도 같이 공유 돼요!
          </Message> */}
          <Message>
            <PopUp>?</PopUp>링크로 공유할때 해당 아이디로 카카오 송금하기 기능이
            추가 돼요!
          </Message>
          <Form onSubmit={handlePutBankData}>
            <InputBox>
              <Input
                type="text"
                name="kakao_deposit_id"
                value={formData.kakao_deposit_id || ""}
                placeholder="카카오 링크를 입력해주세요"
                onChange={handleInputChange}
                autoComplete="off"
                onTouchStart={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
              />
            </InputBox>
            <KakaoIdDelete onClick={handleIdDelete}>
              입금 정보 비우기
            </KakaoIdDelete>
            <KakaoIdExplanationContainer onClick={handleModalOpen}>
              <KakaoIdExplanation>카카오 링크란?</KakaoIdExplanation>
              <KakaoIdExplanationLine></KakaoIdExplanationLine>
            </KakaoIdExplanationContainer>
            {modalOpen && <KakaoIdExplain setModalOpen={setModalOpen} />}
            <Button
              type="submit"
              onClick={(e) => handlePutBankData(e, "이번에만 사용하기")}
            >
              이번에만 사용하기
            </Button>
            <Button
              type="submit"
              onClick={(e) => handlePutBankData(e, "계속해서 사용하기")}
            >
              계속해서 사용하기
            </Button>
          </Form>
        </Modal>
      </WrapperModal>
    </BillingResultContainer>
  );
};

export default BillingKakaoModal;
