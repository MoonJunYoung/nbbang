import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SingUp from "./BillingModal/SingUp";

const SigndContainer = styled.div`
  background-color: azure;
`;

const SigndBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 340px;
  height: 310px;
  border: 5px double lavenderblush;
  border-radius: 15px;
  background-color: lightskyblue;

  @media (max-width: 768px) {
    width: 310px;
  }
`;

const Form = styled.form`
  margin-top: 10px;
`;

const Input = styled.input`
  position: absolute;
  left: 10px;
  top: 6px;
  width: 265px;
  height: 25px;
  border: none;
`;

const InputBox = styled.div`
  position: relative;
  width: 290px;
  height: 40px;
  border-radius: 5px;
  border: none;
  display: inline-block;
  background-color: white;
`;

const SignInButton = styled.button`
  margin-top: 10px;
  width: 290px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid white;
  cursor: pointer;
`;

const Valid = styled.div`
  color: wheat;
  font-size: 13px;
`;

const SingUpButton = styled.span`
  margin-top: 15px;
  font-size: 13px;
  color: white;
  font-weight: 700;
  &:hover {
    color: navy;
  }
`;

const SingdMessge = styled.p`
  font-weight: bold;
  display: flex;
  color: white;
  font-size: 14px;
  flex-direction: row;
  margin: 5px 0 5px 25px;
  @media (max-width: 768px) {
    margin: 5px 0 5px 13px;
  }
`;

const FindId = styled.span`
  margin: 10px 5px 0px 10px;
  font-size: 13px;
  color: white;
  margin-left: 15px;
  font-weight: 700;
  &:hover {
    color: navy;
  }
`;

const FindPassword = styled(FindId)`
  margin-left: 5px;
`;

const CertificationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [idModalOpen, setIdModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://nbbang.shop/api/user/sign-in",
        formData
      );
      Cookies.set("authToken", response.data, {
        expires: 30,
      });
      navigate("/");
    } catch (error) {
      alert("실패했습니다. 다시 시도하세요.");
    }
  };

  useEffect(() => {
    if (formData.identifier.length > 0 && formData.password.length > 0) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [formData.identifier, formData.password]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleFindIdModalOpen = () => {
    setIdModalOpen(true);
  };
  const handleFindPasswordModalOpen = () => {
    setPasswordModalOpen(true);
  };

  return (
    <SigndContainer>
      <SigndBox>
        <Form onSubmit={handleSubmit}>
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
          <SignInButton type="submit" disabled={notAllow}>
            로그인
          </SignInButton>
        </Form>
 
          <SingUpButton onClick={handleModalOpen}>
            회원가입 하러가기
          </SingUpButton>

        {modalOpen && <SingUp setModalOpen={setModalOpen} />}
      </SigndBox>
    </SigndContainer>
  );
};

export default Login;
