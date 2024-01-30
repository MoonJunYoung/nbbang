import styled from "styled-components";
import React, { useRef, useState } from "react";
import UsersBankData from "../UsersBankData";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useParams } from "react-router-dom";
import {
  PatchBillingMeetingTossDeposit,
  PatchBillingUserTossDeposit,
} from "../../api/api";

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
  border: 1px solid #1849fd;
  background-color: #1849fd;
  color: white;
  border-radius: 8px;
  height: 25px;
`;
const Message = styled.p`
  font-size: 12px;
  width: 176px;
  margin: 0;
  font-weight: 600;
  color: lightslategrey;
`;
const PopUp = styled.span`
  display: inline-block;
  font-size: 11px;
  border: 1px solid deepskyblue;
  color: deepskyblue;
  width: 13px;
  height: 13px;
  border-radius: 20px;
  margin-right: 2px;
`;

const TossIdDelete = styled.span`
  cursor: pointer;
  border: 1px solid silver;
  padding: 3px;
  font-size: 12px;
  color: white;
  background-color: silver;
  border-radius: 5px;
`;

const BillingTossModal = ({ setTossModalOpen, meetingName }) => {
  const ref = useRef();
  const { meetingId } = useParams();
  const [formData, setFormData] = useState({
    account_number: meetingName.toss_deposit_information.account_number,
    bank: meetingName.toss_deposit_information.bank,
  });


  const handlePutBankData = async (e, action) => {
    e.preventDefault();
    try {
      if (action === "이번에만 사용하기") {
        const responsePostData = await PatchBillingMeetingTossDeposit(
          meetingId,
          formData
        );
        if (responsePostData.status === 200) {
          alert("입금정보가 수정 되었습니다!");
          setTossModalOpen(false);
        }
      } else if (action === "계속해서 사용하기") {
        await PatchBillingMeetingTossDeposit(meetingId, formData);
        const responsePostData = await PatchBillingUserTossDeposit(formData);
        if (responsePostData.status === 200) {
          alert("입금정보가 수정 되었습니다!");
          setTossModalOpen(false);
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleBankSelect = (e) => {
    if (e.target.value === "은행선택")
      setFormData((prevFormData) => ({
        ...prevFormData,
        bank: null,
      }));
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bank: e.target.value,
      }));
    }
  };

  const handleIdDelete = () => {
    setFormData({
      account_number: null,
      bank: null,
    });
  };

  useOnClickOutside(ref, () => {
    setTossModalOpen(false);
  });

  return (
    <BillingResultContainer>
      <WrapperModal>
        <Modal ref={ref}>
          <ModalClose onClick={() => setTossModalOpen(false)}>X</ModalClose>
          <Message>
            <PopUp>?</PopUp>링크로 공유할때 해당 계좌로 토스 송금하기 기능이
            추가 돼요!
          </Message>
          <Form onSubmit={handlePutBankData}>
            <InputBox>
              <Input
                type="number"
                name="account_number"
                value={formData.account_number || ""}
                placeholder="계좌번호를 입력해주세요"
                onChange={handleInputChange}
                maxLength="20"
                autoComplete="off"
                onTouchStart={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
              />
            </InputBox>
            <select
              value={formData.bank || UsersBankData[0].bank}
              onChange={handleBankSelect}
              style={{
                width: "90px",
                height: "20px",
                border: "1px solid silver",
              }}
            >
              {UsersBankData.map((bankData, index) => (
                <option key={index} value={bankData.bank}>
                  {bankData.bank}
                </option>
              ))}
            </select>
            <TossIdDelete onClick={handleIdDelete}>
              입금 정보 비우기
            </TossIdDelete>
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

export default BillingTossModal;
