import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getPaymentData, postPaymentData, deletePaymentData } from '../api/api'
import BillingInputBox from './BillingInputBox'
import PaymentFix from './BillingModal/PaymentFix'
import { truncate } from './Meeting'




const BillingPaymentContainer = styled.div`
  height: 200px;
  display: ${(props) => props.member ? 'block' : 'none'};
  height: 100%;
`


const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`
const BillingAddPayment = styled.button`
  margin: 20px;
  width: 200px;
  height: 30px;
  border: 1px solid #CCE5FF;
  border-radius: 10px;
`

const PaymentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`


const PaymentList = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: 60px;
  border: 1px solid #CCE5FF;
  border-radius: 10px; 
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {  
    height: 80px;
  }
`

const PaymentPlace = styled.span`
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
  background-color: #20b6fd;
  border-radius: 5px;
  border: none;
  color: white;
  margin: 0 10px;
  @media (max-width: 768px) {
    width: 50px;
  }
`
const PaymentPrice = styled(PaymentPlace)`
`

const PaymentDelete = styled(PaymentPlace)`
  background-color: darkgrey;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
    font-weight: 600;
  }
`
const PaymentHistory = styled.span`
  @media (max-width: 768px) {
      width: 145px;
    }

`

const Payment = styled.div`
  padding : 20px;                        
  @media (max-width: 768px) {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 125px;
    font-size: 14px;
    flex-direction: column;
    gap: 5px;
  }
`

const AttendBox = styled.div`
  width: 35px;
`

const Attend = styled.span`
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const StyledCheckboxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 13px;
`

const StyledCheckboxLabel = styled.label`
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
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    position: absolute;
    top: -2px;
    left: -3px;
    background-color: #62ccff;
    width: 100%;
    height: 100%;
    appearance: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const BillingPaymentTopLine = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

const BillingPaymentLine = styled.div`
  border-top: 1px solid silver;
    width: 135px;

  margin-top: 10px;
  @media (max-width: 768px) {
    width: 88px;
  }
`

const BillingPaymentTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`

const BillingMemberLineComent = styled(BillingPaymentTopLineComent)`
   margin-top: 6px;
`

const BillingMembersComent = styled(BillingPaymentTopLineComent)`

  margin: 10px 6px 0px 0px; 
`

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
    const updatedInitialMemberSelection = member.reduce((selection, memberdata) => {
      selection[memberdata.id] = true;
      return selection;
    }, {});
    setMemberSelection(updatedInitialMemberSelection);
  }, [member]);

  const [memberSelection, setMemberSelection] = useState({});

  const [formData, setFormData] = useState({
    place: '',
    price: '',
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
    }
  ));
  }, [firstPayMemberId,memberSelection]);


  const handleGetData = async () => {
    try {
      const responseGetData = await getPaymentData(meetingId);
      setPayment(responseGetData.data)
    } catch (error) {
      console.log('Api 데이터 불러오기 실패');
    }
  };

  useEffect(() => {
    handleGetData()
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const responsePostData = await postPaymentData(meetingId, formData);
      if (responsePostData.status === 201) {
        setFormData ({ 
          place: '',
          price: '',
          attend_member_ids: Object.keys(memberSelection).filter((key) => memberSelection[key]),
          pay_member_id: firstPayMemberId
        })
  
        handleGetData();
      }else {
        alert("가격 입력 최대 값이 초과하였습니다.")
      }
    } catch (error) {
      console.log('Api 데이터 수정 실패');
    }
  };

  const handleDeleteMember = async (paymentId) => {
    try {
      await deletePaymentData(meetingId, paymentId);
      setPayment(payment.filter((data) => data.id !== paymentId));
    } catch (error) {
      console.log('Api 데이터 삭제 실패');
    }
  };

  useEffect(() => {
    if (formData.place.length > 0 && formData.price.length > 0) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [formData.place ,formData.price]);

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
    <BillingPaymentContainer member={member && member.length > 1}>
      <BillingPaymentTopLine>
        <BillingPaymentLine></BillingPaymentLine>
        <BillingPaymentTopLineComent>결제 내역을 추가 해주세요</BillingPaymentTopLineComent>
        <BillingPaymentLine></BillingPaymentLine>
      </BillingPaymentTopLine>
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
        <BillingMemberLineComent>결제한 사람은 누구인가요?</BillingMemberLineComent>
        <select 
        value={selectedMember} 
        onChange={handleMemberSelect}
        style={{
          width: '60px',
          height: '20px',
          borderRadius: '15px',
          border: '1px solid skyblue',
        }}
        >
          {[
            ...member.filter((memberdata) => memberdata.leader === true),
            ...member.filter((memberdata) => memberdata.leader === false)
          ].map((memberdata) => (
            <option key={memberdata.id} value={memberdata.id}>
              {memberdata.name}
            </option>
          ))}
        </select>
        <BillingMembersComent>참석한 멤버를 선택해주세요!</BillingMembersComent>
        <StyledCheckboxDiv>
          {member.map((memberdata) => (
            <div key={memberdata.id} style={{ margin: '5px' }}>
              <StyledCheckboxLabel>
                <input
                  type="checkbox"
                  checked={memberSelection[memberdata.id]}
                  onChange={(e) => handleMemberCheckSelect(e, memberdata.id)}
                />
                <span>{memberdata.name}</span>
              </StyledCheckboxLabel>
            </div>
          ))}
        </StyledCheckboxDiv>
        <BillingAddPayment type="submit" disabled={notAllow}>
          결제내역 추가하기
        </BillingAddPayment>
      </FormContainer>
      <BillingMembersComent>정산내역을 누르면 정산내역을 수정 할 수 있어요! 👇🏻</BillingMembersComent>
      <PaymentContainer>
        {payment.map((paymentdata) => (
          <PaymentList key={paymentdata.id}>
            <Payment onClick={() => handleClick(paymentdata)} >
              <PaymentPlace>결제내역</PaymentPlace>
              <PaymentHistory>{truncate(paymentdata.place,10)}</PaymentHistory>
            </Payment>
            <Payment onClick={() => handleClick(paymentdata)} >
              <PaymentPrice>사용금액</PaymentPrice>
              <PaymentHistory>{truncate(paymentdata.price.toLocaleString().toString()+"원",12)}</PaymentHistory>
            </Payment>
            <AttendBox>
              <Attend>{paymentdata.attend_member_ids.length}명</Attend>
            </AttendBox>
            <PaymentDelete 
              onClick={(e) => {
                e.preventDefault();
                handleDeleteMember(paymentdata.id);
              }}>내역삭제
            </PaymentDelete>
          </PaymentList>
        ))}
      </PaymentContainer>
      {openModal && (
        <PaymentFix 
          {...paymentSelected}
          setOpenModal={setOpenModal}
          member={member}
          handleGetData={handleGetData}
          selectedMember={selectedMember}
          handleMemberSelect={handleMemberSelect}
        />
      )}
    </BillingPaymentContainer>
  );
};

export default BillingPayment;