import React, { useEffect, useState } from 'react'
import styled from 'styled-components' 

import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import Nav from '../../components/Nav';
import { postSigndData } from '../../api/api';

const SigndContainer = styled.div`
  height: 100vh;
  display: inline-block;
  background-color: azure;
`

const SigndBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  border: 3px solid #606060;
  border-radius: 15px;
  background-color: #375B89;

  @media (max-width: 768px) {
    margin: 0 15px;
  };
`

const Input = styled.input`
  position: absolute;
  left: 10px;
  top: 6px;
  width: 20rem;
  height: 25px;
  border: none;
  touch-action: none;
`

const InputBox = styled.div`
  position: relative;
  width: 350px;
  height: 40px;
  border-radius: 5px;
  border: none;
  display: inline-block;
  background-color: white;
`

const SignInButton = styled.button`
  margin-top: 10px;
  width: 355px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid white;
  cursor: pointer;
`

const Valid = styled.div`
  color: wheat;
  font-size: 13px;
`

const SingUpButton = styled(SignInButton)`
  margin-top: 5px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`
const SingdMessge = styled.p`
  display: flex;
  color: white;
  font-size: 14px;
  flex-direction: row;
  margin: 5px 0 5px 25px;
`


const SigndPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [isIdentifierValid, setIsIdentifierValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true)
  const [Signd, setSignd] = useState(false)
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "identifier") {
      const identifierRegex = /^[a-z0-9]{5,15}$/;
      const isValid = identifierRegex.test(value);
      setIsIdentifierValid(isValid);
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      const isValid = passwordRegex.test(value);
      setIsPasswordValid(isValid);
    }
  };

  const SignInApi = "http://15.164.99.251/api/user/sign-in"
  const SignUpApi = "http://15.164.99.251/api/user/sign-up"


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isIdentifierValid && isPasswordValid) {
      try {
        const response = await postSigndData(Signd ? SignInApi : SignUpApi , formData);
        console.log("성공!", response.data);
        Cookies.set('authToken', response.data, { expires: 30 });
        navigate("/");
      } catch (error) {
        alert("실패했습니다. 다시 시도하세요.");
      }
    } else {
      alert("아이디와 비밀번호를 올바르게 입력하세요.");
    }
  };


  return (
    <SigndContainer>
      <Nav />
      <SigndBox>
        <form onSubmit={handleSubmit}>
          <SingdMessge>아이디</SingdMessge>
          <InputBox>
            <Input
              type="text"
              name="identifier"
              placeholder=" 아이디를 입력해주세요"
              value={formData.identifier}
              onChange={handleInputChange}
              autocomplete="off"
            />
          </InputBox>
          {!isIdentifierValid && formData.identifier.length > 0 && 
          (<Valid>아이디는 소문자, 숫자를 포함하고 5~15자여야 합니다.</Valid>)}
          <SingdMessge>비밀번호</SingdMessge>
          <InputBox>
            <Input
              type="password"
              name="password"
              placeholder=" 비밀번호를 입력해주세요"
              value={formData.password}
              onChange={handleInputChange}
            />
          </InputBox>
          {!isPasswordValid && formData.password.length > 0 &&
          (<Valid>비밀번호는 대문자, 소문자, 숫자를 포함하고 8자 이상이어야 합니다.</Valid>)}
          <SignInButton onClick={()=>setSignd(true)} type="submit">로그인</SignInButton>
          <SingUpButton onClick={()=>setSignd(false)} type="submit">회원가입</SingUpButton>
        </form>
      </SigndBox>
    </SigndContainer>
  );
};

export default SigndPage;