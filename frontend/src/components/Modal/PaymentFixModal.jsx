import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { putPaymentData } from "../../api/api";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { truncate } from "../Meeting";
import { motion, AnimatePresence } from "framer-motion";

const PayMentFixContainer = styled.div`
  z-index: 10;
  position: absolute;
`;

const WrapperModal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-height: 500px;
  width: 300px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  padding: 24px;
`;

const ModalClose = styled.button`
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
`;

const PayMentFixInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #0066ff;
    box-shadow: 0 0 0 2px rgba(0,102,255,0.1);
  }
`;

const PayMentFixInputBox = styled.div`
  margin: 8px 0;
  width: 100%;
`;

const PayMentFix = styled(motion.button)`
  border: none;
  border-radius: 12px;
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #0066ff;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0052cc;
    transform: translateY(-1px);
  }
`;

const PayMentMemberFix = styled.p`
  margin: 16px 0 8px 0;
  font-weight: 600;
  color: #333;
`;

const StyledCheckboxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 16px 0;
`;

const StyledCheckboxLabel = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  background: ${props => props.checked ? '#0066ff' : '#f5f5f5'};
  transition: all 0.2s ease;

  span {
    color: ${props => props.checked ? 'white' : '#666'};
    font-size: 13px;
    font-weight: 500;
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }

  &:hover {
    background: ${props => props.checked ? '#0052cc' : '#e9e9e9'};
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #e1e1e1;
  background: white;
  cursor: pointer;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0066ff;
    box-shadow: 0 0 0 2px rgba(0,102,255,0.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PaymentFix = ({
  id,
  meetingId,
  place,
  price,
  pay_member,
  attend_member_ids,
  member,
  setOpenModal,
  handleGetData,
}) => {
  const ref = useRef();

  const initialMemberSelection = member.reduce((selection, memberdata) => {
    selection[memberdata.id] = attend_member_ids.includes(memberdata.id);
    return selection;
  }, {});
  const [memberSelection, setMemberSelection] = useState(
    initialMemberSelection
  );

  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    place: place,
    price: price,
    attend_member_ids: [],
    pay_member_id: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      attend_member_ids: Object.keys(memberSelection).filter(
        (key) => memberSelection[key]
      ),
      pay_member_id: selectedMember,
    }));
  }, [memberSelection, selectedMember]);

  useEffect(() => {
    const payMemberId = member.find(
      (memberdata) => memberdata.name === pay_member
    )?.id;

    if (payMemberId !== undefined) {
      setSelectedMember(payMemberId);
    }
  }, [pay_member, member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePutData = async (e) => {
    e.preventDefault();
    try {
      const response = await putPaymentData(meetingId, id, formData);
      if (response.status === 200) {
        setFormData({
          palce: "",
          price: "",
        });
        setOpenModal(false);
        handleGetData();
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  useOnClickOutside(ref, () => {
    setOpenModal(false);
  });

  const handleMemberSelect = (e, memberId) => {
    const isChecked = e.target.checked;
    setMemberSelection((prevSelection) => ({
      ...prevSelection,
      [memberId]: isChecked,
    }));
  };

  const handleMemberDropBoxSelect = (e) => {
    const selectedValue = Number(e.target.value);
    setSelectedMember(selectedValue);
  };

  return (
    <PayMentFixContainer>
      <AnimatePresence>
        <WrapperModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            ref={ref}
          >
            <ModalClose onClick={() => setOpenModal(false)}>×</ModalClose>
            <Form onSubmit={handlePutData}>
              <PayMentFixInputBox>
                <PayMentFixInput
                  type="text"
                  name="place"
                  value={formData.place}
                  placeholder="결제내역을 입력해주세요"
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </PayMentFixInputBox>
              <PayMentFixInputBox>
                <PayMentFixInput
                  type="number"
                  name="price"
                  value={formData.price}
                  placeholder="결제금액을 입력해주세요"
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </PayMentFixInputBox>
              <PayMentMemberFix>결제자 선택</PayMentMemberFix>
              <StyledSelect
                value={selectedMember}
                onChange={handleMemberDropBoxSelect}
              >
                {member.map((memberdata) => (
                  <option key={memberdata.id} value={memberdata.id}>
                    {memberdata.name}
                  </option>
                ))}
              </StyledSelect>
              <PayMentMemberFix>참여 멤버 선택</PayMentMemberFix>
              <StyledCheckboxDiv>
                {member.map((memberdata) => (
                  <StyledCheckboxLabel 
                    key={memberdata.id}
                    checked={memberSelection[memberdata.id]}
                  >
                    <input
                      type="checkbox"
                      checked={memberSelection[memberdata.id]}
                      onChange={(e) => handleMemberSelect(e, memberdata.id)}
                    />
                    <span>{truncate(memberdata.name, 5)}</span>
                  </StyledCheckboxLabel>
                ))}
              </StyledCheckboxDiv>
              <PayMentFix 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                저장하기
              </PayMentFix>
            </Form>
          </Modal>
        </WrapperModal>
      </AnimatePresence>
    </PayMentFixContainer>
  );
};

export default PaymentFix;
