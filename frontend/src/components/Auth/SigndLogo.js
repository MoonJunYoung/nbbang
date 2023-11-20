import React from "react";
import styled from "styled-components";

const SigndLogoImg = styled.img`
  width: 100px;
  margin: 50px 0px 10px 0px;
`;

const SigndComent = styled.p`
  margin: 20px 0px 60px;
  font-size: 15px;
  font-weight: 600;
`;

const SigndLogo = () => {
  return (
    <div>
      <SigndLogoImg
        alt="nbbang"
        src="/images/nbbang.png"
        onClick={() => (window.location.href = "/")}
      />
      <SigndComent>모두가 편리하게 사용하는 정산 앱!</SigndComent>
    </div>
  );
};

export default SigndLogo;
