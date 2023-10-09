import styled from "styled-components";

export const SigndContainer = styled.div`
  height: 100vh;
  display: inline-block;
  background-color: azure;
`;

export const SigndBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  border: 3px solid #606060;
  border-radius: 15px;
  background-color: #375b89;

  @media (max-width: 768px) {
    margin: 0 15px;
  }
`;

export const Input = styled.input`
  position: absolute;
  left: 10px;
  top: 6px;
  width: 20rem;
  height: 25px;
  border: none;
`;

export const InputBox = styled.div`
  position: relative;
  width: 350px;
  height: 40px;
  border-radius: 5px;
  border: none;
  display: inline-block;
  background-color: white;
`;

export const SignInButton = styled.button`
  margin-top: 10px;
  width: 355px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid white;
  cursor: pointer;
`;

export const Valid = styled.div`
  color: wheat;
  font-size: 13px;
`;

export const SingUpButton = styled(SignInButton)`
  margin-top: 5px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
export const SingdMessge = styled.p`
  display: flex;
  color: white;
  font-size: 14px;
  flex-direction: row;
  margin: 5px 0 5px 25px;
`;
