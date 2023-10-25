import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { GetMeetingNameData, PutMeetingNameData } from '../api/api';
import BillingInputBox from './BillingInputBox';

const BillngNameContainer = styled.div`
  height: 200px;
`;

const MeetingName = styled.p`

`

const MeetingDate = styled.p`

`

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

const BillingPixButton = styled.button`
  width: 200px;
  height: 30px;
  border: 1px solid #CCE5FF;
  border-radius: 10px;
`;

const StyledDatePickerBox = styled.div`
  width: 100px;
  border-radius: 10px;
  border: 1px solid #CCE5FF;
  background-color: white;
`

const StyledDatePicker = styled(DatePicker)`
  width: 70px;
  background-color: white;
  border: none;
`;

const BillingName = () => {  
  const currentDate = new Date(); 
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; 
  const day = currentDate.getDate();
  const { meetingId } = useParams();
  const [meetingName, setMeetingName] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    date: `${year}-${month}-${day}` 
  });

  const [notAllow, setNotAllow] = useState(true)

  const handleGetData = async () => {
    try {
      const responseGetData = await GetMeetingNameData(meetingId);
      setMeetingName(responseGetData.data)
    } catch (error) {
      console.log('Api 데이터 불러오기 실패');
    }
  };

  useEffect(() => {
    handleGetData()
  }, [])


  
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
      if(response.status === 200){
        setFormData(prevData => ({
          ...prevData,
          name: '',
        }));
        handleGetData()
      };
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  useEffect(() => {
    if (formData.name.length > 0) {
      setNotAllow(false);
      return
    }
    setNotAllow(true)
  }, [formData.name])


  return (
    <>
      <MeetingName>{meetingName.name}</MeetingName>
      <MeetingDate>{meetingName.date}</MeetingDate>
      <BillngNameContainer>
        <FormContainer onSubmit={handlePutData}>
          <BillingInputBox 
            type='text'
            name='name'
            value={formData.name} 
            onChange={handleInputChange}
            placeholder='모임명수정'
            maxlength="22"
          />
          <StyledDatePickerBox>
            <StyledDatePicker
              selected={new Date(formData.date)}
              onChange={date => setFormData({ ...formData, date: date.toISOString().split('T')[0] })}
              readOnly
            />
          </StyledDatePickerBox>
          <BillingPixButton type='submit' disabled={notAllow}>수정하기</BillingPixButton>
        </FormContainer>
      </BillngNameContainer>
    </>
  );
};

export default BillingName;