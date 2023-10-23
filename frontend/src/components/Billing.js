import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBillingData } from '../api/api'
import { truncate } from './Meeting'


const ResultContainar = styled.div`
  margin-top: 20px;
  visibility: 'visible';
  height: 100%;
`

const PaymentsContainar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const BillingContainer = styled(PaymentsContainar)`
  margin-top: 25px;
`

const PaymentsHistory = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  width: 550px; 
  height: 60px;
  border: 1px solid #CCE5FF;
  border-radius: 10px;
  @media (max-width: 768px) {
    position: relative;
    width: 395px;   
    height: 80px;
  }
`
const Place = styled.span`
  padding: 5px;
  font-size: 14px;
  background-color: lightseagreen;
  border: none;
  color: white;
  margin: 0 10px;
  @media (max-width: 768px) {
    position: absolute;
    top: 8px;
  }
`

const Price = styled.span`
  position: relative;
  font-size: 14px;
  &::before {
    content: '|';
    color: dodgerblue;
    position: absolute;
    left: -13px;
  }
  @media (max-width: 768px) {
    margin-top: 25px;
  }
`
const PayMember = styled(Price)``
const AttendMemberCount = styled(Price)``
const SplitPrice = styled(Price)``

const BillingHistory = styled(PaymentsHistory)`
  color: white;
  background-color: cornflowerblue;
  border: 3px solid skyblue;
  @media (max-width: 768px) {
    position: relative;
    width: 395px;   
    height: 100%;
  }
`

const Member = styled.p`
  font-size: 15px;
`

const Leader = styled(Member)`
  font-weight: 700;
`

const Amount = styled(Member)`
`

const LeaderBillingContainer = styled.div`
  
`

const LeaderAmount = styled(Member)`
   @media (max-width: 768px) {
    width: 130px;
  }
`

const LeaderBilling = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 150px;
    margin: 3px 0;
  }
`

const LeaderBillingMoney = styled.span`
  font-size: 14px;
`

const Billing = ( { payment } ) => {
  const { meetingId } = useParams();
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const responseGetData = await getBillingData(meetingId)
        setMembers(responseGetData.data.members);
        setPayments(responseGetData.data.payments);
      }catch(error) {
        console.log('Api 데이터 불러오기 실패')
      }
    }
    handleGetData();
  }, [meetingId, payment])



  const negativeBillingEntries = Object.entries(members).filter(([key, value]) => value.amount < 0 && value.leader === false);

  
  
  return (
    <ResultContainar>
      <PaymentsContainar>
        {Object.keys(payments).map((key) => (
          <PaymentsHistory key={key}>
            <Place>{truncate(payments[key].place,10)}</Place>
            <Price>{truncate(payments[key].price.toLocaleString().toString()+"원",12)}</Price>
            <PayMember>결제자 {payments[key].pay_member}</PayMember>
            <AttendMemberCount>총 {payments[key].attend_member_count}명</AttendMemberCount>
            <SplitPrice>나눠서 낼 돈 {truncate(payments[key].split_price.toLocaleString().toString()+"원",12)}</SplitPrice>
          </PaymentsHistory>
        ))}
      </PaymentsContainar>
      <BillingContainer>
        {Object.keys(members).map((key) => (
          <BillingHistory key={key}>
            {members[key].leader ? (
              <>
                <Leader>총무</Leader>
                <Member>{members[key].name}</Member>
                <LeaderAmount>      
                  {members[key].amount > 0
                    ? `보내야 할 돈 : ${members[key].amount.toLocaleString().toString()} 원`
                    : `받을 돈 : ${Math.abs(members[key].amount).toLocaleString({
                      style: 'currency',
                      currency: 'USD',
                    }).toString()} 원`}
                </LeaderAmount>
                <LeaderBillingContainer>
                  {negativeBillingEntries.map((([key, value]) =>(
                    <LeaderBilling key={key}>
                      <LeaderBillingMoney>{`${value.name}님 한테 ${Math.abs(value.amount).toLocaleString({
                        style: 'currency',
                        currency: 'USD',
                      }).toString()}원을 보내주세요`}</LeaderBillingMoney>
                  </LeaderBilling>
                )))}
                </LeaderBillingContainer>
              </>
            ) : (
              <>
                <Member>{members[key].name}</Member>
                <Amount>      
                  {members[key].amount > 0
                    ? `총무에게 보내야 할 돈 : ${members[key].amount.toLocaleString().toString()} 원`
                    : `총무에게 받을 돈 : ${Math.abs(members[key].amount).toLocaleString({
                      style: 'currency',
                      currency: 'USD',
                    }).toString()} 원`}
                </Amount>
              </>
            )}
          </BillingHistory>
        ))}
    </BillingContainer>

    </ResultContainar>
  )
}



export default Billing