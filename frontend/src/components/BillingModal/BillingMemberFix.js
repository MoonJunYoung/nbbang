import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { axiosData } from '../../api/api'

const BillingMemberFixContainer = styled.div`
  z-index: 1;
  position: absolute;
`

const WrapperModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  position: relative;
  height: 250px;
  width: 200px;
  background: white;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const ModalClose = styled.span`
  cursor: pointer;
`

const MemberNameFixInput = styled.input`
`

const MemberNameFixInputBox = styled.div`
`

const MemberFix = styled.button`
`

const LeaderCheck = styled.input`
`

const Label = styled.div`
`

const Leader = styled.span`
`

const BillingMemberFix = ({
  id,
  name,
  meeting_id,
  setOpenModal,
  handleGetData,
}) => {
  const axiosInstance = axiosData()
  const [leader, setLeader] = useState(false);
  const [notAllow, setNotAllow] = useState(true)
  const [formData, setFormData] = useState({
    name: name,
    leader: leader,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePutData = async (e) => {
    e.preventDefault();
    formData.leader = leader;
    try {
      const response = await axiosInstance.put(`meeting/${meeting_id}/member/${id}`, formData);
      if (response.status === 200) {
          setFormData({ name: '' });
          handleGetData();
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  useEffect(() => {
    if (formData.name.length > 0) {
      setNotAllow(false);
      return
    }
    setNotAllow(true)
  }, [formData.name])


  return (
    <BillingMemberFixContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={() => setOpenModal(false)}>X</ModalClose>
          <form onSubmit={handlePutData}>
            <MemberNameFixInputBox>
              <MemberNameFixInput
                type="text"
                name="name"
                value={formData.name}
                placeholder='이름을 입력해주세요'
                onChange={handleInputChange}
                autoComplete="off"
              />
            </MemberNameFixInputBox>
            <Label>
              <LeaderCheck
                type="checkbox"
                checked={leader}
                onChange={(e) => setLeader(e.target.checked)}
              />
              <Leader>총무로 변경하기</Leader>
            </Label>
            <MemberFix type="submit" disabled={notAllow}>
              저장하기
            </MemberFix>
          </form>
        </Modal>
      </WrapperModal>
    </BillingMemberFixContainer>
  );
};

export default BillingMemberFix;