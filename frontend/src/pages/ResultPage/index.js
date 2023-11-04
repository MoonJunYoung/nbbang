import { useLocation } from "react-router-dom";
import { getBillingResultPage } from "../../api/api";
import React, { useEffect, useState } from "react";
import { truncate } from "../../components/Meeting";
import styled from "styled-components";

const ResultContaner = styled.div``;

const MeetingContaner = styled.div``;

const MeetingName = styled.h1`
  font-size: 22px;
  color: steelblue;
`;

const MeetingDate = styled.h2`
  font-size: 18px;
  color: steelblue;
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
      left: -8px;
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
      left: -8px;
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
      left: -8px;
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

const TossPayContanerNull = styled.div`
  width: 65px;
  height: 20px;
`

const TossPayContaner = styled.div`
  width: 80px;
  height: 20px;
  color: paleturquoise;
  background-color: white;
  border-radius: 12px;
  border: 1px solid;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  a {
    font-size: 16px;
    text-decoration: none;
    color: blue;
  }
  span {
    color: blue;
    font-weight: 700;
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 31px;
    height: 31px;
    border: 1px solid;
    a {
      font-size: 12px;
      text-decoration: none;
    }
  }
`;

function SharePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const meeting = searchParams.get("meeting");

  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const responseGetData = await getBillingResultPage(meeting);
        setMembers(responseGetData.data.members);
        setPayments(responseGetData.data.payments);
        setMeetings(responseGetData.data.meeting);
      } catch (error) {
        console.log("Api 데이터 불러오기 실패");
      }
    };
    handleGetData();
  }, [meeting]);

  const negativeBillingEntries = Object.entries(members).filter(
    ([key, value]) => value.amount < 0 && value.leader === false
  );

  return (
    <ResultContaner>
      <MeetingContaner>
        <MeetingName>{meetings.name}의 정산결과 입니다!</MeetingName>
        <MeetingDate>{meetings.date}</MeetingDate>
      </MeetingContaner>
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
                {members[key].amount > 0 ? (
                  <TossPayContaner>
                    <a href={members[key].toss_send_link}>
                      <span>toss</span>송금
                    </a>
                  </TossPayContaner>
                ) : (
                  <TossPayContanerNull>
                  </TossPayContanerNull>
                )}
              </>
            )}
          </BillingHistory>
        ))}
      </BillingContainer>
    </ResultContaner>
  );
}

export default SharePage;
