import styled from "styled-components";
import Nav from "../../components/Nav";
import GoogleLogin from "../../components/GoogleLogin";

const SigndContainer = styled.div`
  height: 100vh;
  display: inline-block;
  background-color: azure;
`;

const SigndPage = () => {
  return (
    <SigndContainer>
      <Nav />
      <GoogleLogin />
    </SigndContainer>
  );
};

export default SigndPage;
