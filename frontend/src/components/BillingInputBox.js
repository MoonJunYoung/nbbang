import React from "react";
import styled from "styled-components";

const InputBox = styled.div`
  position: relative;
  width: 450px;
  height: 50px;
  border: 1px solid #efefef;
  display: inline-block;
  background-color: #efefef;

  @media (max-width: 768px) {
    width: 250px;
    height: 40px;
  }
`;

const Input = styled.input`
  position: absolute;
  left: 20px;
  top: 10px;
  width: 400px;
  height: 30px;
  background-color: #efefef;
  border: none;

  input[type="text"] {
    touch-action: manipulation;
  }

  @media (max-width: 768px) {
    position: absolute;
    left: 12px;
    top: 3px;
    width: 220px;
    height: 30px;
    border: none;
    touch-action: none;
  }
`;

const BillingInputBox = ({ type, name, value, onChange, placeholder }) => {
  return (
    <InputBox>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        maxlength="22"
        onTouchStart={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      />
    </InputBox>
  );
};

export default BillingInputBox;
