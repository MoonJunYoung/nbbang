import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { axiosData } from '../api/api';
import BillingInputBox from './BillingInputBox';

const BillngNameContainer = styled.div`
  height: 200px;
`;

const BillingPixButton = styled.button`

`;

const StyledDatePicker = styled(DatePicker)`
`;

const BillingName = () => {  
  const currentDate = new Date(); 
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; 
  const day = currentDate.getDate();
  const axiosInstance = axiosData()
  const { meetingId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    date: `${year}-${month}-${day}` 
  });

  const [notAllow, setNotAllow] = useState(true)

  
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
      const response = await axiosInstance.put(`meeting/${meetingId}`, formData);
      if(response.status === 200){
        setFormData({ name: '' });
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
    <BillngNameContainer>
      <form onSubmit={handlePutData}>
        <BillingInputBox 
          type='text'
          name='name'
          value={formData.name} 
          onChange={handleInputChange}
          placeholder='모임명수정'
        />
        <StyledDatePicker selected={new Date()} onChange={date => setFormData({ ...formData, date: date.toISOString().split('T')[0] })} />
        <BillingPixButton type='submit' disabled={notAllow}>수정하기</BillingPixButton>
      </form>
    </BillngNameContainer>
  );
};

export default BillingName;