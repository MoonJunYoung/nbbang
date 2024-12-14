import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPaymentData, postPaymentData, deletePaymentData } from "../api/api";
import BillingInputBox from "./BillingInputBox";
import PaymentFix from "./Modal/PaymentFixModal";
import { truncate } from "./Meeting";
import Lottie from "lottie-react";
import animationData from '../assets/animations/card.json';
import { motion } from "framer-motion";
import TostPopUp from "./TostPopUp";

const BillingPaymentContainer = styled.section`
  padding: 0 16px;
  margin-top: 30px;
  flex-direction: column;
  display: ${(props) => (props.member ? "flex" : "none")};
  height: 100%;
  position: relative;
  animation: fadeOut 500ms;
  @keyframes fadeOut {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1; 
      transform: scale(1);
    }
  }
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const BillingAddPayment = styled.button`
  width: calc(100% - 32px);
  max-width: 760px;
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 16px 0;
  transition: background-color 0.2s;
  border: none;
  background-color: #3182F6;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #1B64DA;
  }

  &:disabled {
    background-color: #F2F4F6;
    color: #AEB5BC;
  }
`;

const PaymentList = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 400px;
  margin: 12px auto;
  padding: 28px 24px;
  background: white;
  border-radius: 16px;
  border: 1px solid #E5E8EB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    border-color: #3182F6;
    box-shadow: 0 4px 12px rgba(49, 130, 246, 0.1);
    transform: translateY(-2px);
  }
`;

const PaymentContainers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;



const Payment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isRight ? 'flex-end' : 'flex-start'};
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.2s;
  flex: 1;
  &:hover {
    background: rgba(49, 130, 246, 0.04);
  }
`;

const PaymentPlace = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #191F28;
  margin-bottom: 4px;
`;

const PaymentPayer = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #4E5968;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '결제자';
    font-size: 13px;
    color: #8B95A1;
  }
`;

const PaymentPrice = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: black;
  text-align: right;
`;

const PaymentSplitPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: black;
  opacity: 0.8;
  text-align: right;

  &::before {
    content: '인당 ';
    font-size: 13px;
    color: #8B95A1;
  }
`;

const PaymentMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 4px;
  width: 100%;

  div {
    background: rgba(49, 130, 246, 0.06);
    border-radius: 10px;
    padding: 8px 14px;
    transition: all 0.2s;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: #3182F6;
  }
`;

const PaymentDelete = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 8px;
  border: none;
  background: #F2F4F6;
  color: #8B95A1;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FF3B30;
    color: white;
    transform: rotate(90deg);
  }
`;

const PaymentHistory = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #191F28;
  text-align: center;

  &:nth-child(2) {
    color: #3182F6;
    font-size: 13px;
  }
`;

const AttendBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Attend = styled.span`
  font-size: 14px;
  color: #8B95A1;
`;

const StyledCheckboxDiv = styled.div`
  display: grid;
  grid-template-columns : repeat(5, minmax(80px, 1fr));
  gap: 8px;
  width: 100%;
  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

const StyledCheckboxLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  span {
    font-size: 14px;
    font-weight: 600;
    color: white;
    z-index: 1;
  }

  input[type="checkbox"] {
    position: absolute;
    width: 100%;
    height: 100%;
    appearance: none;
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;

    &:not(:checked) {
      background: #F2F4F6;
      border: 1px solid #E5E8EB;

      & + span {
        color: #4E5968;
      }
    }

    &:checked {
      background: #3182F6;
      border: none;
    }
  }
`;

const BillingMemberTopLine = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #F2F4F6;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BillingPaymentLine = styled.div`
  width: 100%;
`;


const Title = styled.h2`
  text-align: left;
  font-size: 22px;
  font-weight: 800;
  color: #191F28;
  margin-bottom: 8px;
`;

const BillingMemberTopLineComent = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #191F28;
`;

const BillingMemberLineComent = styled(BillingMemberTopLineComent)`
`;

const BillingMembersComent = styled(BillingMemberTopLineComent)`
`;

const PaymentContainer = styled(BillingPaymentContainer)`
  display: ${(props) => (props.payment ? "flex" : "none")};
  width: auto;
  position: relative;

`;

const BillingPaymentTopLine = styled(BillingMemberTopLine)``;

const BillingPaymentTopLineComent = styled(BillingMemberTopLineComent)``;



const LottieContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 60px;
  height: 60px;
`;

const PaymentLine = styled.div`
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  @media (max-width: 400px) {
    padding-right: 16px;
  }
`;

const PaymentDeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  position: absolute;
  top: 12px;
  right: 18px;
`;

const PaymentFixComent = styled.div`
  text-align: center;
  margin-top: 16px;
  padding: 12px;
  background: rgba(49, 130, 246, 0.04);
  border-radius: 12px;
  
  span {
    font-size: 13px;
    color: #3182F6;
    font-weight: 600;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 16px;
`;


const SelectContainer = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
`;

const StyledSelect = styled.select`
  width: 100%;
  max-width: 480px;
  height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid #E5E8EB;
  font-size: 15px;
  font-weight: 500;
  color: #191F28;
  background-color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238B95A1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  transition: all 0.2s;

  &:hover {
    border-color: #3182F6;
  }

  &:focus {
    outline: none;
    border-color: #3182F6;
    box-shadow: 0 0 0 2px rgba(49, 130, 246, 0.1);
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
  margin: 20px 0px;
`;

const PaymentUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BillingPayment = ({ member, payment, setPayment }) => {
  const { meetingId } = useParams();
  const [notAllow, setNotAllow] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paymentSelected, setPayMentSelected] = useState({});
  const [tostPopUp, setTostPopUp] = useState(false);
  const firstPayMemberId = useMemo(() => {
    return selectedMember;
  }, [selectedMember]);

  useEffect(() => {
    const updatedInitialMemberSelection = member.reduce(
      (selection, memberdata) => {
        selection[memberdata.id] = true;
        return selection;
      },
      {}
    );
    setMemberSelection(updatedInitialMemberSelection);
  }, [member]);

  const [memberSelection, setMemberSelection] = useState({});

  const [formData, setFormData] = useState({
    place: "",
    price: "",
    attend_member_ids: [],
    pay_member_id: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      attend_member_ids: Object.keys(memberSelection).filter(
        (key) => memberSelection[key]
      ),
      pay_member_id: firstPayMemberId,
    }));
  }, [firstPayMemberId, memberSelection]);

  const handleGetData = async () => {
    try {
      const responseGetData = await getPaymentData(meetingId);
      setPayment(responseGetData.data);
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  };

  useEffect(() => {
    handleGetData();
  }, [member, meetingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const responsePostData = await postPaymentData(meetingId, formData);
      if (responsePostData.status === 201) {
        setFormData({
          place: "",
          price: "",
          attend_member_ids: Object.keys(memberSelection).filter(
            (key) => memberSelection[key]
          ),
          pay_member_id: firstPayMemberId,
        });

        handleGetData();
      } else {
        setTostPopUp(true);
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  const handleDeleteMember = async (paymentId) => {
    try {
      await deletePaymentData(meetingId, paymentId);
      setPayment(payment.filter((data) => data.id !== paymentId));
    } catch (error) {
      console.log("Api 데이터 삭제 실패");
    }
  };

  useEffect(() => {
    if (formData.place.length > 0 && formData.price.length > 0) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [formData.place, formData.price]);

  const handleMemberSelect = (e) => {
    const selectedValue = Number(e.target.value);
    setSelectedMember(selectedValue);
  };

  const handleMemberCheckSelect = (e, memberId) => {
    const isChecked = e.target.checked;
    setMemberSelection((prevSelection) => ({
      ...prevSelection,
      [memberId]: isChecked,
    }));
  };

  useEffect(() => {
    if (member.length > 0) {
      handleMemberSelect({ target: { value: member[0].id } });
    }
  }, [member]);

  const handleClick = (selectedMember) => {
    setPayMentSelected(selectedMember);
    setOpenModal(true);
  };

  return (
    <>
      <BillingPaymentContainer member={member && member.length > 0}>
        <TitleContainer>
        <Title>결제 내역을 추가 해주세요</Title>
        <LottieContainer>
        <Lottie 
          animationData={animationData} 
          loop={true}
          autoplay={true}
        />
        </LottieContainer>
        </TitleContainer>
        <FormContainer onSubmit={handleAddMember}>
          <InputContainer>  
            <BillingInputBox
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              placeholder="결제 장소를 입력해주세요"
              autocomplete="off"
              maxLength={22}
            />
            <BillingInputBox
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="결제 금액을 입력해주세요"
              autocomplete="off"
            />
          </InputContainer>
          <BillingMemberLineComent>
            결제한 사람은 누구인가요?
            </BillingMemberLineComent>
            <SelectContainer>
              <StyledSelect
                value={selectedMember}
                onChange={handleMemberSelect}
              >
                {[
                  ...member.filter((memberdata) => memberdata.leader === true),
                  ...member.filter((memberdata) => memberdata.leader === false),
                ].map((memberdata) => (
                  <option key={memberdata.id} value={memberdata.id}>
                    {memberdata.name}
                  </option>
                ))}
              </StyledSelect>
            </SelectContainer>
            <BillingMembersComent>
              참석한 멤버를 선택해주세요!
            </BillingMembersComent>
            <StyledCheckboxDiv>
              {member.map((memberdata) => (
                <div key={memberdata.id} style={{ margin: "5px" }}>
                  <StyledCheckboxLabel>
                    <input
                      type="checkbox"
                      checked={memberSelection[memberdata.id]}
                      onChange={(e) =>
                        handleMemberCheckSelect(e, memberdata.id)
                      }
                    />
                    <span>{truncate(memberdata.name, 4)}</span>
                  </StyledCheckboxLabel>
                </div>
              ))}
            </StyledCheckboxDiv>
            <BillingAddPayment type="submit" disabled={notAllow}>
              결제내역 추가하기
            </BillingAddPayment>
        </FormContainer>
      </BillingPaymentContainer>
      <PaymentContainer payment={payment && payment.length > 0}>
        <PaymentLine>
          {payment.map((paymentdata) => (
            <PaymentList
              key={paymentdata.id}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
            <PaymentContainers onClick={() => handleClick(paymentdata)}>
                <PaymentUserContainer>
                  <Payment>
                    <PaymentPlace>
                      {truncate(paymentdata.place, 10)}
                    </PaymentPlace>
                    <PaymentPayer>
                      {paymentdata.pay_member}
                    </PaymentPayer>
                  </Payment>
                  <Payment isRight>
                    <PaymentPrice>
                      {paymentdata.price.toLocaleString()}원
                    </PaymentPrice>
                    <PaymentSplitPrice>
                      {paymentdata.split_price.toLocaleString()}원
                    </PaymentSplitPrice>
                  </Payment>
                </PaymentUserContainer>
                <PaymentMembers>
                  {paymentdata.attend_member.map((attendMemberdata, index) => (
                    <div key={index}>
                      <span>{truncate(attendMemberdata, 4)}</span>
                    </div>
                  ))}
                </PaymentMembers>
              </PaymentContainers>
              <PaymentDelete
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteMember(paymentdata.id);
                }}
              >
                ×
              </PaymentDelete>
            </PaymentList>
          ))}
          <PaymentFixComent>
            <span>결제 내역을 선택하면 수정이 가능해요!☝🏻</span>
          </PaymentFixComent>
        </PaymentLine>
      </PaymentContainer>
      {openModal && (
        <PaymentFix
          {...paymentSelected}
          setOpenModal={setOpenModal}
          memberSelection={Object.keys(memberSelection)}
          member={member}
          handleGetData={handleGetData}
          selectedMember={selectedMember}
          handleMemberSelect={handleMemberSelect}
          meetingId={meetingId}
        />
      )}
      {tostPopUp && <TostPopUp message="입력 최대 값이 초과하였습니다." setTostPopUp={setTostPopUp} />}
    </>
  );
};

export default BillingPayment;