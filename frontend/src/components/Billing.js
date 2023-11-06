import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getBillingData } from "../api/api";
import { truncate } from "./Meeting";
import BillingResult from './BillingModal/BillingResult'

const ResultContainar = styled.div`
 display: ${props => props.paymentState ? 'block' : 'none'};
  margin-top: 20px;
  visibility: "visible";
  height: 100%;
`;

const PaymentsContainar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BillingContainer = styled(PaymentsContainar)``;

const PaymentsHistory = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  width: 550px;
  height: 60px;
  border: 1px solid #cce5ff;
  border-radius: 10px;
  @media (max-width: 768px) {
    position: relative;
    width: 97%;
    height: 80px;
  }
`;
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
`;

const Price = styled.span`
  position: relative;
  font-size: 14px;
  &::before {
    content: "|";
    color: dodgerblue;
    position: absolute;
    left: -13px;
  }
  @media (max-width: 768px) {
    &::before {
      content: "";
    }
    margin-top: 25px;
  }
`;

const PayMember = styled(Price)`
  &::before {
    content: "|";
    color: dodgerblue;
    position: absolute;
    left: -13px;
  }
  @media (max-width: 768px) {
    &::before {
      content: "|";
      color: dodgerblue;
      position: absolute;
      left: -7px;
    }
  }
`;

const AttendMemberCount = styled(Price)`
  &::before {
    content: "|";
    color: dodgerblue;
    position: absolute;
    left: -13px;
  }
  @media (max-width: 768px) {
    &::before {
      content: "|";
      color: dodgerblue;
      position: absolute;
      left: -7px;
    }
  }
`;

const SplitPrice = styled(Price)`
  &::before {
    content: "|";
    color: dodgerblue;
    position: absolute;
    left: -13px;
  }
  @media (max-width: 768px) {
    &::before {
      content: "|";
      color: dodgerblue;
      position: absolute;
      left: -7px;
    }
  }
`;

const Member = styled.p`
  font-size: 15px;
`;

const Leader = styled(Member)`
  font-weight: 700;
`;

const Amount = styled(Member)``;

const LeaderBillingContainer = styled.div``;

const LeaderAmount = styled(Member)`
  @media (max-width: 768px) {
    width: 38%;
  }
`;

const LeaderBilling = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 150px;
    margin: 3px 0;
  }
`;

const BillingHistory = styled(PaymentsHistory)`
  color: white;
  background-color: cornflowerblue;
  border: 3px solid skyblue;
  @media (max-width: 768px) {
    position: relative;
    width: 97%;
    height: 100%;
  }
`;
const LeaderBillingMoney = styled.span`
  font-size: 14px;
`;

const BillingTopLine = styled.div`
  display: flex;
  justify-content: center;
`

const BillingLine = styled.div`
  border-top: 1px solid silver;
  width: 175px;
  margin-top: 10px;
  @media (max-width: 768px) {
    width: 88px;
  }
`


const BillingTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`

const ShareButton = styled.button`
  width: 200px;
  height: 30px;
  border: 1px solid skyblue;
  background-color: lightskyblue;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  margin: 50px 0;
  &:hover {
    border: 3px solid skyblue;
    transition: all 0.2s;
    transform: scale(1.15);
    font-weight: 600;
    background-color: lightskyblue;
  }
`;

const RemittanceModalContaner = styled.div`

  img {

  }
`

const RemittanceModalbutton = styled.button`
`

const RemittanceId = styled.p`
`


const Billing = ({ payment }) => {
  const { meetingId } = useParams();
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paymentState, setPaymentState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (payment.length > 0) {
      setPaymentState(true);
    } else {
      setPaymentState(false);
    }
  }, [payment]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const responseGetData = await getBillingData(meetingId);
        setMembers(responseGetData.data.members);
        setPayments(responseGetData.data.payments);
      } catch (error) {
        console.log("Api 데이터 불러오기 실패");
      }
    };
    handleGetData();
  }, [meetingId, payment]);

  const negativeBillingEntries = Object.entries(members).filter(
    ([key, value]) => value.amount < 0 && value.leader === false
  );

  const handleModal = () => {
    setModalOpen(true)
  }


  return (
    <ResultContainar paymentState={paymentState}>
      <BillingTopLine>
        <BillingLine></BillingLine>
        <BillingTopLineComent>정산 결과를 확인해 볼까요?</BillingTopLineComent>
        <BillingLine></BillingLine>
      </BillingTopLine>
      <PaymentsContainar>
        {Object.keys(payments).map((key) => (
          <PaymentsHistory key={key}>
            <Place>{truncate(payments[key].place, 10)}</Place>
            <Price>
              {truncate(
                payments[key].price.toLocaleString().toString() + "원",
                12
              )}
            </Price>
            <PayMember>결제자 {payments[key].pay_member}</PayMember>
            <AttendMemberCount>
              총 {payments[key].attend_members_count}명
            </AttendMemberCount>
            <SplitPrice>
              나눠서 낼 돈{" "}
              {truncate(
                payments[key].split_price.toLocaleString().toString() + "원",
                12
              )}
            </SplitPrice>
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
                    ? `보내야 할 돈 : ${members[key].amount
                        .toLocaleString()
                        .toString()} 원`
                    : `받을 돈 : ${Math.abs(members[key].amount)
                        .toLocaleString({
                          style: "currency",
                          currency: "USD",
                        })
                        .toString()} 원`}
                </LeaderAmount>
                <LeaderBillingContainer>
                  {negativeBillingEntries.map(([key, value]) => (
                    <LeaderBilling key={key}>
                      <LeaderBillingMoney>{`${value.name}님 한테 ${Math.abs(
                        value.amount
                      )
                        .toLocaleString({
                          style: "currency",
                          currency: "USD",
                        })
                        .toString()}원을 보내주세요`}</LeaderBillingMoney>
                    </LeaderBilling>
                  ))}
                </LeaderBillingContainer>
              </>
            ) : (
              <>
                <Member>{members[key].name}</Member>
                <Amount>
                  {members[key].amount > 0
                    ? `총무에게 보내야 할 돈 : ${members[key].amount
                        .toLocaleString()
                        .toString()} 원`
                    : `총무에게 받을 돈 : ${Math.abs(members[key].amount)
                        .toLocaleString({
                          style: "currency",
                          currency: "USD",
                        })
                        .toString()} 원`}
                </Amount>
              </>
            )}
          </BillingHistory>
        ))}
      </BillingContainer>
      <RemittanceModalContaner>
        <img alt="kakao" src="/images/kakao.png" />
        <RemittanceModalbutton>카카오 입급아이디</RemittanceModalbutton>
        <RemittanceId>등록</RemittanceId>
      </RemittanceModalContaner>
      <RemittanceModalContaner>
        <img alt="kakao" src="/images/TossLogo.png" />
        <RemittanceModalbutton> 입급아이디</RemittanceModalbutton>
        <RemittanceId>등록</RemittanceId>
      </RemittanceModalContaner>


      <ShareButton onClick={handleModal}>정산 결과 공유하기</ShareButton>
      {modalOpen && (
        <BillingResult 
        setModalOpen={setModalOpen}
        />
      )}
    </ResultContainar>
  );
};

export default Billing;
