import styled from "styled-components";

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
`;

export const Logo = styled.div`
  position: relative; 
  left: 10px; /* Logo를 왼쪽으로 배치 */
  font-size: 33px;
  //font-weight: bold;
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;
`;
/*
export const Hr = styled.hr`
  width:100%;
  margin-top:1.5%;
  color:#0000004f;
`;*/

export const TitleBox1 = styled.div`
  background-color: rgba(206, 150, 148, 0.25); /* #CE9694 */
  width: 100%;
  padding: 0.1px;
`;

export const Title1 = styled.div`
  color: #000; /* 검은색 */
  font-size: 15px;
  padding-left: 10px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const ClosetScroll = styled.div`
  display: flex; /*closetItem 가로방향 정렬*/
  overflow-x: auto; /* 가로 스크롤 활성화 */
  scroll-snap-type: x mandatory; /* 부드러운 스크롤(closetItem단위로 움직임) */
  white-space: nowrap; /*줄바꿈 금지*/
  //gap: 10px; /*closetItem 사이 간격*/
  width: 100%; 
  height : 50%;
  padding-top:20px;
  padding-bottom:20px;
  scroll-behavior: smooth; /* 부드러운 스크롤 효과 */
  margin-left: 10px;
  
  &::-webkit-scrollbar {
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: none; /*스크롤바 숨기기*/
  }
`;

export const ClosetItem = styled.div`
  height: 30vh; /* 전체 화면 높이의 30% */
  width: calc(30vh * 2 / 3); /* 높이의 2/3 비율로 너비 설정 */
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 40%;
  scroll-snap-align: start;
  overflow: hidden;
  margin-right: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  flex-shrink: 0;

  img {
    width: 70%;
    height: 70%;
    object-fit: cover;
  }
`;

export const TitleBox2 = styled.div`
  background-color: rgba(206, 150, 148, 0.25); /* #CE9694 */
  width: 100%;
  padding: 0.1px;
`;

export const Title2 = styled.div`
  color: #000; /* 검은색 */
  font-size: 15px;
  padding-left: 10px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;

export const NewsItem = styled.div`
  width: 90%;
  //max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ddd; /* 테두리 추가 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 10px;
`;

export const NewsImage = styled.img`
  width: 40%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
  border: 1px solid #ddd; /* 테두리 추가 */
`;

export const NewsContent = styled.div`
  flex: 1;
  text-align: left;
`;

export const NewsTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

export const NewsDescription = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
`;


