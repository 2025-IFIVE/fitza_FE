// src/pages/Join.js
import React, { useState } from "react";
import * as S from "../styles/JoinStyle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Join() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
      const response = await axios.post("http://localhost:8080/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ 서버 응답 확인
      console.log("서버 전체 응답:", response);

      // ✅ 1. 바디에서 token을 시도 (혹시 있을 경우 대비)
      let token = response.data.token;

      // ✅ 2. 바디에 없으면 헤더에서 꺼내기
      if (!token) {
        const authHeader = response.headers['authorization'] || response.headers['Authorization'];
        token = authHeader ? authHeader.split(' ')[1] : null;
      }

      // ✅ 3. token이 없으면 에러 처리
      if (!token) {
        console.error("서버에서 토큰을 받지 못했습니다.");
        setErrorMessage("로그인 실패: 서버에서 토큰을 받지 못했습니다.");
        return;
      }

      // ✅ 4. localStorage에 저장
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify({}));    // user info는 현재 서버에서 안 옴

      // ✅ 저장 확인 (디버그용)
      console.log("저장된 토큰:", token);

      setErrorMessage("");
      navigate("/Main");    // 메인 페이지 이동

    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("로그인 실패. 아이디 또는 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <S.Container>
      <S.Logo>FITZA</S.Logo>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          type="text"
          name="username"
          value={formData.username}
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
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
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
