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
      const response = await axios.post(
        "http://localhost:8080/login",
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
