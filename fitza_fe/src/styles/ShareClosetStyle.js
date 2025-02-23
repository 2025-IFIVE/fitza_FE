import styled from "styled-components";
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기

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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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

/* 헤더 부분분 */
export const Header = styled.div`
  width: 100%; 
  display: flex;
  align-items: center; // 세로 가운데 정렬
`;
//이전 버튼
export const Back = styled.div`
  position: relative;
  left: 10px; /* 이전 버튼을 왼쪽으로 배치 */
  padding-top: 10px; 
  padding-bottom: 10px;
  margin: 0;
  
  img {
    width:20px;  /* 너비 설정 */
    height: 20px; /* 높이 설정 */
  }
`;

export const Title = styled.div`
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
