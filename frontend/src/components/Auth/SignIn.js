import React, { useState } from "react";
import { postSignInData } from "../../api/api";
import AuthComponent from "./AuthComponent";

const SignIn = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const additionalFields = [

  ];


  return (
    <AuthComponent
      title="로그인"
      formData={formData}
      setFormData={setFormData}
      AuthApiRequest={postSignInData}
      additionalFields={additionalFields}
    />
  );
};

export default SignIn;
