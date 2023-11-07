import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { GetMeetingNameData, PutMeetingNameData } from "../api/api";
import BillingInputBox from "./BillingInputBox";

const BillngNameContainer = styled.div`
  height: 200px;
`;

const MeetingName = styled.p``;

const MeetingDate = styled.p``;

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

const BillingNameTopLine = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 15px 0;
`;

const BillingNameLine = styled.div`
  border-top: 1px solid silver;
  width: 167px;
  margin-top: 10px;
  @media (max-width: 768px) {
    width: 75px;
  }
`;

const BillingNameTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

const BillingName = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const [meetingName, setMeetingName] = useState([])
  const initialDate = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    name: "",
    date: initialDate,
  });
  const { meetingId } = useParams();
  const dateParts = formData.date.split("-");
  const selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  const [notAllow, setNotAllow] = useState(true);

  const handleGetData = async () => {
    try {
      const responseGetData = await GetMeetingNameData(meetingId);
      setMeetingName(responseGetData.data);
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

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
      const response = await PutMeetingNameData(meetingId, formData);
      if (response.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          name: "",
        }));
        handleGetData();
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

  return (
    <>
      <MeetingName>{meetingName.name}</MeetingName>
      <MeetingDate>{meetingName.date}</MeetingDate>
      <BillingNameTopLine>
        <BillingNameLine></BillingNameLine>
        <BillingNameTopLineComent>어떤 모임인가요?</BillingNameTopLineComent>
        <BillingNameLine></BillingNameLine>
      </BillingNameTopLine>
      <BillngNameContainer>
        <FormContainer onSubmit={handlePutData}>
          <BillingInputBox
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="모임명수정"
            maxLength="22"
          />
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
          <BillingPixButton type="submit" disabled={notAllow}>
            수정하기
          </BillingPixButton>
        </FormContainer>
      </BillngNameContainer>
    </>
  );
};

export default BillingName;
