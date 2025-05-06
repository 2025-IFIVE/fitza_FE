import styled from "styled-components";
import { Link } from 'react-router-dom';  // 이 코드가 있어야 합니다!

/* 전체 배경 */
export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh; /* 최소 높이를 뷰포트 전체로 설정 */
  background-color: #ffffff; /* 배경색 */
  padding-top: 30px; /* 탑바 높이만큼 여백 */
  padding-bottom: 60px; /* 푸터 높이만큼 여백 */
  overflow-x: hidden; /*옆에 여백 숭기기*/
`;

/* 탑바를 감싸는 박스 */
export const TopBox = styled.div`
  width: 100%;
  height: 30px; /* 탑바 높이 */
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

export const TitleBox1 = styled.div`
  
  background-color: rgba(206, 150, 148, 0.25); /* #CE9694 */
  width: 100%;
  padding: 0.1px;
  display: flex;
  justify-content: space-between;
  //align-items: center; /* 세로 중앙 정렬 */

`;

export const Title1 = styled.div`
  font-family: 'NanumSquareNeo';
  color: #000; /* 검은색 */
  font-size: 15px;
  padding-left: 10px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const Register = styled.div`
  font-family: 'NanumSquareNeo';
  color: #000; /* 검은색 */
  font-size: 15px;
  padding-left: 10px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const RegisterContainer = styled.div`
  display: flex;
  align-items: center; /*세로중앙정렬*/
  gap: 3px;
  padding-right: 10px;

  img {
    width: 20px; /* 크기 고정 */
    height: auto; /* 비율 유지 */
    vertical-align: middle; /* 텍스트와 같은 높이로 정렬 */
    display: flex;
  }
`;

export const Back = styled.div`
  position: absolute; 
  left: 10px; /* Logo를 왼쪽으로 배치 */
    img {
    width: 20px;  /* 원하는 너비 */
    height: 20px; /* 원하는 높이 */
    object-fit: contain; /* 이미지 비율을 유지하면서 크기 맞추기 */
  }
`;

/* =====================================================================
========================================================================

                             친구 목록 스타일 

========================================================================
======================================================================*/


export const AddFnd = styled.div`

`;

// 검색을 감싸는 박스
export const Search = styled.div`
    padding: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: rgba(206, 150, 148, 0.25);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 친구 검색창
export const SearchInput = styled.input`
    width: 100%;
    max-width: 300px;
    padding: 5px;
    border: 0px solid #ccc;
    border-radius: 50px;
    outline: none;
    font-size: 12px;
    text-align: center;
`;

//이미지 감싸는 박스
export const Find = styled.div`

`;



// 친구 목록 박스
// 친구 아이템을 Link 스타일로 변경
export const LargeText = styled.div`
  font-family: 'NanumSquareNeo';
  font-size: 17px;
  padding: 20px 10px; /* 위아래 20px, 좌우 10px */
  display: flex;
  align-items: center;     /* 세로 가운데 정렬 */
  justify-content: center; /* 가로 가운데 정렬 */
  width: 100%;
  height: auto; /* 높이는 내용에 따라 자동 조정 */

  & > div {
    text-align: center;
    width: 100%;
  }
`;

export const SmallText = styled.div`
  font-family: 'NanumSquareNeo';
  font-size: 12px;
  padding-left: 10px;
  display: flex;
  align-items: center;       /* 세로 가운데 정렬 */
  justify-content: center;   /* 가로 가운데 정렬 */
  width: 100%;
  height: 30px;

  & > div {
    padding-left: 20px;
    text-align: center;      /* 텍스트 중앙 정렬 */
    width: 100%;
  }
`;


export const Camera = styled.div`
  font-family: 'NanumSquareNeo';
  font-size: 12px;
  padding-left: 10px;
  display: flex;
  align-items: center;       /* 세로 가운데 정렬 */
  justify-content: center;   /* 가로 가운데 정렬 */
  width: 100%;
  height: 30px;

  & > div {
    padding-left: 20px;
    text-align: center;      /* 텍스트 중앙 정렬 */
    width: 100%;
  }
`;

export const ProfileImagePreview = styled.div`


  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* 이미지 전체 보이기 */
  }
`;

export const AnalyzeButton = styled.button`
  font-family: 'NanumSquareNeo';
  font-size: 10px;
  margin-top: 0px;
  padding: 12px 24px;
  background-color: #AD8574;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:enabled {
    background-color: #916b5d;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

