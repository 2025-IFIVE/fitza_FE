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
    console.log("폼 데이터 확인:", formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/login`,
        {
          username: formData.username,
          password: formData.password
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );


      if (response.status === 200) {
        // ✅ 헤더에서 JWT 토큰 추출
        const token = response.headers["authorization"]?.replace("Bearer ", "") || response.headers["accesstoken"]?.replace("Bearer ", "");

        if (token) {
          localStorage.setItem("authToken", token.replace("Bearer ", ""));
          console.log("✅ 토큰 저장 완료:", token);
          setErrorMessage("");
          navigate("/main");
        } else {
          setErrorMessage("로그인은 성공했지만 토큰이 발급되지 않았습니다.");
          console.warn("⚠️ 응답 전체:", response);
        }
      } else {
        setErrorMessage("로그인 실패: 서버에서 에러를 반환했습니다.");
      }
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
