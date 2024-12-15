import { useLocation } from "react-router-dom";
import { getBillingResultPage } from "../../api/api";
import React, { useEffect, useState } from "react";
import { truncate } from "../../components/Meeting";
import styled, { css } from "styled-components";
import SlideCheckbox from "../../components/SlideCheckBox";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/money.json";
import animationData2 from '../../assets/animations/start.json';
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LodingPage";

const ResultContaner = styled.div`
  font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const MeetingContaner = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  margin-top: 20px;
`;

const MeetingName = styled.h1`
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

const MeetingDate = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: black;
  text-align: center;
`;

const PaymentList = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #f1e8e8bc; 
  padding: 5px 20px;
  margin-bottom: 15px;
`;

const LottieContainer = styled.div`
  width: 40px;
  height: 40px;
`;

const  StartAnimation = styled.div`
  width: 120px;
  height: 120px;
`;

const PaymentHistory = styled.span`
  font-size: 14px;
  font-weight: ${props => props.paymentdata ? 'bold' : 'normal'};
  padding: 6px 12px;
  border-radius: 8px;
`;


const Payment = styled.div`
  margin-left: 5px;
  padding: 4px 0;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
`;


const PaymentContainers = styled.div`
  margin: 6px 0px;
`;

const PaymentMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  justify-content: end;
  margin: 8px 0px 0px 5px;
  gap: 12px;
  div {
    color: #191F28;
    width: 65px;
    overflow: hidden;
    border: 1px solid #dcd5d5ca;
    border-radius: 22px;
    padding: 8px 4px;
    text-align: center;
    @media (max-width: 390px) {
      width: 80px;
    }
    @media (max-width: 320px) {
      width: 65px;
    }
  }

  span {
    font-size: 14px;
    color: #191F28;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  @media (max-width: 390px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const BillingContainer = styled.div`
  padding: 20px 0px;
  width: 100%;
`;



const Member = styled.p`
  white-space: nowrap;
  font-size: 16px;
  margin: 8px 0px;
  color: #0044FE;
  font-weight: 800;
`;

const Amount = styled(Member)`
  color: black;
  font-weight: 500;
  font-size: 15px;
`;

const LeaderBillingContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 12px;
`;

const LeaderAmount = styled(Member)`
  color: black;
  font-weight: 500;
  font-size: 14px;
`;

const LeaderBilling = styled.div`
  display: flex;
  flex-direction: column;

`;

const BillingHistory = styled.div`
    background-color: #ffffff;
    border-bottom: 1px solid #f1e8e8bc;
    margin-bottom: 15px;
    padding: 0px 35px;
`;

const LeaderBillingMoney = styled.span`
  font-size: 14px;
  color: #4E5968;
  font-weight: 500;
  line-height: 1.5;
`;

const BillingLine = styled.div`
  border: none;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BillingLeader = styled.div``;

const LeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;


const Billings = styled.div`
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Remittance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 18px;
`;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DepositCopyContaner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  span{
    font-size: 13px;
    color: #191F28;
    font-weight: 700;
  }
  img{
    width: 20px;
    height: 20px;
  }
`;

const TossPayContaner = styled.div`
  a {
    font-size: 13px;
    text-decoration: none;
  }
  img {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    padding: 3px;
    background-color: #0050ff;
  }
  span {
    margin-left: 4px;
    color: white;
    font-weight: 700;
  }
`;

const KakaoContaner = styled.div`
  a {
    font-size: 13px;
    text-decoration: none;
  }
  img {
    height: 20px;
    padding: 7px;
    border-radius: 100%;
    background-color: #FEE500;
  }
  span {
    color: #191F28;
    font-weight: 700;
  }
`;

const BillingMemberContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const StyledCheckboxLabel = styled.div`
  margin: 12px 2px;
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;
    font-size: 14px;
    color: #191F28;
    font-weight: 600;
  }
`;


const ToastMessage = styled.div`
  opacity: 0;
  position: fixed;
  bottom: -100px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 16px 40px;
  background: rgba(25, 31, 40, 0.95);
  border-radius: 16px;
  color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.5s;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      bottom: 60px;
    `}
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  height: 10px;
  width: 100%;
  background-color: #e8e8e8b0;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RemittanceTitle = styled.span`
  font-size: 14px;
  color: #191F28;
  font-weight: 700;
  margin: 0px 25px 0px 0px;
`;

const RemittanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;


const NbbangButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  position: relative;
  gap: 10px;
  font-weight: 600;
  font-size: 17px;
  height: 50px;
  a {
    position: relative;
    z-index: 10;
    color: gray;
    font-size: 17px;
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
  const [loading, setLoading] = useState(true); 
  const [active, setActive] = useState(false);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isApple = /iPhone|iPad|iPod/i.test(navigator.userAgent);

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
      } finally {
        setLoading(false); 
      }
    };

    handleGetData();
  }, [meeting]);

  if (loading) {
    return <LoadingPage />; 
  }

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
        <MeetingName>
          정산 내역이 없습니다. <br></br> 정산내역을 추가해주세요!
        </MeetingName>
      </div>
    );
  }

  const handleCheckboxChange = (memberId) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, tipCheck: !member.tipCheck }
          : member
      )
    );
  };


  const showToast = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1500);
  };

  const DepositInformationCopy = async (deposit_copy_text) => {
    await navigator.clipboard.writeText(deposit_copy_text);
    if (isApple) {
      showToast();
    }
  };


  return (
    <ResultContaner>
      <MeetingContaner>
        <TitleContainer>
          <LottieContainer>
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </LottieContainer> 
          <MeetingName>{meetings.name}의 정산결과</MeetingName>
        </TitleContainer>
        <MeetingDate>{meetings?.date?.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일') || ''}</MeetingDate>
      </MeetingContaner>
      <BillingLine>
        {payments.map((paymentdata) => (
          <PaymentList key={paymentdata.id}>
            <PaymentContainers>
              <Payment onClick={() => handleClick(paymentdata)}>
                <PaymentHistory paymentdata={paymentdata}>
                  {truncate(paymentdata.place, 10)}
                </PaymentHistory>
                <PaymentHistory paymentdata={paymentdata}>결제자 {paymentdata.pay_member}</PaymentHistory>
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
        <Line />
        <BillingContainer>
          {members.map((data) => (
            <BillingHistory key={data.id}>
              {data.leader ? (
                <>
                  <BillingLeader>
                    <LeaderContainer>
                      <Member>총무 {data.name}</Member>
                      <LeaderAmount>
                        {data.amount > 0
                          ? `보내야 할 돈 : ${data.amount
                              .toLocaleString()
                              .toString()} 원`
                          : `받아야 할 돈 : ${Math.abs(data.amount)
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
                </>
              ) : (
                <>
                  <BillingMemberContainer>
                    <Billings>
                      <Member>{data.name}</Member>
                      {data.amount >= 0 ? (
                        <Amount>
                          {data.tipCheck
                            ? `총무에게 보내야 할 돈 : ${data.tipped_amount
                                .toLocaleString({
                                  style: "currency",
                                  currency: "USD",
                                })
                                .toString()} 원`
                            : `총무에게 보내야 할 돈 : ${data.amount
                                .toLocaleString({
                                  style: "currency",
                                  currency: "USD",
                                })
                                .toString()} 원`}
                        </Amount>
                      ) : (
                        <Amount>
                          {`총무에게 받야 할 돈 : ${Math.abs(data.amount)
                            .toLocaleString({
                              style: "currency",
                              currency: "USD",
                            })
                            .toString()} 원`}
                        </Amount>
                      )}
                      {isMobile && data.amount >= 0 && (
                        <StyledCheckboxLabel>
                          <SlideCheckbox
                            type="checkbox"
                            checked={data.tipCheck}
                            onChange={() => handleCheckboxChange(data.id)}
                          />
                          <span>십원단위 올림해서 보내기</span>
                        </StyledCheckboxLabel>
                      )}
                    </Billings>
                    <MemberContainer>
                      {isMobile ? (
                        <>
                          {data.amount > 0 && (
                            <Remittance>
                              {(data.kakao_deposit_link || data.toss_deposit_link) && (
                                <RemittanceTitle>송금</RemittanceTitle>
                              )}
                              <RemittanceContainer>
                                {data.kakao_deposit_link && (
                                  <KakaoContaner>
                                    <a href={data.kakao_deposit_link}>
                                      <img alt="kakao" src="/images/kakao 2.png" />
                                    </a>
                                  </KakaoContaner>
                                )}
                                {data.toss_deposit_link && (
                                  <TossPayContaner>
                                    <a href={data.toss_deposit_link}>
                                      <img alt="Toss" src="/images/result_toss.png" />
                                    </a>
                                  </TossPayContaner>
                                )}
                              </RemittanceContainer>
                              {data.deposit_copy_text && (
                                <DepositCopyContaner
                                  onClick={() => DepositInformationCopy(data.deposit_copy_text)}
                                >
                                  <span>계좌&금액</span>
                                  <img src="/images/copy.png" alt="copy" />
                                </DepositCopyContaner>
                              )}
                            </Remittance>
                          )}
                        </>
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
      <NbbangButton>
        <Link
          to="/signd"
        >
         복잡한 정산, 원클릭으로 해결하러가기
        </Link>
        <StartAnimation> 
          <Lottie
            animationData={animationData2}
            loop={true}
            autoplay={true}
          />
        </StartAnimation>
      </NbbangButton>
      <ToastMessage active={active}>클립보드에 복사되었어요.</ToastMessage>
    </ResultContaner>
  );
}
export default SharePage;

