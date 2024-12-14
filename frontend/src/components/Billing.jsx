import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetMeetingNameData, getMemberData } from "../api/api";
import BillingTossModal from "./Modal/BillingTossModal";
import BillingKakaoModal from "./Modal/BillingKakaoModal";
import BillingResultShare from "./BillingResultShare";
import KakaoShare from "./KakaoShare";
import Lottie from "lottie-react";
import animationData from '../assets/animations/check.json';

const ResultContainar = styled.div`
  display: ${(props) => (props.paymentState ? "flex" : "none")};
  margin-top: 24px;
  padding: 0 20px;
  flex-direction: column;
  height: 100%;
  position: relative;
  max-width: 680px;
  margin: 24px auto;
`;

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
  font-size: 17px;
  margin: 0;
  color: black;
  font-weight: 600;
`;

const Leader = styled(Member)`
  font-weight: 700;
`;

const Amount = styled.p`
  color: #272626ab;
  font-size: 16px;
  margin: 8px 0 0 0;
  font-weight: 500;
  position: relative;
`;

const LeaderBillingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LeaderAmount = styled(Amount)`
  color: #272626ab;
  font-weight: 500;
  font-size: 16px;
  margin-top: 12px;
`;

const LeaderBilling = styled.div`
  display: flex;
  flex-direction: column;
`;

const BillingHistory = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 14px 0;
  padding: 22px;
  background: white;
  border-bottom: 1px solid #e8f0fe; 
`;

const LeaderBillingMoney = styled.span`
  font-size: 15px;
  color: #3c4043;
  margin-top: 8px;
  display: block;
`;

const BillingTopLine = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: absolute;
  top: -7px;
  z-index: 3;
  background-color: white;
`;

const BillingLine = styled.div`
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  width: 90%;
  padding: 30px 15px;
  background: #ffffff;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BillingTopLineComent = styled.h2`
    text-align: left;
    font-size: 22px;
    font-weight: 800;
    color: #191F28;
    margin-bottom: 8px;
    padding-left: 10px;
`;

const RemittanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const KakaoModalContainer = styled.div`
  margin-top: 30px;
  position: relative;
  width: 230px;
  height: 63px;
  background: #ffeb3c;
  border: 1px solid papayawhip;
  border-radius: 10px;
  img {
    position: absolute;
    width: 25px;
    top: 8px;
    left: 20px;
  }
`;

const KakaoModalbutton = styled.button`
  font-size: 15px;
  width: 230px;
  height: 37px;
  background: #ffeb3c;
  border: 1px solid #ffeb3c;
  color: black;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const KakaoId = styled.p`
  margin: 0;
  font-size: 14px;
`;
const TossModalContainer = styled(KakaoModalContainer)`
  background: #1849fd;
  border: 1px solid #1849fd;
  img {
    position: absolute;
    width: 45px;
    top: 8px;
    left: 20px;
  }
`;

const TossModalbutton = styled(KakaoModalbutton)`
  background: #1849fd;
  border: none;
  color: white;
  font-weight: 800;
`;

const TossBankContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const TossBank = styled.span`
  font-size: 14px;
  color: white;
`;

const TossRegistration = styled.span`
  color: white;
  font-weight: 700;
`;
const KakaoRegistration = styled.span`
  font-weight: 700;
`;



const BaseModalContainer = styled.div`
  position: relative;
  padding: 24px 28px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;


const RegisterText = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: ${props => props.isKakao ? '#191919' : 'white'};
  padding: 8px 0 0 32px;
`;

const BillingLeader = styled.div``;

const BillingLeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeaderContainer = styled.div`
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Logo = styled.img`
  width: 55px;
  height: 45px;
  padding: 17px;
`;

const Billings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LottieContainer = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  margin-top: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0 8px;
`;

const ShareContainer = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Billing = ({ payment, meetingName, setMeetingName }) => {
  const { meetingId } = useParams();
  // const [meetingName, setMeetingName] = useState([]);
  const [members, setMembers] = useState([]);
  const [paymentState, setPaymentState] = useState(false);
  const [kakaoModalOpen, setKakaoModalOpen] = useState(false);
  const [tossModalOpen, setTossModalOpen] = useState(false);

  const handleMeetingGetData = async () => {
    try {
      const response = await GetMeetingNameData(meetingId);
      setMeetingName(response.data);
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  };

  useEffect(() => {
    if (!kakaoModalOpen && !tossModalOpen) {
      handleMeetingGetData();
    }
  }, [kakaoModalOpen, tossModalOpen]);

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
        const responseGetData = await getMemberData(meetingId);
        setMembers(responseGetData.data);
      } catch (error) {
        console.log("Api 데이터 불러오기 실패");
      }
    };
    handleGetData();
  }, [meetingId, payment]);

  const handleKakaoModal = () => {
    setKakaoModalOpen(true);
  };

  const handleTossModal = () => {
    setTossModalOpen(true);
  };

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <ResultContainar paymentState={paymentState}>
      <TitleContainer>
        <BillingTopLineComent>정산 결과를 확인해 볼까요?</BillingTopLineComent>
        <LottieContainer>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            />
        </LottieContainer>
      </TitleContainer>
        <BillingContainer>
          {members.map((data) => (
            <BillingHistory key={data.id}>
              {data.leader ? (
                <LeaderBillingContainer>
                  <Member>총무 {data.name}</Member>
                  <LeaderAmount>
                    {data.amount > 0
                      ? `보내야 할 돈: ${data.amount.toLocaleString()}원`
                      : `받을 돈: ${Math.abs(data.amount).toLocaleString()}원`}
                  </LeaderAmount>
                  {members.map((value) =>
                    value.amount < 0 && value.leader === false ? (
                      <LeaderBillingMoney key={value.id}>
                        {`${value.name}님 한테 ${Math.abs(value.amount).toLocaleString()}원을 보내주세요`}
                      </LeaderBillingMoney>
                    ) : null
                  )}
                </LeaderBillingContainer>
              ) : (
                <Billings>
                  <Member>{data.name}</Member>
                  <Amount>
                    {data.amount >= 0
                      ? `총무에게 보내야 할 돈: ${data.amount.toLocaleString()}원`
                      : `총무에게 받아야 할 돈: ${Math.abs(data.amount).toLocaleString()}원`}
                  </Amount>
                </Billings>
              )}
            </BillingHistory>
          ))}
        </BillingContainer>
        <RemittanceContainer>
          <KakaoModalContainer onClick={handleKakaoModal}>
            <img alt="kakao" src="/images/kakao.png" />
            <KakaoModalbutton>카카오 입금 아이디</KakaoModalbutton>
            {meetingName &&
            meetingName.kakao_deposit_information &&
            meetingName.kakao_deposit_information.kakao_deposit_id !== null ? (
              <KakaoId>{meetingName.kakao_deposit_information.kakao_deposit_id}</KakaoId>
            ) : (
              <KakaoRegistration>등록하기</KakaoRegistration>
            )}
          </KakaoModalContainer>
          <TossModalContainer onClick={handleTossModal}>
            <img alt="kakao" src="/images/Toss.png" />
            <TossModalbutton>토스 입금 계좌</TossModalbutton>
            {meetingName &&
            meetingName.toss_deposit_information &&
            meetingName.toss_deposit_information.bank !== null ? (
              <TossBankContainer>
                <TossBank>{meetingName.toss_deposit_information.bank}</TossBank>
                <TossBank>{meetingName.toss_deposit_information.account_number}</TossBank>
              </TossBankContainer>
            ) : (
              <TossRegistration>등록하기</TossRegistration>
            )}
          </TossModalContainer>
      </RemittanceContainer>
      {kakaoModalOpen && (
        <BillingKakaoModal
          setKakaoModalOpen={setKakaoModalOpen}
          meetingName={meetingName}
        />
      )}
      {tossModalOpen && (
        <BillingTossModal
          setTossModalOpen={setTossModalOpen}
          meetingName={meetingName}
        />
      )}
      <ShareContainer>
        <KakaoShare meetingName={meetingName} />
        <BillingResultShare meetingName={meetingName} />
      </ShareContainer>
    </ResultContainar>
  );
};

export default Billing;
