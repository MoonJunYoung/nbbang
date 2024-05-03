import {
  TopBar,
  TopComent,
  TopIcon,
  SigndContainer,
  SigndBox,
  Form,
  Input,
  InputBox,
  SignInButton,
  SigndTopLine,
  SigndLine,
  SigndLineComent,
  PlatformSignd,
  Valid,
  SignUpLink,
  AgreementContainer,
  AgreementChenckBox,
} from "./AuthComponent.styled";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SigndLogo from "./SigndLogo";
import {
  NaverLogin,
  KakaoLogin,
  GoogleLogin,
} from "../SocialLogin/SocialPlatformLogin";

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
      alert("실패했습니다. 다시 시도하세요.");
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
      <TopBar>
        <Link
          to="/signd"
          style={{
            position: "absolute",
            left: "0",
          }}
        >
          <TopIcon alt="beck" src="/images/beck.png" />
        </Link>
        <TopComent>{title}</TopComent>
      </TopBar>

      <SigndLogo />
      <SigndContainer>
        <SigndBox>
          <Form onSubmit={handleSubmit}>
            <InputBox>
              <Input
                type="text"
                name="identifier"
                placeholder=" 아이디를 입력해주세요"
                value={formData.identifier}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </InputBox>
            {!isIdentifierValid && formData.identifier.length > 0 && (
              <Valid>소문자, 숫자를 포함하고 최소 5자 이상 이어야합니다</Valid>
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
            {additionalFields.map((field) => (
              <InputBox key={field.name}>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </InputBox>
            ))}
            {title === "회원가입" && (
              <AgreementContainer>
                <AgreementChenckBox
                  type="checkbox"
                  checked={SginAgreement}
                  onChange={(e) => setSginAgreement(e.target.checked)}
                />
                <a
                  href="https://nbbang.shop/user-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  회원가입 및 이용약관
                </a>
                <a>을 모두 확인하였으며, 이에 동의합니다.</a>
              </AgreementContainer>
            )}
            <SignInButton type="submit" disabled={notAllow}>
              {title}
            </SignInButton>
          </Form>
        </SigndBox>
      </SigndContainer>
      {title === "로그인" && (
        <SignUpLink>
          <span>아이디가 없으신가요?</span>
          <a href="/sign-up" style={{ margin: "5px" }}>
            회원가입 하러가기
          </a>
        </SignUpLink>
      )}
      {title === "회원가입" && (
        <SignUpLink>
          <span>아이디가 있으신가요?</span>
          <a href="/sign-in" style={{ margin: "5px" }}>
            로그인 하러가기
          </a>
        </SignUpLink>
      )}
      <SigndTopLine>
        <SigndLine></SigndLine>
        <SigndLineComent>or</SigndLineComent>
        <SigndLine></SigndLine>
      </SigndTopLine>
      <PlatformSignd>
        {navigator.userAgent.includes("KAKAOTALK") ? null : <GoogleLogin />}
        <KakaoLogin />
        <NaverLogin />
      </PlatformSignd>
    </>
  );
};

export default AuthComponent;
