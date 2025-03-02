import styled from "styled-components";
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기

/* 전체 배경 */
export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh; /* 최소 높이를 뷰포트 전체로 설정 */
  background-color: #ffffff; /* 배경색 */
  padding-top: 60px; /* 탑바 높이만큼 여백 */
  padding-bottom: 60px; /* 푸터 높이만큼 여백 */
  overflow-x: hidden; /*옆에 여백 숭기기*/
`;

/* 탑바를 감싸는 박스 */
export const TopBox = styled.div`
  width: 100%;
  height: 60px; /* 탑바 높이 */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color:#AD8574; /* 푸터와 같은 색 */
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
`;

export const Header = styled.div`
  width: 100%; 
  display:flex;
  align-items: center;
  justify-content: center; /* Header 전체를 가로로 중앙 정렬 */
`;

export const Logo = styled.div`
  position: absolute; 
  left: 10px; /* Logo를 왼쪽으로 배치 */
  font-size: 33px;
  color: black;
`;

export const Title = styled.div`
font-family: 'NanumSquareNeo';
  position: relative; 
  font-size: 17px;
  color: black;
  padding-top: 20px;
  padding-bottom: 20px; 
`;


/* 각 메뉴 버튼*/
export const ClickBox = styled.div`
    background-color: rgba(255, 255, 255, 0.25); /* #CE9694 */
    width: 100%;
    padding: 0.1px;
    display: flex;
    flex-direction: column; /* 아래에서 위로 쌓이도록 */
    align-items: flex-start; /* 왼쪽 정렬 */
  `;

export const Click = styled(Link)`
  color: #000; /* 검은색 */
  font-family: 'NanumSquareNeo';
  font-size: 15px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0;
  text-decoration: none; /* 기본 링크 스타일 제거 */
  cursor: pointer;
  display: flex; /* flexbox로 변경 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: flex-start; /* 수평 정렬 (이미지가 왼쪽 정렬되도록) */
  width: 100%; /* 전체 너비 차지 */
  height: 50px; /* 적절한 높이 지정 */
  border-bottom: 1px solid rgba(200, 200, 200, 0.5); /* 칸 밑에 선 추가 */

  /* 마우스 올렸을 때 색상 변경 */
  &:hover {
    color: rgb(255, 255, 255); /* 원하는 색상으로 변경 */
    background-color: rgba(206, 150, 148, 0.5); /* 배경색도 추가 가능 */
  }
  img {
    margin-right: 10px; /* 이미지와 텍스트 사이에 여백 */
  }
`;

/* 체형 정보 박스스*/
export const BodytypeBox = styled.div`
    background-color: rgba(255, 255, 255, 0.25); /* #CE9694 */
    width: 70%;
    padding: 1px;
    display: flex;
    flex-direction: row; /* 왼쪽에서 오른쪽으로 쌓이도록 */
    align-items: flex-start; /* 왼쪽 정렬 */
    border: 3.2px solid rgba(206, 150, 148); /* 테두리 색깔 추가 */
    border-radius: 10px; /* 테두리 반지름 추가 */
`;

export const BodytypeImage = styled.div`
    width: 30%;
    height: auto; /* 높이는 자동으로 조정 */
    padding: 10px;
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: flex-start; /* 왼쪽 정렬 */
    aspect-ratio: 1 / 2; /* 1:2 비율 유지 */
    object-fit: cover; /* 이미지가 비율에 맞게 잘리거나 확대됨 */
`;
export const BodytypeText = styled.div`
  font-family: 'NanumSquareNeo';
  padding: 10px;
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 100%; /* 부모 컨테이너 너비에 맞게 */
  
  /* 자식 요소가 한 행씩 차지하도록 block처럼 만듬 */
  & > * {
    display: block; 
    margin-bottom: 5px; /* 각 행 간 간격 조정 */
  }
`;
