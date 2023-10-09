import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { NavContainer, Logo, UserId } from "./Nav.styled";

const Nav = () => {
  const authToken = Cookies.get("authToken");
  console.log(authToken);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: "http://15.164.99.251/api/",
        // withCredentials: true,
        headers: {
          Authorization: authToken,
        },
      });
      const response = await axiosInstance.get("user");
      setUser(response.data);
    } catch (error) {
      console.log("Api 요청 실패");
    }
  };

  return (
    <NavContainer>
      <Logo>
        <img
          alt="N/1"
          src="/images/Logo.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      <UserId>{user.identifier}님의 정산 내역입니다.</UserId>
    </NavContainer>
  );
};

export default Nav;
