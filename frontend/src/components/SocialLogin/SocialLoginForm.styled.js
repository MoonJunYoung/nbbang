import styled from "styled-components";


export const SocialLoginContainer = styled.div`
  margin: ${(props) => props.marginTop || "20px"} 0;
  box-shadow: 0px 2px 3px ${(props) => props.boxShadow || "#258b13de"};
  width: 330px;
  height: 40px;
  background: ${(props) => props.backgroundColor || "#03c75a"};
  border: 1px solid ${(props) => props.borderColor || "#e6e6e666"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  img {
    width: ${(props) => props.imgWidth || "25px"};;
    margin-bottom: 3px;
  }
`;

export const Button = styled.button`
  color: ${(props) => props.textColor || "white"};
  background: ${(props) => props.backgroundColor || "#03c75a"};
  border: 1px solid ${(props) => props.borderColor || "#03c75a"};
  cursor: pointer;
  font-weight: 600;
`;