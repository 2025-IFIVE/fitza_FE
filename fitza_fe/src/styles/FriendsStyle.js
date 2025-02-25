import styled from "styled-components";

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

/* =====================================================================
========================================================================

                             친구 목록 스타일 

========================================================================
======================================================================*/


export const AddFnd = styled.div`

`;
export const Search = styled.div`

`;
export const FriendList = styled.div`

`;


export const FriendItem = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
    a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
    }

    &:hover {
        background-color: #e1e1e1;
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 300px;

    h3 {
        margin-bottom: 15px;
        text-align: center;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 10px;

        &:hover {
            background-color: #45a049;
        }
    }

    button:last-child {
        background-color: #f44336;
        margin-top: 10px;
        &:hover {
            background-color: #e53935;
        }
    }
`;
