import React, { useState } from "react";
import { postSignUpData } from "../../api/api";
import AuthComponent from "./AuthComponent";

const SignUp = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    name: "",
  });

  const additionalFields = [
    {
      type: "text",
      name: "name",
      placeholder: " 이름을 입력해주세요",
    },
  ];

  


  return (
    <AuthComponent
      title="회원가입"
      formData={formData}
      setFormData={setFormData}
      AuthApiRequest={postSignUpData}
      additionalFields={additionalFields}
    />
  );
};

export default SignUp;
