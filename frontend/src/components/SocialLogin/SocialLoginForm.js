import React from "react";
import { SocialLoginContainer, Button } from "./SocialLoginForm.styled";


export const SocialLoginForm = ({
  alt,
  src,
  comment,
  socialLoginUrl,
  buttonStyle,
  containerStyle,
}) => {
  const handleSocialLogin = () => {
    window.location.href = socialLoginUrl;
  };

  return (
    <SocialLoginContainer {...containerStyle} onClick={handleSocialLogin}>
      <img alt={alt} src={src} />
      <Button {...buttonStyle}>{comment}</Button>
    </SocialLoginContainer>
  );
};

