import { Link } from "react-router-dom";
import styled from "styled-components";

export const TopBar = styled.div`
  position: relative;
  height: 50px;
  border-bottom: 1px solid #e1e1e1a8;
  display: flex;
  box-shadow: 0px 2px 4px 0px #d9d9d980;
  justify-content: center;
  align-items: center;
`;

export const TopComent = styled.span`
  margin-bottom: 5px;
`;

export const TopIcon = styled.img`
  width: 20px;
`;

export const SigndContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SigndBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;

  @media (max-width: 768px) {
    width: 310px;
  }
`;

export const Form = styled.form`
`;

export const Input = styled.input`
  position: absolute;
  left: 10px;
  top: 6px;
  width: 265px;
  height: 25px;
  border: none;
`;

export const InputBox = styled.div`
  border: 1px solid lightgray;
  position: relative;
  width: 290px;
  height: 40px;
  border-radius: 5px;
  display: inline-block;
  background-color: white;
`;

export const SignInButton = styled.button`
  color: white;
  margin-top: 10px;
  border: 1px solid lightgray;
  font-weight: 600;
  width: 290px;
  height: 40px;
  border-radius: 5px;

  &:not(:disabled) {
    background-color: #0066ffd4;
    border: 1px solid lightgray;
    border-bottom: 1px solid #e1e1e1a8;
    box-shadow: 3px 4px 4px 0px #c6c6c666;
    color: white;
    cursor: pointer;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: white;
  }
`;

export const SigndTopLine = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const SigndLine = styled.div`
  border-top: 1px solid silver;
  width: 135px;

  margin-top: 10px;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const SigndLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

export const PlatformSignd = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Valid = styled.div`
  color: navy;
  font-weight: 700;
  height: 35px;
  font-size: 13px;
`;

export const SignUpLink = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 15px;
`;
export const AgreementContainer = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

export const AgreementChenckBox = styled.input``;


export const LinkStyle = styled(Link)`
  text-decoration: none;
`