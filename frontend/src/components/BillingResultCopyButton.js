import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBillingResult } from '../api/api';

const ButtonBox = styled.div`
  display: ${props => props.paymentState ? 'flex' : 'none'};
  height: 150px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
  height: 30px;
  border: 1px solid skyblue;
  background-color: lightskyblue;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    border: 3px solid skyblue;
    transition: all 0.2s;
    transform: scale(1.15);
    font-weight: 600;
    background-color: lightskyblue;
  }
`;

const BillingResultCopyButton = ({ payment }) => {
  const { meetingId } = useParams();
  const [paymentState, setPaymentState] = useState(false);
  const [billingResult, setBillingResult] = useState(''); 

  useEffect(() => {
    if (payment.length > 0) {
      setPaymentState(true);
    } else {
      setPaymentState(false);
    }
  }, [payment]);

  const getApiData = async () => {
    try {
      const response = await getBillingResult(meetingId);
      if (response.status === 200) {
        const result = response.data;
        setBillingResult(result);
      }
    } catch (error) {
      console.log('Api 데이터 불러오기 실패');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '정산 결과',
          text: '정산 결과를 확인하세요.',
          url: billingResult, 
        });
      } else {
        console.log('Web Share API를 지원하지 않는 브라우저입니다.');
      }
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };

  return (
    <ButtonBox paymentState={paymentState}>
      <Button onClick={() => {
        getApiData(); 
        handleShare(); 
      }}>
        정산결과 공유하기
      </Button>
    </ButtonBox>
  );
};

export default BillingResultCopyButton;
