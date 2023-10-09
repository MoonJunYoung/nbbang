import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

import { Container } from "./MainPage.styled";
import { tokenStorage } from "../../shared/storage";

const MainPage = () => {
  const navigate = useNavigate();

  const authToken = React.useMemo(() => tokenStorage.getToken(), []);

  useEffect(() => {
    if (!authToken) {
      navigate("/signd");
    }
  }, [authToken, navigate]);

  return (
    <Container>
      <Nav />
    </Container>
  );
};

export default MainPage;
