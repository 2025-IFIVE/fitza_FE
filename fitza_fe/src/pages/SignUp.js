// src/pages/SignUp.js
import React, { useState } from "react";
import * as S from "../styles/SignUpStyle";
import { Link, useNavigate } from "react-router-dom";
import backButton from '../img/backButton.png';
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    nickname: "",
    phone: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      const requestData = {
        name: formData.name,
        username: formData.id, // ✅ id → username으로 매핑
        password: formData.password,
        nickname: formData.nickname,
        phone: formData.phone
      };

      const response = await axios.post(`${process.env.REACT_APP_API}/register`, requestData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("회원가입 성공:", response.data);
      setFormData({ name: "", id: "", password: "", nickname: "", phone: "" });
      setErrorMessage("");
      navigate("/join");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setErrorMessage("회원가입 실패. 다시 시도해 주세요.");
    }
  };

  return (
    <S.SignUpContainer>
      <S.TopBox />
      <S.InnerDiv>
        <S.Header>
          <Link to="/Join" style={{ textDecoration: "none" }}>
            <S.BackButton>
              <img src={backButton} alt="BackButton" />
            </S.BackButton>
          </Link>
          <S.Title>회원가입</S.Title>
        </S.Header>
        <S.Form onSubmit={handleSubmit}>
          <S.InputField>
            <label htmlFor="name">이름<S.Required>*</S.Required></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </S.InputField>
          <S.InputField>
            <label htmlFor="id">아이디<S.Required>*</S.Required></label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </S.InputField>
          <S.InputField>
            <label htmlFor="password">비밀번호<S.Required>*</S.Required></label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="숫자, 영문 조합 최소 8자"
              required
            />
          </S.InputField>
          <S.InputField>
            <label htmlFor="nickname">닉네임<S.Required>*</S.Required></label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력하세요"
              required
            />
          </S.InputField>
          <S.InputField>
            <label htmlFor="phone" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              전화번호<S.Required>*</S.Required>
              <span style={{ fontSize: "12px", color: "#888" }}>
                (010-0000-0000 형식으로 입력해주세요)
              </span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="전화번호를 입력하세요"
              required
            />
          </S.InputField>

          <S.ButtonContainer>
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
            <S.SubmitButton type="submit">회원가입하기</S.SubmitButton>
          </S.ButtonContainer>
        </S.Form>
      </S.InnerDiv>
    </S.SignUpContainer>
  );
}

export default SignUp;
