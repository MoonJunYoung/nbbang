import React, { useEffect, useState } from "react";

import { NavContainer, Logo, UserId } from "./Nav.styled";
import { getUserInfo } from "../../shared/services/user";

const Nav = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userInfo = await getUserInfo();

      setUser(userInfo);
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
