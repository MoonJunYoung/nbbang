import styled from "styled-components";
import BillingResultButton from "../BillingResultButton";
import BillingResultShare from "../BillingResultShare";
import React, {useEffect, useState } from "react";

const BillingResultContainer = styled.div`
  z-index: 1;
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
  height: 250px;
  width: 250px;
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
`;

const ModalClose = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 8px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CheckboxText = styled.span`
`
const CheckboxPopUp = styled.div`
  width: 17px;
  border: 1px solid silver;
  border-radius: 20px;
  font-weight: 800;
  color: silver;
`
const Form = styled.form`
  display: ${props => props.checked ? 'block' : 'none'};
`

const InputBox = styled.div`
`

const Input = styled.input``


const BillingResult = ({ setModalOpen }) => {
  const [checked, setChecked] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [formData, setFormData] = useState({
    Id : ""
  })

  const handleCheckd = () => {
    setChecked(!checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formData.Id.length > 0) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [formData.Id]);


  return (
    <BillingResultContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={() => setModalOpen(false)}>X</ModalClose>
          <BillingResultButton />
          <BillingResultShare />
          <CheckboxContainer>
            <input type="checkbox" checked={checked} onChange={handleCheckd} />
            <CheckboxText>토스익명 아이디로 송금받기</CheckboxText>
            <CheckboxPopUp>?</CheckboxPopUp>
          </CheckboxContainer>
          <Form checked={checked}>    
            <InputBox>
              <Input 
                type='text'
                name="Id"
                value={formData.Id}
                placeholder='토스 익명 아이디를 입력해주세요'
                onChange={handleInputChange}
                maxlength="10"
              />
            </InputBox>
            <button type="submit" disabled={notAllow}>
              아이디 추가하기
            </button>
          </Form>
        </Modal>
      </WrapperModal>
    </BillingResultContainer>
  );
};

export default BillingResult;
