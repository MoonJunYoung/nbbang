import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getBillingData, GetMeetingNameData } from "../api/api";
import { truncate } from "./Meeting";
import BillingTossModal from "./BillingModal/BillingTossModal";
import BillingKakaoModal from "./BillingModal/BillingKakaoModal";
import BillingResultShare from "./BillingResultShare";
import KakaoShare from "./KakaoShare";

const ResultContainar = styled.div`
  display: ${(props) => (props.paymentState ? "block" : "none")};
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
const BillingContainer = styled(PaymentsContainar)`
  font-weight: bold;
`;

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
`;

const BillingLine = styled.div`
  border-top: 1px solid silver;
  width: 175px;
  margin-top: 10px;
  @media (max-width: 768px) {
    width: 88px;
  }
`;

const BillingTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

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
  background: #fdef72;
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

const Billing = ({ payment }) => {
  const { meetingId } = useParams();
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [meetingName, setMeetingName] = useState([]);
  const [paymentState, setPaymentState] = useState(false);
  const [kakaoModalOpen, setKakaoModalOpen] = useState(false);
  const [tossModalOpen, setTossModalOpen] = useState(false);

  useEffect(() => {
    if (!kakaoModalOpen && !tossModalOpen) {
      const handleGetData = async () => {
        try {
          const response = await GetMeetingNameData(meetingId);
          setMeetingName(response.data);
        } catch (error) {
          console.log("Api 데이터 불러오기 실패");
        }
      };
      handleGetData();
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
        const responseGetData = await getBillingData(meetingId);
        setMembers(responseGetData.data.members);
        setPayments(responseGetData.data.payments);
      } catch (error) {
        console.log("Api 데이터 불러오기 실패");
      }
    };
    handleGetData();
  }, [meetingId, payment, meetingName]);

  const negativeBillingEntries = Object.entries(members).filter(
    ([key, value]) => value.amount < 0 && value.leader === false
  );

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
                8
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

      <RemittanceContainer>
        <KakaoModalContainer onClick={handleKakaoModal}>
          <img alt="kakao" src="/images/kakao.png" />
          <KakaoModalbutton>카카오 입급 아이디</KakaoModalbutton>
          {meetingName.kakao_id === null ? (
            <KakaoRegistration>등록하기</KakaoRegistration>
          ) : (
            <KakaoId>{meetingName.kakao_id}</KakaoId>
          )}
        </KakaoModalContainer>
        <TossModalContainer onClick={handleTossModal}>
          <img alt="kakao" src="/images/Toss.png" />
          <TossModalbutton>토스 입금 계좌</TossModalbutton>
          {meetingName.bank === null ? (
            <TossRegistration>등록하기</TossRegistration>
          ) : (
            <TossBankContainer>
              <TossBank>{meetingName.bank}</TossBank>
              <TossBank>{meetingName.account_number}</TossBank>
            </TossBankContainer>
          )}
        </TossModalContainer>
      </RemittanceContainer>
      {kakaoModalOpen && (
        <BillingKakaoModal setKakaoModalOpen={setKakaoModalOpen} />
      )}
      {tossModalOpen && (
        <BillingTossModal setTossModalOpen={setTossModalOpen} />
      )}

      <BillingResultShare meetingName={meetingName} />
      <KakaoShare meetingName={meetingName} />
    </ResultContainar>
  );
};

export default Billing;
