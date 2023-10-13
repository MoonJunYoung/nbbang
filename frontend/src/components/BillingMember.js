import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { axiosData } from '../api/api'
import BillingInputBox from './BillingInputBox'
import BillingMemberFix from './BillingModal/BillingMemberFix'

const BillingMemberContainer = styled.div`
`

const BillingAddMember = styled.button`
  
`

const MemberContainer = styled.div`
  
`

const Members = styled.span`
  cursor: pointer;
`

const MemberDelete = styled.span`
  cursor: pointer;
`




const BillingMember = () => {
  const { meetingId } = useParams();
  const axiosInstance = axiosData()
  const [openModal, setOpenModal] = useState(false);
  const [member, setMember] = useState([]);
  const [memberSelected, setMemberSelected] = useState({});
  const [notAllow, setNotAllow] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const responseGetData = await axiosInstance.get(`meeting/${meetingId}/member`);
      setMember(responseGetData.data);
    } catch (error) {
      console.log('Api 데이터 불러오기 실패');
    }
  };

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

      const response = await axiosInstance.post(`meeting/${meetingId}/member`, updatedFormData);
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
      await axiosInstance.delete(`meeting/${meetingId}/member/${memberId}`);
      setMember(member.filter((data) => data.id !== memberId));
    } catch (error) {
      console.log('Api 데이터 삭제 실패');
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
      <form onSubmit={handleAddMember}>
        <BillingInputBox
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="멤버추가하기"
        />
        <BillingAddMember type="submit" disabled={notAllow}>
          멤버추가하기
        </BillingAddMember>
      </form>
      {member.map((data) => (
        <MemberContainer key={data.id}>
          {data.leader === true && <span>총무</span>}
          <Members onClick={() => handleClick(data)}>{data.name}</Members>
          <MemberDelete onClick={() => handleDeleteMember(data.id)}>X</MemberDelete>
        </MemberContainer>
      ))}
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