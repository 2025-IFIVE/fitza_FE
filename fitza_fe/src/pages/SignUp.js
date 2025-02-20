import React, { useState } from "react";
import * as S from "../styles/SignUpStyle";
import { Link } from 'react-router-dom';
import backButton from '../img/backButton.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    nickname: "",
    phone: ""
  });

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate=useNavigate(); // 페이지 이동을 위한 useNavigate 사용
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("회원가입 성공:", response.data);
      setFormData({ name: "", id: "", password: "", nickname: "", phone: "" }); // 입력 필드 초기화
      navigate("/join");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setErrorMessage("회원가입 실패. 다시 시도해 주세요."); // 에러 메시지 설정
    }
    finally {
      console.log("요청이 완료되었습니다."); // finally 블록 추가
    }
  
    console.log(formData);
  };

  return (
    <S.BackgroundWrapper>
      <S.SignUpContainer>
      <S.TopBox />
        <S.InnerDiv>
          <S.Header>
            <Link to="/Join" style={{ textDecoration: 'none' }}>
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
                placeholder="이름을 입력하세요" // 힌트 추가
                required
              />
            </S.InputField>
            <S.InputField>
              <label htmlFor="id">아이디<S.Required>*</S.Required></label>
              <input
                type="text"
                name="id"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="아이디를 입력하세요" 
                required
              />
            </S.InputField>
            <S.InputField>
              <label htmlFor="password">비밀번호<S.Required>*</S.Required></label>
              <input
                type={showPassword ? "text" : "password"} // 비밀번호 보이기 토글
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
              <label htmlFor="phone">전화번호<S.Required>*</S.Required></label>
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
              {errorMessage && (
                <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
              )}
              <S.SubmitButton type="submit">회원가입하기</S.SubmitButton>
            </S.ButtonContainer>
          </S.Form>
        </S.InnerDiv>
      </S.SignUpContainer>
    </S.BackgroundWrapper>
  );
}

export default SignUp;
