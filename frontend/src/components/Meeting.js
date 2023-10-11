import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../api/api';

const MeetingContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2 ,1fr);
  }
`;

const MeetingAddButton = styled.button`
`;

const Billing = styled.div`
  border: 1px solid;
  height: 170px;
  border-radius: 15px;
`;

const BillingDate = styled.p`
  font-size: 13px;
`;

const BillingName = styled.p`
  font-size: 14px;
`;

const BillingDeleteButton = styled.button`
  cursor: pointer;
`;

const UserId = styled.p`
  font-size: 16px;
`;


const Meeting = ({ user }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const responseGetData = await axiosInstance.get("meeting")
      setMeetings(responseGetData.data)
    } catch(error) {
      console.log("Api 데이터 불러오기 실패");
    }
  }

  const handleAddBilling = async () => {
    try {
      const response = await axiosInstance.post(`http://15.164.99.251/api/meeting`);
      if (response.status === 201) {
        fetchData();
      }
    } catch (error) {
      console.log("Api 데이터 보내기 실패");
    }
  };

  const handelDeleteBilling = async (MeetingId) => {
    try {
      await axiosInstance.delete(`http://15.164.99.251/api/meeting/${MeetingId}`);
      setMeetings(meetings.filter(data => data.id !== MeetingId));
    } catch (error) {
      console.log("Api 데이터 삭제 실패");
    }
  };

  return (
    <>
      <UserId>{user.identifier}님의 정산 내역입니다.</UserId>
      <MeetingAddButton onClick={handleAddBilling}>결제 내역 추가하기</MeetingAddButton>
      <MeetingContainer> 
        {meetings.map(data => 
          <Billing 
            key={data.id}
          >
            <BillingDeleteButton onClick={() => handelDeleteBilling(data.id)}>X</BillingDeleteButton>
            <BillingDate>{data.date}</BillingDate>
            <BillingName>
              {data.name}
            </BillingName>
            {/* <BillingOpenButton onClick={()=>handelClick(data)}>모임내용추가하기</BillingOpenButton> */}
          </Billing>
        )}
      </MeetingContainer>
    </>
  );
};

export default Meeting;
