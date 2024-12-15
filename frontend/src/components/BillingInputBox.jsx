import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 36px 8px 0;
  border: none;
  border-bottom: 2px solid #3182F6;
  outline: none;
  font-size: 16px;

  &::placeholder {
    color: #AEB5BC;
  }
`;

const BillingInputBox = ({ type, name, value, onChange, placeholder }) => {
  return (
    <InputWrapper>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        maxLength="22"
      />
    </InputWrapper>
  );
};

export default BillingInputBox;
