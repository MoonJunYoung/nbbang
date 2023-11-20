import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import UsersBankData from "../UsersBankData";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useParams } from "react-router-dom";
import {
  putBillingTossBank,
  putBillingFixTossBank,
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
  border: 1px solid lightskyblue;
  background-color: lightskyblue;
  color: white;
  border-radius: 8px;
  width: 115px;
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

const BillingTossModal = ({ setTossModalOpen }) => {
  const [notAllow, setNotAllow] = useState(true);
  const ref = useRef();
  const { meetingId } = useParams();
  const [formData, setFormData] = useState({
    account_number: "",
    bank: "",
  });


  const handlePutBankData = async (e, action) => {
    e.preventDefault();
    if (!formData.bank) {
      formData.bank = UsersBankData[0].bank;
    }

    try {
      if (action === "이번에만 사용하기") {
        const responsePostData = await putBillingTossBank(meetingId, formData);
        if (responsePostData.status === 200) {
          alert("계좌번호가 추가 되었습니다!");
          setModalOpen(false);
        }
      } else if (action === "계속해서 사용하기") {
        const responsePostData = await putBillingFixTossBank(formData);
        await putBillingTossBank(meetingId, formData);
        if (responsePostData.status === 200) {
          alert("계좌번호가 추가 되었습니다!");
          setModalOpen(false);
        }
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBankSelect = (e) => {
    setFormData({
      ...formData,
      bank: e.target.value,
    });
  };

  useEffect(() => {
    if (formData.account_number.length > 0) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [formData.account_number]);

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
                value={formData.account_number}
                placeholder="계좌번호를 입력해주세요"
                onChange={handleInputChange}
                maxlength="20"
                autoComplete="off"
                onTouchStart={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
              />
            </InputBox>
            <select
              value={formData.bank}
              onChange={handleBankSelect}
              style={{
                width: "90px",
                height: "20px",
                borderRadius: "15px",
                border: "1px solid skyblue",
              }}
            >
              {UsersBankData.map((bankData, index) => (
                <option key={index} value={bankData.bank}>
                  {bankData.bank}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              onClick={(e) => handlePutBankData(e, "이번에만 사용하기")}
              disabled={notAllow}
            >
              이번에만 사용하기
            </Button>
            <Button
              type="submit"
              onClick={(e) => handlePutBankData(e, "계속해서 사용하기")}
              disabled={notAllow}
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


