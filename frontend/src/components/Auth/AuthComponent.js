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
      console.log("sdkfnmdskn");
      navigate("/");
    } catch (error) {
      alert("실패했습니다. 다시 시도하세요.");
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
            <SignInButton type="submit" disabled={notAllow}>
              {title}
            </SignInButton>
          </Form>
        </SigndBox>
      </SigndContainer>
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
