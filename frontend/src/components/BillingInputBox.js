import React from 'react'
import styled from 'styled-components'

const InputBox = styled.div``
const Input = styled.input``

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
      />
    </InputBox>
   
  )
}

export default BillingInputBox