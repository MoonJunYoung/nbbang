import React from 'react'
import styled from 'styled-components'

const InputBox = styled.div`
  position: relative;
  width: 450px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #CCE5FF;
  display: inline-block;
  background-color: white;

  @media (max-width: 768px) {
    width: 250px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #CCE5FF;
  }
`

const Input = styled.input`
  position: absolute;
  left: 20px;
  top: 10px;
  border: none;
  width: 400px;
  height: 30px;
  touch-action: none;

  @media (max-width: 768px) {
    position: absolute;
    left: 13px;
    top: 3px;
    width: 220px;
    height: 30px;
    border: none;
  }
`

const BillingInputBox = ({
  type,
  name,
  value,
  onChange,
  placeholder
}) => {
  return (
    <InputBox>
      <Input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autocomplete="off"
        maxlength='22'
      />
    </InputBox>
   
  )
}

export default BillingInputBox