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

// 돋보기 이미지 스타일
export const FindImg = styled.div`
    width: 20px;  // 원하는 크기로 조절
    height: 20px;
    margin-left: 5px;
    margin-right: 5px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;  // 이미지 비율 유지하면서 축소

    }
`;

// 친구 목록 박스
// 친구 아이템을 Link 스타일로 변경
export const FriendItem = styled(Link)`
  font-family: 'NanumSquareNeo';
  font-size: 12px;
  padding-left: 10px;
  text-decoration: none; /* 기본 링크 스타일 제거 */
  cursor: pointer;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.5);

  /* 마우스 올렸을 때 색상 변경 */
  &:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(206, 150, 148, 0.5);
  }
`;

// 친구 목록
export const FriendList = styled.div`
  background-color: rgba(255, 255, 255, 0.25); /* #CE9694 */
  width: 100%;
  display: flex;
  flex-direction: column; /* 아래에서 위로 쌓이도록 */
  align-items: flex-start; /* 왼쪽 정렬 */
`;







/* =====================================================================
========================================================================

                             친구 추가 모달창

========================================================================
======================================================================*/

// 모달 전체를 감싸는 박스 
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

// 이게 진짜 모달창 
export const ModalContent = styled.div`
    font-family: 'NanumSquareNeo';
    background: white;
    border: 2px solid #AD8574;
    padding: 20px;
    border-radius: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// 텍스트 영역 스타일 (번호 입력)
export const TextareaBox = styled.div`
  display: flex;
  font-family: 'NanumSquareNeo';
  margin-bottom: 15px;

  /* 코멘트 텍스트 스타일 */
  span {
    width: 50px;
    font-size: 14px;  /* 텍스트 크기 조정 */
    margin-right: 10px; /* input과 텍스트 사이의 간격 */
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    display: flex; /* 플렉스 컨테이너로 설정 */
    align-items: center; /* 세로로 가운데 정렬 */
    height: 40px; /* 텍스트 영역의 높이에 맞게 설정 */
  }

  textarea {
    font-family: 'NanumSquareNeo';
    width: 100%;
    padding: 8px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 10px;
    line-height: 18px; /* 텍스트가 가운데 정렬되도록 */
    vertical-align: middle; /* 텍스트가 위로 올라가는 걸 방지 */
    min-height: 30px; /* 최소 높이 설정 */
    height: auto; /* 내용에 따라 자동으로 높이가 조절되도록 설정 */
    resize: vertical; /* 세로 크기만 조절할 수 있게 설정 */
  }
`;
// 친구 추가, 취소 버튼 박스 
export const ButtonBox = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;

// 저장 버튼 
export const SaveButton = styled.button`
    background:rgba(93, 64, 55);
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background:rgba(93, 64, 55, 0.8);
`;

// 취소 버튼 
export const CancelButton = styled.button`
    background:rgba(93, 64, 55);
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background:rgba(93, 64, 55, 0.8);
`;