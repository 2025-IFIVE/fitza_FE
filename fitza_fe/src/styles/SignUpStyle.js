import styled from "styled-components";

// 화면 바깥 배경색을 위한 글로벌 스타일


// 회원가입 페이지 컨테이너 (반응형 적용)
export const SignUpContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

// 내부 div (반응형 적용)
export const InnerDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px; /* TopBox 아래로 내용 배치 */

  @media (max-width: 768px) {
    height: 100%;
  }
`;

// 갈색 상단 바 스타일 (비어 있음)
export const TopBox = styled.div`
  position: absolute;
  height: 80px;
  width: 100%;
  left: 0;
  top: 0;
  background-color: #A47864;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 요소들을 양 끝으로 정렬 */
  padding: 0 20px;
`;

export const Header = styled.div`
  position: absolute;
  height: 120px;
  width: 100%;
  left: 0;
  top: 0;
  background-color: #white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  position: relative;
`;

// 뒤로가기 버튼 스타일 추가
export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-right:350px;
  img {
    width: 20px;
    height: 20px;
  }
`;

// 제목 (회원가입) 스타일
export const Title = styled.h2`
  font-size: 18px;
  color: black;
  position: absolute; /* 절대 위치 설정 */
  left: 50%;
  transform: translateX(-50%); /* 정확한 중앙 정렬 */
  margin: 0;
`;

// 입력 필드 스타일
export const InputField = styled.div`
  width: 90%;
  margin-bottom: 32px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

// 필수 항목 표시 스타일
export const Required = styled.span`
  color: #CE9694;
  margin-left: 5px;
`;

// 버튼 컨테이너 스타일
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

// 회원가입 버튼 스타일
export const SubmitButton = styled.button`
  background-color: #A47864;
  color: white;
  font-size: 16px;
  border: none;
  padding: 15px;
  border-radius: 25px;
  cursor: pointer;
  width: 50%;

  &:hover {
    background-color: #A47864;
  }
`;

// 폼 스타일
export const Form = styled.form`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 내부 요소 정렬 */
`;


// 오류 메시지 스타일
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: -10px;
`;
