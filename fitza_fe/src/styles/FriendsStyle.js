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
  overflow-x: auto; /*옆에 여백 숭기기*/
  justify-content: center; /* 수직 중앙 정렬 */
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
  flex-grow: 1; /* 남은 공간을 차지 */
  background-color: rgba(173, 133, 116, 0.7);
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
  background-color:rgb(255, 255, 255);
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

export const Title = styled.div`
  font-family: 'NanumSquareNeo';
  position: relative; 
  font-size: 17px;
  color: black;
  padding-top: 20px;
  padding-bottom: 20px; 
`;

/* 콘텐츠 박스 */
export const ContentBox = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box; /* 수정 */
  
`;
//점선 박스
export const DashandBox = styled.div`
  font-family: 'NanumSquareNeo';
  width: 100%;
  padding: 5px;
  margin: 10px auto;
  box-sizing: border-box;
  outline: 2px dashed rgb(255, 255, 255); /* 외부 테두리 스타일 */
  display: flex;
  flex-direction: column; /* 세로로 쌓이게 설정 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
`;

//회색 배경 박스
export const GrayBox = styled.div`
  font-family: 'NanumSquareNeo';
  width: 100%;
  padding: 5px;
  margin: 0px;
  box-sizing: border-box;
  background-color: rgb(230, 230, 230);
  display: flex;
  flex-direction: column; /* 세로로 쌓이게 설정 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
`;

//방문자수랑 친구 찾기 버튼 감싸는 박스 
export const TopBox2 = styled.div`
  display: inline-flex;  /* 인라인 형태로 설정 */
  align-items: center;   /* 수직 중앙 정렬 */
  justify-content: space-between; /* 좌우로 공간 분배 */
  width: 100%; /* TopBox2가 전체 너비를 차지하도록 설정 */
`;

//방문자수
export const TodayTotal = styled.div`
  margin-left: 10px;
  text-align: left;
  font-size: 11px;
`;

//친구 찾는 링크
export const FriendLink = styled(Link)`
  display: inline;  /* 이미지 크기만큼 공간 차지 */
`;

//친구 찾기
export const Friends = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  img {
    width: 40px;  /* 원하는 너비 */
    height: 40px; /* 원하는 높이 */
    object-fit: contain; /* 이미지 비율을 유지하면서 크기 맞추기 */
  }
`;

// 하얀색 칸 (프로필 전체 컨테이너)
export const WhiteBox = styled.div`
  display: flex; /* 가로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  font-family: 'NanumSquareNeo';
  width: 100%;
  padding: 5px;
  margin: 2px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
`;

// 프로필 이미지 박스
export const ProfImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* 프사 크기 지정 */
  height: 100px; /* 프사 크기 지정 */
  border-radius: 20px; //카드창에서 보이는 사각형 (모달창 사각형 아님)
  background-color: rgb(230, 230, 230); /* 테스트용 배경색 */
  margin-right: 10px; /* 프로필 텍스트와 간격 */

    img {
    width: 100%;  /* 이미지 크기를 부모 div에 맞추기 */
    height: 100%;  /* 이미지 크기를 부모 div에 맞추기 */
    object-fit: cover;  /* 비율을 유지하면서 영역에 맞게 잘리도록 */
    border-radius: 20px;  
  }
    /* 텍스트 스타일 */
  .no-image-text {
    font-size: 12px;  /* 글씨 크기 줄이기 */
    color: gray;  /* 텍스트 색상 지정 */
    text-align: center;  /* 텍스트 중앙 정렬 */
  }
`;

// 프로필 텍스트 박스
export const ProfTxt = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  font-family: 'NanumSquareNeo';
  flex-grow: 1; /* 남은 공간 차지 */
  padding: 5px;
  margin: 2px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
`;

// 이름, 아이콘 감싸는 박스
export const NameBox = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 8px; /* 요소들 사이 여백 추가 */
`;


// 이름 텍스트 효과
export const Name = styled.div`
  font-size: 18px;
  font-weight: bold; /* 두껍게 */
  color: #5D4037; /* 갈색 */
  padding: 1px 0; /* 위 아래 패딩 1px */
`;

// 다운로드 아이콘
export const Down = styled.div`
  width: 20px;  /* 원하는 너비 */
  height: 20px; /* 원하는 높이 */
  object-fit: contain; /* 이미지 비율을 유지하면서 크기 맞추기 */
  margin: 0px 5px;
  position: relative; //이미지가 조금 떠있어서 아래로 내리기 위해해
  top: 3px; //relative 와 top 적용
`;
// 편집 아이콘
export const Edit = styled.div`
  width: 20px;  /* 원하는 너비 */
  height: 20px; /* 원하는 높이 */
  object-fit: contain; /* 이미지 비율을 유지하면서 크기 맞추기 */
  margin: 0px 5px;
  position: relative; //이미지가 조금 떠있어서 아래로 내리기 위해해
  top: 3px; //relative 와 top 적용
`;

// 소개 텍스트 효과
export const Intro = styled.div`
  font-size: 13px;
  color: #5D4037; /* 갈색 */
  padding: 5px 0px; /* 위 아래 패딩 1px */
  margin: 10px 0px;
`;

// 태그 박스
export const Tag = styled.div`
  display: flex; /* 가로로 정렬 */
  flex-wrap: wrap; /* 태그들이 넘치면 줄바꿈 */
  gap: 5px; /* 태그 사이 간격 */
`;

// 태그 요소
export const TagItem = styled.div`
  font-size: 13px;
  padding: 3px 7px;
  border: 1.2px solid rgb(96, 96, 96); /* 테두리 갈색 */
  background-color:rgb(255, 243, 243); /* 배경 핑크 */
  border-radius: 50px; /* 모서리 둥글게 */
`;


/* ================================================================
===================================================================

                   오늘의 코디 페이지 

===================================================================
=================================================================*/
// 하얀색 칸2 (프로필 코디 전체 컨테이너)
export const WhiteBox2 = styled.div`
  display: flex;  /* Flexbox 사용 */
  flex-direction: column;  /* 세로로 정렬 */
  align-items: center;  /* 수평 중앙 정렬 */
  font-family: 'NanumSquareNeo';
  width: 100%;
  padding: 10px;
  margin: 2px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
`;


//오늘의 코디, 코디 목록을 감싸는 박스 
export const ToggleBox = styled.div`
    font-family: 'NanumSquareNeo';
    display: flex;  /* Flexbox 사용 */
    justify-content: center;  /* 좌우 중앙 정렬 */
    align-items: center;  /* 세로 중앙 정렬 */
    width: 100%;  /* 전체 가로 공간을 차지하도록 설정 */
    padding-bottom: 10px;
`;

//토글 버튼 스타일 
export const ToggleButton = styled.div`
    font-family: 'NanumSquareNeo';
    font-size: 12px;  /* 숫자 값으로 설정 */
    color: rgba(93, 64, 55, 1);  /* 글씨 색깔 설정 */
    text-align: center;  /* 중앙 정렬 */
    cursor: pointer;  /* 클릭 가능한 느낌 */
    margin: 5px;  /* 버튼들 간의 간격 */

    /* isActive prop을 사용해 클릭 시 스타일 변경 */
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};  /* 글씨체 두꺼워짐 */
`;

//오늘의 코디, 코디 목록 요소들 정렬하는 박스
export const ContentBox2 = styled.div`
    font-family: 'NanumSquareNeo';

`;

export const RecentOutfit = styled.div`
    font-family: 'NanumSquareNeo';
`;

export const OutfitList = styled.div`
    font-family: 'NanumSquareNeo';
`;





/* ================================================================
===================================================================

                   코디 목록 보기 페이지 

===================================================================
=================================================================*/
