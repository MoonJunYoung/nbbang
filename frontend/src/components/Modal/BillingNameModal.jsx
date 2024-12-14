import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { PutMeetingNameData } from "../../api/api";
import TostPopUp from "../TostPopUp";

const BillingNameModalContainer = styled.div`
  z-index: 10;
  position: absolute;
  width: 100%;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  min-height: 180px;
  width: 85%;
  max-width: 280px;
  background: white;
  border-radius: 20px;
  transition: all 300ms ease-in-out;
  animation: fadeIn 300ms;
  padding: 18px;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
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
  font-size: 25px;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  padding: 8px;
  color: #666;
  transition: color 0.2s;
  
  &:hover {
    color: #333;
  }
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const BillingPixButton = styled.button`
  width: 100%;
  max-width: 200px;
  height: 40px;
  background: ${props => props.disabled ? '#E8F0FE' : '#3182F6'};
  color: ${props => props.disabled ? '#A8B6C7' : 'white'};
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #1B64DA;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const StyledDatePickerBox = styled.div`
  width: 100%;
  max-width: 200px;
  border-radius: 12px;
  border: 1px solid #E5E8EB;
  background-color: white;
  padding: 8px 0px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #3182F6;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  background-color: white;
  border: none;
  font-size: 15px;
  color: #191F28;
  
  &:focus {
    outline: none;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 200px;
  height: 40px;
  border: 1px solid #E5E8EB;
  border-radius: 12px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #3182F6;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 0 12px;
  font-size: 15px;
  color: #191F28;

  &::placeholder {
    color: #A8B6C7;
  }

  &:focus {
    outline: none;
  }
`;

const BillingName = ({ setOpenMenuModal, MainMeetingId, MainMeetingName }) => {
  const initialDate = new Date();
  const [tostPopUp, setTostPopUp] = useState(false);
  const [formData, setFormData] = useState({
    name: MainMeetingName,
    date: initialDate,
  });

  const { meetingId } = useParams();
  const [notAllow, setNotAllow] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePutData = async (e) => {
    e.preventDefault();
    try {
      if (MainMeetingId || meetingId) {
        const response = await PutMeetingNameData(
          MainMeetingId ? MainMeetingId : meetingId,
          formData
        );
        if (response.status === 200) {
          setFormData((prevData) => ({
            ...prevData,
            name: "",
          }));
          setOpenMenuModal(false);
          setTostPopUp(true);
        }
      }
    } catch (error) {
      alert("모임명 수정에 실패했습니다");
      console.log("Api 데이터 수정 실패", error);
    }
  };

  useEffect(() => {
    setNotAllow(formData.name.length === 0);
  }, [formData.name]);

  return (
    <BillingNameModalContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={() => setOpenMenuModal(false)}>×</ModalClose>
          <FormContainer onSubmit={handlePutData}>
            <InputBox>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="모임명을 입력해주세요"
                maxLength="22"
                autoComplete="off"
              />
            </InputBox>
            <StyledDatePickerBox>
              <StyledDatePicker
                selected={formData.date}
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    date,
                  })
                }
              />
            </StyledDatePickerBox>
            <BillingPixButton disabled={notAllow}>
              모임명 등록하기
            </BillingPixButton>
          </FormContainer>
        </Modal>
      </WrapperModal>
      {tostPopUp && <TostPopUp message="모임명이 수정 되었습니다!" setTostPopUp={setTostPopUp} />}
    </BillingNameModalContainer>
  );
};

export default BillingName;
