import styled from 'styled-components' 
import Nav from '../../components/Nav';
import Googles from '../../components/Googles'

const SigndContainer = styled.div`
  height: 100vh;
  display: inline-block;
  background-color: azure;
`

const SigndPage = () => {
  return (
    <SigndContainer>
      <Nav />
      <Googles />
    </SigndContainer>
  );
};

export default SigndPage;