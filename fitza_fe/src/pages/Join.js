import React, { useState } from "react";
import * as S from "../styles/JoinStyle"; // 스타일 파일 import
import { Link } from "react-router-dom";
import axios from "axios";

function Join() {
  const [formData, setFormData] = useState({
    id: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("로그인 성공:", response.data);
      setErrorMessage("");
      // 로그인 후 페이지 이동 또는 토큰 저장 로직 추가 가능
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <S.Container>
      <S.Logo>FITZA</S.Logo>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
          required
        />
        <S.Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
          required
        />
        <S.Button type="submit">로그인</S.Button>
      </S.Form>
      <S.SignUpContainer>
        <S.SignUpText>회원으로 가입하시겠습니까?</S.SignUpText>
        <S.SignUpButton as={Link} to="/SignUp">
          회원가입
        </S.SignUpButton>
      </S.SignUpContainer>
    </S.Container>
  );
}

export default Join;
