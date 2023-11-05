import styled from "styled-components";
import Nav from "../../components/Nav";
import Googles from "../../components/GoogleLogin";
import GoogleRedirect from "../../components/GoogleRedirect";

const SigndContainer = styled.div`
  height: 100vh;
  display: inline-block;
  background-color: azure;
`;

const SigndPage = () => {
  return (
    <SigndContainer>
      <Nav />
      <Googles />
      <GoogleRedirect />
    </SigndContainer>
  );
};

export default SigndPage;
