import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

import { Container } from "./MainPage.styled";
import { useIsMember } from "../../hooks/use-is-member";

const MainPage = () => {
  const navigate = useNavigate();

  const isMember = useIsMember();

  useEffect(() => {
    if (!isMember) {
      navigate("/signd");
    }
  }, [isMember]);

  return (
    <Container>
      <Nav />
    </Container>
  );
};

export default MainPage;
