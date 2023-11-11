import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Googles from "../../components/GoogleLogin";
import KakaoLogin from "../../components/KakaoLogin";
import NaverLogin from "../../components/NaverLogin";

const SingUpContainer = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
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

const PlatformSigndContainer = styled.div`
  margin: 8px 12px 10px 7px;
  gap: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const PlatformSigndComent = styled.p`
  margin: 10px 0px 10px 0px;
  color: black;
  margin-top: 5px;
  font-weight: 700;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  padding: 10px;
  width: 220px;
  border-radius: 15px;
  border: 3px inset skyblue;
  flex-direction: column;
  align-items: center;
  gap: 13px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 210px;
  height: 30px;
  border: 1px solid #cce5ff;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  width: 180px;
`;

const SingdMessge = styled.p`
  font-weight: bold;
  color: black;
  font-size: 14px;
  margin-top: 20px;
`;

const SignInButton = styled.button`
  color: white;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid skyblue;
  background-color: skyblue;
  cursor: pointer;
`;

const Valid = styled.div`
  color: navy;
  font-weight: 700;
  width: 200px;
  font-size: 13px;
`;

const PlatformsSigndContainer = styled.div`
  margin-left: 8px;
  display: flex;
  gap: 5px;
`;

const SingUp = ({ setModalOpen }) => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    name: ""
  });
  const ref = useRef();

  const [isIdentifierValid, setIsIdentifierValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "identifier") {
      const identifierRegex =
        /^(?=.*[a-z])(?=.*\d).{5,}$/;
      const isValid = identifierRegex.test(value);
      setIsIdentifierValid(isValid);
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      const isValid = passwordRegex.test(value);
      setIsPasswordValid(isValid);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isIdentifierValid && isPasswordValid) {
      try {
        const response = await axios.post(
          "http://nbbang.shop/api/user/sign-up",
          formData
        );
        Cookies.set("authToken", response.data, {
          expires: 30,
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        navigate("/");
      } catch (error) {
        alert("실패했습니다. 다시 시도하세요.");
      }
    } else {
      alert("아이디와 비밀번호를 올바르게 입력하세요.");
    }
  };

  useEffect(() => {
    if (isIdentifierValid && isPasswordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [isIdentifierValid, isPasswordValid]);

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <SingUpContainer>
      <WrapperModal>
        <Modal ref={ref}>
          <ModalClose onClick={() => setModalOpen(false)}>X</ModalClose>
          <SingdMessge>회원가입</SingdMessge>
          <Form onSubmit={handleSubmit}>
          <InputBox>
              <Input
                type="text"
                name="name"
                placeholder=" 이름을 입력해주세요"
                value={formData.name}
                onChange={handleInputChange}
                autocomplete="off"
              />
            </InputBox>
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
            {!isIdentifierValid && formData.identifier.length > 0 && (
              <Valid>소문자, 숫자, 특수문자를 포함하고 최소 5자 이상 이어야합니다</Valid>
            )}
            <InputBox>
              <Input
                type="password"
                name="password"
                placeholder=" 비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleInputChange}
              />
            </InputBox>
            {!isPasswordValid && formData.password.length > 0 && (
              <Valid>
                비밀번호는 소문자, 숫자, 특수문자를 포함하고 최소 8자 이상이어야
                합니다.
              </Valid>
            )}
            <SignInButton type="submit" disabled={notAllow}>
              회원가입
            </SignInButton>
          </Form>
          <PlatformSigndContainer>
            <PlatformSigndComent>SNS계정으로 간편가입하기</PlatformSigndComent>
            <PlatformsSigndContainer>
              <Googles />
              <KakaoLogin />
              <NaverLogin />
            </PlatformsSigndContainer>
          </PlatformSigndContainer>
        </Modal>
      </WrapperModal>
    </SingUpContainer>
  );
};

export default SingUp;
