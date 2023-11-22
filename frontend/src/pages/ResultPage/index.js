import { useLocation } from "react-router-dom";
import { getBillingResultPage } from "../../api/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../components/Meeting";
import styled from "styled-components";
import Nav from "../../components/Nav";

const ResultContaner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MeetingContaner = styled.div``;

const MeetingName = styled.h1`
  font-size: 22px;
  color: #938282;
`;

const MeetingDate = styled.h2`
  font-size: 18px;
  color: #938282;
  margin-bottom: 40px;
`;

const PaymentList = styled.div`
  overflow: hidden;
  display: flex;
  width: 90%;
  align-items: center;
  border: 1px solid #e6e6e666;
  justify-content: space-around;
  box-shadow: 0px 2px 3px #c3a99759;
  margin: 5px 0px;
  border-radius: 10px;
`;

const PaymentHistory = styled.span`
  color: gray;
  font-weight: 800;
`;

const Payment = styled.div`
  margin-left: 5px;
  padding: 4px 0;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;

const BillingMemberTopLine = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: absolute;
  top: 0px;
  z-index: 3;
  background-color: white;
`;

const BillingPaymentLine = styled.div`
  border: 1px solid silver;
  overflow: hidden;
  border-radius: 30px;
  margin-top: 10px;
  width: 95%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BillingMemberTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

const BillingPaymentTopLine = styled(BillingMemberTopLine)``;

const BillingPaymentTopLineComent = styled(BillingMemberTopLineComent)``;

const PaymentContainers = styled.div`
  margin: 5px 0px;
`;

const PaymentMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  justify-content: end;
  margin: 5px 0px 0px 5px;
  gap: 12px;
  div {
    background-color: #c7c7c7;
    color: gray;
    font-weight: 600;
    width: 63px;
    overflow: hidden;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 17%);
    box-shadow: 0px 2px 3px #c3a99759;

    border: 1px solid silver;
    @media (max-width: 390px) {
      width: 78px;
    }
    @media (max-width: 320px) {
      width: 63px;
    }
  }

  span {
    font-size: 13px;
    color: white;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: 390px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const PaymentLine = styled(BillingPaymentLine)`
  padding: 12px 0px;
`;

const PaymentDeleteContainer = styled.div``;

const BillingContainer = styled.div`
  width: 100%;
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
  margin: 7px 0px;
  color: #938282;
  font-weight: 700;
`;

const Leader = styled(Member)`
  font-weight: 700;
`;

const Amount = styled(Member)``;

const LeaderBillingContainer = styled.div``;

const LeaderAmount = styled(Member)``;

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
  align-items: flex-start;
`;
const LeaderBillingMoney = styled.span`
  font-size: 13px;
  color: #697178;
`;

const BillingTopLine = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: absolute;
  top: 215px;
  left: 123px;
  z-index: 3;
  background-color: white;
`;

const BillingLine = styled.div`
  border: 1px solid silver;
  overflow: hidden;
  border-radius: 30px;
  width: 95%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BillingTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

const BillingLeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BillingLeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 55px;
  height: 45px;
  padding: 17px;
`;

const Billings = styled.div`
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const MemberContainer = styled.div``;

const TossPayContaner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  border-radius: 15px;
  height: 30px;
  border: 1px solid #1849fd;
  background-color: #1849fd;
  margin-bottom: 10px;
  @media (max-width: 360px) {
    width: 120px;
  }

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
  width: 150px;
  border-radius: 15px;
  height: 30px;
  background-color: #ffeb3c;
  margin-bottom: 10px;
  @media (max-width: 360px) {
    width: 120px;
  }

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

const BillingMemberContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 670px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 100px;
  }
`;

function SharePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const meeting = searchParams.get("meeting");
  const navigate = useNavigate();
  const [apiRequestFailed, setApiRequestFailed] = useState(false);
  const [billingRequestFailed, setBillingRequestFailed] = useState(false);
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
        if (responseGetData.status === 200) {
          setMembers(responseGetData.data.members);
          setPayments(responseGetData.data.payments);
          setMeetings(responseGetData.data.meeting);
        } else if (responseGetData.status === 204) {
          setBillingRequestFailed(true);
          console.log("데이터 값이 없습니다");
        }
      } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 404) {
          setApiRequestFailed(true);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          console.log("API 데이터 불러오기 실패");
        }
      }
    };

    handleGetData();
  }, [meeting]);

  if (apiRequestFailed) {
    return (
      <div>
        <MeetingName>
          삭제된 정산내역입니다. <br></br> Nbbang페이지로 3초 뒤에 넘어갑니다.
        </MeetingName>
      </div>
    );
  }

  if (billingRequestFailed) {
    return (
      <div>
        <Nav />
        <MeetingName>
          정산 내역이 없습니다. <br></br> 정산내역을 추가해주세요!
        </MeetingName>
      </div>
    );
  }

  return (
    <ResultContaner>
      <Nav />
      <MeetingContaner>
        <MeetingName>{meetings.name}의 정산결과 입니다!</MeetingName>
        <MeetingDate>{meetings.date}</MeetingDate>
      </MeetingContaner>
      <BillingTopLine>
        <BillingTopLineComent>최종 정산 결과입니다!</BillingTopLineComent>
      </BillingTopLine>
      <BillingLine>
        {payments.map((paymentdata) => (
          <PaymentList key={paymentdata.id}>
            <PaymentContainers>
              <Payment onClick={() => handleClick(paymentdata)}>
                <PaymentHistory>
                  {truncate(paymentdata.place, 10)}
                </PaymentHistory>
                <PaymentHistory>결제자 {paymentdata.pay_member}</PaymentHistory>
              </Payment>
              <Payment onClick={() => handleClick(paymentdata)}>
                <PaymentHistory>
                  {truncate(
                    paymentdata.price.toLocaleString().toString() + "원",
                    12
                  )}
                </PaymentHistory>
                <PaymentHistory>
                  인당 {paymentdata.split_price.toLocaleString()}원
                </PaymentHistory>
              </Payment>
              {/* </PaymentResultContainer> */}
              <PaymentMembers>
                {paymentdata.attend_member.map((attendMemberdata, index) => (
                  <div key={index}>
                    <span>{truncate(attendMemberdata, 4)}</span>
                  </div>
                ))}
              </PaymentMembers>
            </PaymentContainers>
          </PaymentList>
        ))}

        <BillingContainer>
          {members.map((data) => (
            <BillingHistory key={data.id}>
              {data.leader ? (
                <BillingLeaderContainer>
                  <Logo alt="BillingLogo" src="/images/nbbang_Logo.png" />
                  <BillingLeader>
                    <LeaderContainer>
                      <Member>총무 {data.name}</Member>
                      <LeaderAmount>
                        {data.amount > 0
                          ? `보내야 할 돈 : ${data.amount
                              .toLocaleString()
                              .toString()} 원`
                          : `받을 돈 : ${Math.abs(data.amount)
                              .toLocaleString({
                                style: "currency",
                                currency: "USD",
                              })
                              .toString()} 원`}
                      </LeaderAmount>
                    </LeaderContainer>
                    <LeaderBillingContainer>
                      {members.map((value) =>
                        value.amount < 0 && value.leader === false ? (
                          <LeaderBilling key={value.id}>
                            <LeaderBillingMoney>{`${
                              value.name
                            }님 한테 ${Math.abs(value.amount)
                              .toLocaleString({
                                style: "currency",
                                currency: "USD",
                              })
                              .toString()}원을 보내주세요`}</LeaderBillingMoney>
                          </LeaderBilling>
                        ) : null
                      )}
                    </LeaderBillingContainer>
                  </BillingLeader>
                </BillingLeaderContainer>
              ) : (
                <>
                  <Logo alt="BillingLogo" src="/images/nbbang_Logo.png" />
                  <BillingMemberContainer>
                    <Billings>
                      <Member>{data.name}</Member>
                      <Amount>
                        {data.amount > 0
                          ? `총무에게 받을 돈 : ${data.amount
                              .toLocaleString({
                                style: "currency",
                                currency: "USD",
                              })
                              .toString()} 원`
                          : `총무에게 보내야 할 돈 : ${Math.abs(data.amount)
                              .toLocaleString({
                                style: "currency",
                                currency: "USD",
                              })
                              .toString()} 원`}
                      </Amount>
                    </Billings>
                    <MemberContainer>
                      {isMobile ? (
                        <Remittance>
                          {data.amount > 0 &&
                          data.toss_deposit_link !== null ? (
                            <TossPayContaner>
                              <a href={data.toss_deposit_link}>
                                <img alt="Toss" src="/images/Toss.png" />
                                <span>송금하기</span>
                              </a>
                            </TossPayContaner>
                          ) : (
                            ""
                          )}
                          {data.amount > 0 &&
                          data.kakao_deposit_link !== null ? (
                            <KakaoContaner>
                              <a href={data.kakao_deposit_link}>
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
                    </MemberContainer>
                  </BillingMemberContainer>
                </>
              )}
            </BillingHistory>
          ))}
        </BillingContainer>
      </BillingLine>
    </ResultContaner>
  );
}
export default SharePage;
