import {
  SigndContainer,
  SigndBox,
  Form,
  Input,
  InputBox,
  SignInButton,
  Valid,
  AgreementContainer,
  AgreementChenckBox,
  NavBar,
  NavComent,
  NavIcon,
  AuthenticationTitleContainer,
  AuthenticationTitle,
  AuthenticationSubtitle,
  ResetButton,
  LinkStyle,
  AuthRequestContainer
} from "./AuthComponent.styled";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TostPopUp from "../TostPopUp";

const AuthComponent = ({
  title,
  formData,
  setFormData,
  AuthApiRequest,
  additionalFields,
}) => {
  const [notAllow, setNotAllow] = useState(true);
  const [isIdentifierValid, setIsIdentifierValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [SingUpLink] = useState(false);
  const [SginAgreement, setSginAgreement] = useState(false);
  const [tostPopUp, setTostPopUp] = useState(false)
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "identifier") {
      const identifierRegex = /^(?=.*[a-z])(?=.*\d).{5,}$/;
      const isValid = identifierRegex.test(value);
      setIsIdentifierValid(isValid);
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      const isValid = passwordRegex.test(value);
      setIsPasswordValid(isValid);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthApiRequest(formData);
      Cookies.set("authToken", response.data, {
        expires: 30,
      });
      navigate("/");
    } catch (error) {
      if (error.response.status === 401 || 409 ) {
        setTostPopUp(true)
      } else {
        alert("실패했습니다. 다시 시도하세요.");
      }
    }
  };

  const handleReset = (name) => {
    setFormData({
      ...formData,
      [name]: "",
    });

    if (name === "identifier") {
      setIsIdentifierValid(false);
    }

    if (name === "password") {
      setIsPasswordValid(false);
    }
  };

  useEffect(() => {
    if (title === "회원가입") {
      if (isIdentifierValid && isPasswordValid && SginAgreement) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    } else if (title === "로그인") {
      if (isIdentifierValid && isPasswordValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }
  }, [title, isIdentifierValid, isPasswordValid, SginAgreement]);



  return (
    <>
      <NavBar>
        <Link
          to="/signd"
          style={{
            position: "absolute",
            left: "0",
          }}
        >
          <NavIcon alt="beck" src="/images/beck.png" />
        </Link>
        <NavComent>{title}</NavComent>
      </NavBar>
      <div style={{ margin: '0px 20px 20px 20px' }}>
        {title === "회원가입" && (
          <AuthenticationTitleContainer>
            <AuthenticationTitle>
              반갑습니다😃
            </AuthenticationTitle>
            <AuthenticationTitle>
              이름을 알려주세요
            </AuthenticationTitle>
            <AuthenticationSubtitle>
              별명이나 애칭도 좋아요
            </AuthenticationSubtitle>
          </AuthenticationTitleContainer>
        )}
        {additionalFields.map((field) => (
          <InputBox key={field.name}>
            <Input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder={field.placeholder}
            />
            <ResetButton onClick={() => handleReset(field.name)}>X</ResetButton>
          </InputBox>
        ))}
        <SigndContainer>
          <AuthenticationTitleContainer>
            <AuthenticationTitle>
              아이디와 비밀번호를
            </AuthenticationTitle>
            <AuthenticationTitle>
              입력해주세요
            </AuthenticationTitle>
          </AuthenticationTitleContainer>
          <SigndBox>
            <Form onSubmit={handleSubmit}>
              <InputBox>
                <Input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  autoComplete="off"
                  placeholder=" 아이디를 입력해주세요"
                />
                <ResetButton  onClick={() => handleReset('identifier')}>X</ResetButton>
              </InputBox>
              {!isIdentifierValid && formData.identifier.length > 0 && (
                <Valid>소문자, 숫자를 포함하고 최소 5자 이상 이어야합니다</Valid>
              )}
              <InputBox>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder=" 비밀번호를 입력해주세요"
                />
                <ResetButton onClick={() => handleReset('password')}>X</ResetButton>
                
              </InputBox>
              {!isPasswordValid && formData.password.length > 0 && (
                <Valid>
                  비밀번호는 소문자, 숫자, 특수문자를 포함하고 최소 8자 이상이어야
                  합니다.
                </Valid>
              )}
               <AuthRequestContainer title={title === "로그인"}>
                {title === "회원가입" && (
                  <AgreementContainer >
                    <AgreementChenckBox
                      type="checkbox"
                      checked={SginAgreement}
                      onChange={(e) => setSginAgreement(e.target.checked)}
                    />
                    <LinkStyle
                      to="/user-protocol"
                    >
                      회원가입 및 이용약관
                    </LinkStyle>
                    <span>을 모두 확인하였으며, 이에 동의합니다.</span>
                  </AgreementContainer>
                )}
                  <SignInButton type="submit" disabled={notAllow}>
                    {title}
                  </SignInButton>
              </AuthRequestContainer>
            </Form>
          </SigndBox>
        </SigndContainer>
        {tostPopUp &&
        <TostPopUp
         message={"아이디와 비밀번호를 확인해 주세요."}
         setTostPopUp={setTostPopUp}
        />}
      </div>    
    </>
  );
};


export default AuthComponent;