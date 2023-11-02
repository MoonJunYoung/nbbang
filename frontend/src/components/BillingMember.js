import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getMemberData, postMemberData, deleteMemberData } from '../api/api'
import BillingInputBox from './BillingInputBox'
import BillingMemberFix from './BillingModal/BillingMemberFix'
import { truncate } from './Meeting'

const BillingMemberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

const BillingAddMember = styled.button`
  width: 200px;
  height: 30px;
  border: 1px solid #CCE5FF;
  border-radius: 10px;
`

const MemberContainer = styled.div`
  display: grid;
  width: 475px;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  margin: 30px;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2 ,1fr);
    width: 250px;
    gap: 6px;
  }
`

const Leader = styled.span`
  font-weight: 600;
  font-size: 14px;
`

const MemberList = styled.div`
  cursor: pointer;
  padding: 10px;
  background-color: powderblue;
  border-radius: 10px;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.1);
  }
`

const Members = styled.span`
  font-size: 14px;
  color: black;
  padding: 10px;
`

const MemberDelete = styled.span`
  color: white;
  cursor: pointer;
`

const BillingMemberTopLine = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const BillingMemberLine = styled.div`
  border-top: 1px solid silver;
  width: 115px;
  margin-top: 10px;
  @media (max-width: 768px) {
    width: 25px;
  }
`

const BillingMemberTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`



const BillingMember = ({member,setMember}) => {
  const { meetingId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [memberSelected, setMemberSelected] = useState({});
  const [notAllow, setNotAllow] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleGetData = async () => {
    try {
      const responseGetData = await getMemberData(meetingId);
      setMember(responseGetData.data);
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
      [name]: value,
    });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const leaderValue = member.length === 0 ? true : false;
      const updatedFormData = {
        name: formData.name,
        leader: leaderValue,
      };
      const response = await postMemberData(meetingId, updatedFormData);
      if (response.status === 201) {
        setFormData({ name: '' });
        handleGetData();
      }
    } catch (error) {
      console.log('Api 데이터 수정 실패');
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await deleteMemberData(meetingId, memberId);
      setMember(member.filter((data) => data.id !== memberId));
    } catch (error) {
      console.log('Api 데이터 삭제 실패');
      if (error.response.data.detail === 'the leader member cannot be deleted.') {
        alert('총무인 멤버는 삭제할수 없습니다.');
      }
      if (error.response.data.detail === 'it is not possible to delete the member you want to delete because it is included in the payment.') {
        alert('결제내역의 포함 된 멤버는 삭제 할 수 없습니다.');
      }
    }
  };

  const handleClick = (selectedMember) => {
    setMemberSelected(selectedMember);
    setOpenModal(true);
  };

  useEffect(() => {
    if (formData.name.length > 0) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [formData.name]);

  return (
    <BillingMemberContainer>
      <BillingMemberTopLine>
        <BillingMemberLine></BillingMemberLine>
        <BillingMemberTopLineComent>모임에 참석한 멤버들은 누구인가요?</BillingMemberTopLineComent>
        <BillingMemberLine></BillingMemberLine>
      </BillingMemberTopLine>
      <FormContainer onSubmit={handleAddMember}>
        <BillingInputBox
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="멤버추가하기"
          maxlength="22"
        />
        <BillingAddMember type="submit" disabled={notAllow}>
          멤버추가하기
        </BillingAddMember>
      </FormContainer>
      <MemberContainer>
        {member.map((data) => (
          <MemberList key={data.id} >
            {data.leader === true && <Leader>총무</Leader>}
            <Members onClick={() => handleClick(data)}>{truncate(data.name,5)}</Members>
            <MemberDelete 
              onClick={(e) =>{ 
                e.preventDefault();
                handleDeleteMember(data.id);
              }}>X</MemberDelete>
          </MemberList>
        ))}
      </MemberContainer>
      {openModal && (
        <BillingMemberFix
          {...memberSelected}
          setOpenModal={setOpenModal}
          handleGetData={handleGetData}
        />
      )}
    </BillingMemberContainer>
  );
};

export default BillingMember;