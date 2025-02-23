import styled from "styled-components";

/* 전체 배경 */
export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh; /* 최소 높이를 뷰포트 전체로 설정 */
  background-color: #f9f9f9; /* 배경색 */
  padding-top: 50px; /* 탑바 높이만큼 여백 */
  padding-bottom: 60px; /* 푸터 높이만큼 여백 */
`;

/* 탑바를 감싸는 박스 */
export const TopBox = styled.div`
  width: 100%;
  height: 50px; /* 탑바 높이 */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #AD8574; /* 푸터와 같은 색 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

/* 푸터를 감싸는 박스 */
export const BottomBox = styled.div`
  width: 100%;
  height: 60px; /* 푸터 높이 */
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: #AD8574; /* 탑바와 같은 색 */
  display: flex;
  align-items: center;
  justify-content: space-around; /* 아이콘을 균등 배치 */
  padding: 0 10px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

export const Header_ = styled.div`
  width: 100%;
`;

export const Logo = styled.h1`
  position: relative; /* Logo를 절대 위치로 설정 */
  left: 10px; /* Logo를 왼쪽으로 배치 */
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

export const Hr = styled.hr`
  width:100%;
  margin-top:2%;
  color:#0000004f;
`;
