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
`

const ModalClose = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 8px;
`

const PayMentFixInput = styled.input`
  border: none;
`

const PayMentFixInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 30px;
  border: 1px solid #CCE5FF;
  border-radius: 10px;
`

const PayMentFix = styled.button`
  border: 1px solid #CCE5FF;
  border-radius: 8px;
`


const PaymentFix = ({
  id,
  meeting_id,
  attend_member_ids,
  member,
  setOpenModal,
  handleGetData,
}) => {
  const ref = useRef()
  const [notAllow, setNotAllow] = useState(true)
  const initialMemberSelection = member.reduce((selection, memberdata) => {
    selection[memberdata.id] = attend_member_ids.includes(memberdata.id);
    return selection;
  }, {});
  const [memberSelection, setMemberSelection] = useState(initialMemberSelection); 
  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    place: '',
    price: '',
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

  useEffect(() => {
    if (formData.place.length > 0 && formData.price.length > 0) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [formData.place ,formData.price]);


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
          <form onSubmit={handlePutData}>
            <PayMentFixInputBox>
              <PayMentFixInput
                type="text"
                name="place"
                value={formData.palce}
                placeholder='결제내역을 수정하기'
                onChange={handleInputChange}
                autoComplete="off"
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
              />
            </PayMentFixInputBox>
            <select value={selectedMember} onChange={handleMemberDropBoxSelect}>
              {member.map((memberdata) => (
                <option key={memberdata.id} value={memberdata.id}>
                  {memberdata.name}
                </option>
              ))}
            </select>
            {member.map((memberdata) => (
              <div key={memberdata.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={memberSelection[memberdata.id]}
                    onChange={(e) => handleMemberSelect(e, memberdata.id)}
                  />
                  {memberdata.name}
                </label>
              </div>
            ))}
            <PayMentFix type="submit" disabled={notAllow}>
              저장하기
            </PayMentFix>
          </form>
        </Modal>
      </WrapperModal>
    </PayMentFixContainer>
  );
};


export default PaymentFix