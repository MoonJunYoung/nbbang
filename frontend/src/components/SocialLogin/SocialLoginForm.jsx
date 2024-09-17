import React from "react";
import { SocialLoginContainer, Button, SocialLoginIcon } from "./SocialLoginForm.styled";


export const SocialLoginForm = ({
  alt,
  src,
  comment,
  socialLoginUrl,
  buttonStyle,
  containerStyle,
  imgStyle
}) => {
  const handleSocialLogin = () => {
    window.location.href = socialLoginUrl;
  };

  return (
    <SocialLoginContainer {...containerStyle} onClick={handleSocialLogin}>
      <SocialLoginIcon {...imgStyle} alt={alt} src={src} />
      <Button {...buttonStyle}>{comment}</Button>
    </SocialLoginContainer>
  );
};

