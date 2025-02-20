import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

export const Logo = styled.h1`
  font-size: 45px;
  font-weight: normal;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px;
`;

export const Input = styled.input`
  width: 90%;
  padding: 15px;
  margin: 12px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  
  /* 그림자 추가 */
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #a47864;
  }
`;

export const Button = styled.button`
  width: 40%;
  padding: 10px 5px;
  margin-top: 10px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background-color: #A47864;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  
  /* 그림자 추가 */
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #8b5e4f;
  }
`;

export const SignUpContainer = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
`;

export const SignUpText = styled.span`
  font-size: 12px;  /* 원하는 크기로 조정 */
  color: #555;      /* 색상 변경 가능 */
`;

export const SignUpButton = styled.button`
  background-color: #A47864;
  color: white;
  border: none;
  padding: 5px 45px;
  border-radius: 25px;
  margin-left: 45px;
  cursor: pointer;
  font-size: 12px;
  
  /* 그림자 추가 */
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #8b5e4f;
  }
`;
