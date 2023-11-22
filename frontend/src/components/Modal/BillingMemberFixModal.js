import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PutMemberNameData } from "../../api/api";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const BillingMemberFixContainer = styled.div`
  z-index: 10;
  position: absolute;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  align-items: center;
  height: 150px;
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
`;

const ModalClose = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 8px;
`;

const MemberNameFixInput = styled.input`
  border: none;
  width: 115px;
`;

const MemberNameFixInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;
  border: 1px solid #cce5ff;
  border-radius: 10px;
`;

const MemberFix = styled.button`
  border: 1px solid #cce5ff;
  border-radius: 8px;
  width: 80px;
  height: 25px;
`;

const LeaderCheck = styled.input``;

const Label = styled.div`
  margin: 10px;
`;

const Leader = styled.span``;

const BillingMemberFix = ({
  id,
  name,
  meetingId,
  setOpenModal,
  handleGetData,
  leader,
}) => {
  const ref = useRef();

  const [selectedleader, setSelectedleader] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [formData, setFormData] = useState({
    name: name,
    leader: selectedleader,
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
    if (leader === true) {
      formData.leader = true;
    } else {
      formData.leader = selectedleader;
    }
    try {
      const response = await PutMemberNameData(meetingId, id, formData);
      if (response.status === 200) {
        setFormData({ name: "" });
        setOpenModal(false);
        handleGetData();
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  useEffect(() => {
    if (formData.name.length > 0) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [formData.name]);

  useOnClickOutside(ref, () => {
    setOpenModal(false);
  });

  return (
    <BillingMemberFixContainer>
      <WrapperModal>
        <Modal ref={ref}>
          <ModalClose onClick={() => setOpenModal(false)}>X</ModalClose>
          <form onSubmit={handlePutData}>
            <MemberNameFixInputBox>
              <MemberNameFixInput
                type="text"
                name="name"
                value={formData.name}
                placeholder="이름을 입력해주세요"
                onChange={handleInputChange}
                autoComplete="off"
                onTouchStart={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
              />
            </MemberNameFixInputBox>
            <Label>
              <LeaderCheck
                type="checkbox"
                checked={selectedleader}
                onChange={(e) => setSelectedleader(e.target.checked)}
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
