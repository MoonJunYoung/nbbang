import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { PutMeetingNameData } from "../../api/api";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const BillingNameModalContainer = styled.div`
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

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const BillingPixButton = styled.button`
  width: 200px;
  height: 30px;
  border: 1px solid #cce5ff;
  border-radius: 10px;
`;

const StyledDatePickerBox = styled.div`
  width: 100px;
  border-radius: 10px;
  border: 1px solid #cce5ff;
  background-color: white;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 70px;
  background-color: white;
  border: none;
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

const BillingName = ({ setOpenModal, MainMeetingId }) => {
  const ref = useRef();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const initialDate = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    name: "",
    date: initialDate,
  });
  const { meetingId } = useParams();
  const dateParts = formData.date.split("-");
  const selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

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
          setOpenModal(false);
          handleGetData();
        }
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  useEffect(() => {
    if (formData.name.length > 0) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [formData.name]);

  useOnClickOutside(ref, () => {
    setOpenModal(false);
  });

  const handleInputClick = (e) => {
    e.preventDefault();
  };

  return (
    <BillingNameModalContainer>
      <WrapperModal>
        <Modal ref={ref}>
          <ModalClose onClick={() => setOpenModal(false)}>X</ModalClose>
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
                onClick={handleInputClick}
              />
            </InputBox>
            <StyledDatePickerBox>
              <StyledDatePicker
                selected={selectedDate}
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    date: date.toISOString().split("T")[0],
                  })
                }
                inputMode="none"
              />
            </StyledDatePickerBox>
            <BillingPixButton
              type="submit"
              disabled={notAllow}
              onClick={handlePutData}
            >
              모임명 등록하기
            </BillingPixButton>
          </FormContainer>
        </Modal>
      </WrapperModal>
    </BillingNameModalContainer>
  );
};

export default BillingName;
