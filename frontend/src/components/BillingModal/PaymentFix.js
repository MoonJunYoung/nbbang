import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { putPaymentData } from '../../api/api'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const PayMentFixContainer = styled.div`
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
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  max-height: 400px;
  overflow-y: scroll;
  width: 220px;
  background: white;
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
  position: absolute;
  top: 0;
  right: 8px;
`

const PayMentFixInput = styled.input`
  width: 115px;
  border: none;
`

const PayMentFixInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 150px;
  height: 30px;
  border: 1px solid #CCE5FF;
  border-radius: 10px;
`

const PayMentFix = styled.button`
  border: 1px solid #CCE5FF;
  border-radius: 8px;
  margin-top: 15px;
  width: 80px;
  height: 25px;
`
const PayMentMemberFix = styled.p`
  margin: 0;
`
const StyledCheckboxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`

const StyledCheckboxLabel = styled.label`
  position: relative;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px;

  span {
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
    background-color: cornflowerblue;
    width: 100%;
    height: 100%;
    appearance: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const StyledSelect = styled.select`
  margin: 10px 0;
  width: 80px;
  height: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 100%;
`


const PaymentFix = ({
  id,
  meeting_id,
  place,
  price,
  attend_member_ids,
  member,
  setOpenModal,
  handleGetData,
}) => {
  const ref = useRef()
  const initialMemberSelection = member.reduce((selection, memberdata) => {
    selection[memberdata.id] = attend_member_ids.includes(memberdata.id);
    return selection;
  }, {});
  const [memberSelection, setMemberSelection] = useState(initialMemberSelection); 

  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    place: place,
    price: price,
    attend_member_ids: [],
    pay_member_id: null,
  });
 
  useEffect(() => {
    setFormData(prev => ({
        ...prev,
        attend_member_ids: Object.keys(memberSelection).filter(
          (key) => memberSelection[key]
        ),
        pay_member_id: selectedMember
      }
    ))
  }, [memberSelection, selectedMember]);




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
      const response = await putPaymentData(meeting_id, id , formData);
      if (response.status === 200) {
          setFormData({ 
            palce: '',
            price: '',
          });
          setOpenModal(false)
          handleGetData();
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };



  useOnClickOutside(ref, ()=>{
    setOpenModal(false)
  })

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

  useEffect(() => {
    if (member.length > 0) {
      handleMemberDropBoxSelect({ target: { value: member[0].id } });
    }
  }, [member]);

  return (
    <PayMentFixContainer>
      <WrapperModal>
        <Modal ref={ref}>
          <ModalClose onClick={() => setOpenModal(false)}>X</ModalClose>
          <Form onSubmit={handlePutData}>
            <PayMentFixInputBox>
              <PayMentFixInput
                type="text"
                name="place"
                value={formData.place}
                placeholder='결제내역을 수정하기'
                onChange={handleInputChange}
                autoComplete="off"
                onTouchStart={(e) => e.preventDefault()} 
                onTouchMove={(e) => e.preventDefault()}  
              />
            </PayMentFixInputBox>
            <PayMentFixInputBox>
              <PayMentFixInput
                type="number"
                name="price"
                value={formData.price}
                placeholder='결제금액을 수정하기'
                onChange={handleInputChange}
                autoComplete="off"
                onTouchStart={(e) => e.preventDefault()} 
                onTouchMove={(e) => e.preventDefault()} 
              />
            </PayMentFixInputBox>
            <PayMentMemberFix>결제자 수정</PayMentMemberFix>
            <StyledSelect value={selectedMember} onChange={handleMemberDropBoxSelect}>
              {member.map((memberdata) => (
                <option key={memberdata.id} value={memberdata.id}>
                  {memberdata.name}
                </option>
              ))}
            </StyledSelect>
            <StyledCheckboxDiv>
              {member.map((memberdata) => (
                <div key={memberdata.id} style={{ margin: '5px' }}>
                  <StyledCheckboxLabel>
                    <input
                      type="checkbox"
                      checked={memberSelection[memberdata.id]}
                      onChange={(e) => handleMemberSelect(e, memberdata.id)}
                    />
                    <span>{memberdata.name}</span>
                  </StyledCheckboxLabel>
                </div>
              ))}
            </StyledCheckboxDiv>
            <PayMentFix type="submit">
              저장하기
            </PayMentFix>
          </Form>
        </Modal>
      </WrapperModal>
    </PayMentFixContainer>
  );
};


export default PaymentFix