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
`


const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`
const BillingAddPayment = styled.button`
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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 500px;
  height: 60px;
  border: 1px solid #CCE5FF;
  border-radius: 10px; 
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    width: 395px;   
    height: 80px;
  }
`

const PaymentPlace = styled.span`
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
  background-color: cornflowerblue;
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
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 125px;
    font-size: 14px;
  }
`

const Attend = styled.span`
  position: absolute;
  right: 100px;
  @media (max-width: 768px) {
    right: 77px;
  }
`


const BillingPayment = ({ member }) => {
  const { meetingId } = useParams();
  const [payment, setPayment] = useState([])
  const [notAllow, setNotAllow] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paymentSelected, setPayMentSelected] = useState({});

  const firstPayMemberId = useMemo(() => {
    return selectedMember
  }, [selectedMember]);

  const firstMember = useMemo(()=> {
    return member.map(data => data.id)
  },[member])


  const [formData, setFormData] = useState({
    place: '',
    price: '',
    attend_member_ids: firstMember,
    pay_member_id: firstPayMemberId
  });

  useEffect(() => {
    setFormData(prev => ({
        ...prev,
        attend_member_ids: firstMember,
        pay_member_id: firstPayMemberId
      }
    ))
  }, [firstMember,firstPayMemberId]);


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
          attend_member_ids: firstMember,
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
      <FormContainer onSubmit={handleAddMember}>
        <BillingInputBox
          type="text"
          name="place"
          value={formData.place}
          onChange={handleInputChange}
          placeholder="결제내역추가하기"
          autocomplete="off"
          maxLength={22}
        />
        <BillingInputBox
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="결제금액추가하기"
          autocomplete="off"
        />
        <span>결제 한 사람</span>
        <select value={selectedMember} onChange={handleMemberSelect}>
          {[
            ...member.filter((memberdata) => memberdata.leader === true),
            ...member.filter((memberdata) => memberdata.leader === false)
          ].map((memberdata) => (
            <option key={memberdata.id} value={memberdata.id}>
              {memberdata.name}
            </option>
          ))}
        </select>
        <BillingAddPayment type="submit" disabled={notAllow}>
          결제내역 추가하기
        </BillingAddPayment>
      </FormContainer>
      <PaymentContainer>
        {payment.map((paymentdata) => (
          <PaymentList key={paymentdata.id} onClick={() => handleClick(paymentdata)}>
            <Payment>
              <PaymentPlace>결제내역</PaymentPlace>
              <PaymentHistory>{truncate(paymentdata.place,10)}</PaymentHistory>
            </Payment>
            <Payment>
              <PaymentPrice>사용금액</PaymentPrice>
              <PaymentHistory>{truncate(paymentdata.price.toLocaleString().toString()+"원",12)}</PaymentHistory>
              <Attend>{paymentdata.attend_member_ids.length}명</Attend>
            </Payment>
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