import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

import {
  SigndContainer,
  SigndBox,
  Input,
  InputBox,
  SignInButton,
  Valid,
  SingUpButton,
  SingdMessge,
} from "./SigndPage.styled";
import { tokenStorage } from "../../shared/storage";

const InputField = {
  Identifier: "identifier",
  Password: "password",
};

const SigndPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [isIdentifierValid, setIsIdentifierValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [Signd, setSignd] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === InputField.Identifier) {
      const identifierRegex = /^[a-z0-9]{5,15}$/;
      const isValid = identifierRegex.test(value);
      setIsIdentifierValid(isValid);
    }

    if (name === InputField.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      const isValid = passwordRegex.test(value);
      setIsPasswordValid(isValid);
    }
  };

  const SignInApi = "http://15.164.99.251/api/sign-in";
  const SignUpApi = "http://15.164.99.251/api/sign-up";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isIdentifierValid && isPasswordValid) {
      try {
        const response = await axios.post(
          Signd ? SignInApi : SignUpApi,
          formData
        );
        console.log("성공!", response.data);

        tokenStorage.setToken(response.data);

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

  return (
    <SigndContainer>
      <Nav />
      <SigndBox>
        <form onSubmit={handleSubmit}>
          <SingdMessge>아이디</SingdMessge>
          <InputBox>
            <Input
              type="text"
              name={InputField.identifier}
              placeholder=" 아이디를 입력해주세요"
              value={formData.identifier}
              onChange={handleInputChange}
              autocomplete="off"
            />
          </InputBox>
          {!isIdentifierValid && formData.identifier.length > 0 && (
            <Valid>아이디는 소문자, 숫자를 포함하고 5~15자여야 합니다.</Valid>
          )}
          <SingdMessge>비밀번호</SingdMessge>
          <InputBox>
            <Input
              type="password"
              name={InputField.Password}
              placeholder=" 비밀번호를 입력해주세요"
              value={formData.password}
              onChange={handleInputChange}
            />
          </InputBox>
          {!isPasswordValid && formData.password.length > 0 && (
            <Valid>
              비밀번호는 대문자, 소문자, 숫자를 포함하고 8자 이상이어야 합니다.
            </Valid>
          )}
          <SignInButton
            onClick={() => setSignd(true)}
            type="submit"
            disabled={notAllow}
          >
            로그인
          </SignInButton>
          <SingUpButton
            onClick={() => setSignd(false)}
            type="submit"
            disabled={notAllow}
          >
            회원가입
          </SingUpButton>
        </form>
      </SigndBox>
    </SigndContainer>
  );
};

export default SigndPage;
