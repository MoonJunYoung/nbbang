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
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  width: 550px;
  height: 100px;
  border: 1px solid #cce5ff;
  height: 100%;
  border-radius: 10px;
  @media (max-width: 768px) {
    position: relative;
    width: 97%;
    height: 100%;
  }
  @media (max-width: 900px) {
    position: relative;
    width: 97%;
    height: 100%;
  }
`;
const Place = styled.span`
  display: block;
  padding: 2px;
  text-align: center;
  width: 80px;
  background-color: lightseagreen;
  border: none;
  color: white;
  margin-top: 5px;
`;

const Price = styled.span`
  position: relative;
  font-size: 14px;
  &::before {
    content: "|";
    color: dodgerblue;
    position: absolute;
    left: -9px;
  }
  @media (max-width: 768px) {
    &::before {
      content: "";
    }
  }
`;

const PayMember = styled(Price)`
  &::before {
    content: "|";
    color: dodgerblue;
    position: absolute;
    left: -9px;
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
    left: -9px;
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
    left: -9px;
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

const BillingHistory = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  width: 550px;
  height: 100px;
  border: 1px solid #cce5ff;
  border-radius: 10px;
  color: white;
  background-color: cornflowerblue;
  border: 3px solid skyblue;
  height: 60px;
  @media (max-width: 768px) {
    position: relative;
    width: 97%;
    height: 100%;
  }
`;
const LeaderBillingMoney = styled.span`
  font-size: 14px;
`;

// const TossPayContanerNull = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const TossPayContaner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  border-radius: 15px;
  height: 30px;
  border: 1px solid #1849fd;
  background-color: #1849fd;
  margin-bottom: 10px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100px;
    height: 31px;
    text-decoration: none;
  }
  img {
    width: 50px;
    height: 24px;
  }
  span {
    margin-left: 3px;
    color: white;
    font-weight: 700;
  }
`;
const KakaoContaner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  border-radius: 15px;
  height: 30px;
  background-color: #ffeb3c;
  margin-bottom: 10px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100px;
    height: 31px;
    text-decoration: none;
  }
  img {
    width: 40px;
    height: 20px;
  }
  span {
    color: black;
    font-weight: 700;
  }
`;

const MembersContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const MemberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 45px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;
  }
`;

const Remittance = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 80%;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    gap: 15px;
    align-items: center;
    width: 80%;
  }
`;

const PaymentsMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  font-size: 12px;
  margin: 9px;
`;

const PaymentMember = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  border-radius: 11px;
  height: 25px;
  background: cornflowerblue;
  color: white;
`;

const Payment = styled.div`
  display: flex;
  gap: 13px;
  margin-top: 15px;
  @media (max-width: 768px) {
    display: flex;
    gap: 13px;
  }
`;

const PlaceList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
            <PlaceList>
              <Place>{truncate(payments[key].place, 10)}</Place>
              <Payment>
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
                    payments[key].split_price.toLocaleString().toString() +
                      "원",
                    12
                  )}
                </SplitPrice>
              </Payment>
            </PlaceList>
            <PaymentsMembers>
              {payments[key].attend_members.map((data, index) => (
                <PaymentMember key={index}>{data}</PaymentMember>
              ))}
            </PaymentsMembers>
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
              <MembersContainer>
                <MemberContainer>
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
                </MemberContainer>
                {isMobile ? (
                  <Remittance>
                    {members[key].amount > 0 &&
                    members[key].toss_send_link !== "" ? (
                      <TossPayContaner>
                        <a href={members[key].toss_send_link}>
                          <img alt="Toss" src="/images/Toss.png" />
                          <span>송금하기</span>
                        </a>
                      </TossPayContaner>
                    ) : (
                      ""
                    )}
                    {members[key].amount > 0 &&
                    members[key].kakao_send_link !== "" ? (
                      <KakaoContaner>
                        <a href={members[key].kakao_send_link}>
                          <img alt="kakao" src="/images/kakaoPay.png" />
                          <span>송금하기</span>
                        </a>
                      </KakaoContaner>
                    ) : (
                      ""
                    )}
                  </Remittance>
                ) : (
                  ""
                )}
              </MembersContainer>
            )}
          </BillingHistory>
        ))}
      </BillingContainer>
    </ResultContaner>
  );
}

export default SharePage;
