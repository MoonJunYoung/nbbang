import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPaymentData, postPaymentData, deletePaymentData } from "../api/api";
import BillingInputBox from "./BillingInputBox";
import PaymentFix from "./Modal/PaymentFixModal";
import { truncate } from "./Meeting";

const BillingPaymentContainer = styled.div`
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: ${(props) => (props.member ? "flex" : "none")};
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

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const BillingAddPayment = styled.button`
  color: white;
  margin: 20px 0;
  border: 1px solid lightgray;
  font-weight: 600;
  width: 160px;
  height: 30px;
  cursor: pointer;

  &:not(:disabled) {
    background-color: #0066ffd4;
    border: 1px solid lightgray;
    border-bottom: 1px solid #e1e1e1a8;
    box-shadow: 3px 4px 4px 0px #c6c6c666;
    color: white;
    cursor: pointer;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: white;
  }
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

const PaymentPlace = styled.span`
  @media (max-width: 768px) {
    width: 50px;
  }
`;
const PaymentPrice = styled.span``;

const PaymentDelete = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: darkgray;
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

const AttendBox = styled.div`
  width: 35px;
`;

const Attend = styled.span`
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const StyledCheckboxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 13px;
  @media (max-width: 390px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCheckboxLabel = styled.label`
  display: block;
  width: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 7px 10px;

  span {
    font-weight: bold;
    position: relative;
    color: white;
    font-size: 13px;
  }

  input[type="checkbox"]:not(:checked) {
    position: absolute;
    top: -2px;
    left: -3px;
    background-color: lightgrey;
    width: 100%;
    height: 100%;
    appearance: none;
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    position: absolute;
    top: -2px;
    left: -3px;
    background-color: #0066ffd4;
    width: 100%;
    height: 100%;
    appearance: none;
    box-shadow: 3px 4px 4px 0px #c6c6c666;
    border: 1px solid lightgray;

    cursor: pointer;
  }
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

const BillingMemberLineComent = styled(BillingMemberTopLineComent)`
  margin-top: 6px;
`;

const BillingMembersComent = styled(BillingMemberTopLineComent)`
  margin: 10px 6px 0px 0px;
`;

const PaymentContainer = styled(BillingPaymentContainer)`
  display: ${(props) => (props.payment ? "flex" : "none")};
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

const BillingPayment = ({ member, payment, setPayment }) => {
  const { meetingId } = useParams();
  const [notAllow, setNotAllow] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paymentSelected, setPayMentSelected] = useState({});
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
        alert("가격 입력 최대 값이 초과하였습니다.");
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
        <BillingMemberTopLine>
          <BillingMemberTopLineComent>
            결제 내역을 추가 해주세요
          </BillingMemberTopLineComent>
        </BillingMemberTopLine>
        <BillingPaymentLine>
          <FormContainer onSubmit={handleAddMember}>
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
            <BillingMemberLineComent>
              결제한 사람은 누구인가요?
            </BillingMemberLineComent>
            <select
              value={selectedMember}
              onChange={handleMemberSelect}
              style={{
                width: "60px",
                height: "20px",
                border: "1px solid lightgray",
              }}
            >
              {[
                ...member.filter((memberdata) => memberdata.leader === true),
                ...member.filter((memberdata) => memberdata.leader === false),
              ].map((memberdata) => (
                <option key={memberdata.id} value={memberdata.id}>
                  {memberdata.name}
                </option>
              ))}
            </select>

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
        </BillingPaymentLine>
      </BillingPaymentContainer>
      <PaymentContainer payment={payment && payment.length > 0}>
        <BillingPaymentTopLine>
          <BillingPaymentTopLineComent>
            결제 내역을 확인 해주세요
          </BillingPaymentTopLineComent>
        </BillingPaymentTopLine>
        <PaymentLine>
          {payment.map((paymentdata) => (
            <PaymentList key={paymentdata.id}>
              <PaymentContainers>
                {/* <PaymentResultContainer> */}
                <Payment onClick={() => handleClick(paymentdata)}>
                  <PaymentHistory>
                    {truncate(paymentdata.place, 10)}
                  </PaymentHistory>
                  <PaymentHistory>
                    결제자 {paymentdata.pay_member}
                  </PaymentHistory>
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
              <PaymentDeleteContainer>
                <PaymentDelete
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteMember(paymentdata.id);
                  }}
                >
                  X
                </PaymentDelete>
              </PaymentDeleteContainer>
            </PaymentList>
          ))}
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
    </>
  );
};

export default BillingPayment;
