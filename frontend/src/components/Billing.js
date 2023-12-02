import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetMeetingNameData, getMemberData } from "../api/api";
import BillingTossModal from "./Modal/BillingTossModal";
import BillingKakaoModal from "./Modal/BillingKakaoModal";
import BillingResultShare from "./BillingResultShare";
import KakaoShare from "./KakaoShare";

const ResultContainar = styled.div`
  display: ${(props) => (props.paymentState ? "flex" : "none")};
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: relative;
  animation: fadeOut 500ms;
  @keyframes fadeOut {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
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
  font-size: 15px;
  margin: 7px 0px;
  color: #938282;
  font-weight: 700;
`;

const Leader = styled(Member)`
  font-weight: 700;
`;

const Amount = styled(Member)``;

const LeaderBillingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LeaderAmount = styled(Member)``;

const LeaderBilling = styled.div`
  display: flex;
  flex-direction: column;
`;

const BillingHistory = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0px;
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
  top: -7px;
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

const RemittanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    width: 45px;
    left: 5px;
  }
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
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
    width: 60px;
    top: 5px;
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

const BillingLeader = styled.div`
`;

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
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Billing = ({ payment }) => {
  const { meetingId } = useParams();
  const [meetingName, setMeetingName] = useState([]);
  const [members, setMembers] = useState([]);
  const [paymentState, setPaymentState] = useState(false);
  const [kakaoModalOpen, setKakaoModalOpen] = useState(false);
  const [tossModalOpen, setTossModalOpen] = useState(false);
  const [leaderId, setLeaderId] = useState(null);

  useEffect(() => {
    if (!kakaoModalOpen && !tossModalOpen) {
      const handleMeetingGetData = async () => {
        try {
          const response = await GetMeetingNameData(meetingId);
          setMeetingName(response.data);
        } catch (error) {
          console.log("Api 데이터 불러오기 실패");
        }
      };
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
  }, [meetingId, payment, meetingName]);

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
      <BillingTopLine>
        <BillingTopLineComent>정산 결과를 확인해 볼까요?</BillingTopLineComent>
      </BillingTopLine>
      <BillingLine>
        <BillingContainer>
          {members.map((data) => (
            <BillingHistory key={data.id}>
              {data.leader ? (
                <>
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
                </>
              ) : (
                <>
                  <Logo alt="BillingLogo" src="/images/nbbang_Logo.png" />
                  <Billings>
                    <Member>{data.name}</Member>
                    <Amount>
                      {data.amount >= 0
                        ? `총무에게 보내야 할 돈 : ${data.amount
                            .toLocaleString({
                              style: "currency",
                              currency: "USD",
                            })
                            .toString()} 원`
                        : `총무에게 받아야 할 돈 : ${Math.abs(data.amount)
                            .toLocaleString({
                              style: "currency",
                              currency: "USD",
                            })
                            .toString()} 원`}
                    </Amount>
                  </Billings>
                </>
              )}
            </BillingHistory>
          ))}
        </BillingContainer>
      </BillingLine>

      <RemittanceContainer>
        <KakaoModalContainer onClick={handleKakaoModal}>
          <img alt="kakao" src="/images/kakao.png" />
          <KakaoModalbutton>카카오 입금 아이디</KakaoModalbutton>
          {meetingName &&
          meetingName.deposit &&
          meetingName.deposit.kakao_deposit_id !== null ? (
            <KakaoId>{meetingName.deposit.kakao_deposit_id}</KakaoId>
          ) : (
            <KakaoRegistration>등록하기</KakaoRegistration>
          )}
        </KakaoModalContainer>
        <TossModalContainer onClick={handleTossModal}>
          <img alt="kakao" src="/images/Toss.png" />
          <TossModalbutton>토스 입금 계좌</TossModalbutton>
          {meetingName &&
          meetingName.deposit &&
          meetingName.deposit.bank !== null ? (
            <TossBankContainer>
              <TossBank>{meetingName.deposit.bank}</TossBank>
              <TossBank>{meetingName.deposit.account_number}</TossBank>
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
      <KakaoShare meetingName={meetingName} />
      <BillingResultShare meetingName={meetingName} />
    </ResultContainar>
  );
};

export default Billing;
