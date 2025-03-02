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

export const Title= styled.div`
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
  color: #000; /* 검은색 */
  font-size: 15px;
  padding-left: 15px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const Register = styled.div`
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

export const CalendarWrapper = styled.div`
  width: 100%;
  //height: 100%;
  margin: 10px;
  //height: calc(100vh - 200px); /* 상단과 하단 공간을 제외한 나머지 공간을 차지 */
  display: flex;
  justify-content: center;
  align-items: center;

  .react-calendar {
    width: 100%;
    max-width: 800px;
  }

   /* 날짜 칸 크기 조정 */
  .react-calendar__tile {
    aspect-ratio: 1 / 1.7;
    display: flex;
    flex-direction:column;
    //justify-content: center;
    align-items: center;
    font-size: 0.7rem;  /* 글자 크기 조정 */
    padding-top: 2px;
    //color: black; //이거 없애면 파란색,빨간색
  }  
  /* 선택된 날짜에 대한 스타일 */
  .react-calendar__tile--active {
    //background-color: #F3D3D1;
    color: black;
  }

  /* 오늘 날짜에 대한 스타일 */
  .react-calendar__tile--now {
    background-color: #F3D3D1;
    color: black;

  }
    /* 날짜 클릭 시 hover 효과 */
  .react-calendar__tile:hover {
    background-color: #F2F2F2;
  }
  
  .react-calendar__navigation__label {
    color:black;
    font-size: 1.0rem;
  }

  /* 잘리는 날짜 색상 변경 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #ccc !important; /* 연한 회색 */
  }

  /* 토요일 */
  .react-calendar__month-view__days__day:nth-child(7n + 6) {
    color: black;
  }
  /* 일요일 */
  .react-calendar__month-view__days__day:nth-child(7n) {
    color: black;
  }
  /* 월~금 (검정색 또는 원하는 색상) */
  .react-calendar__month-view__days__day:not(:nth-child(7n)):not(:nth-child(7n+6)) {
    color: black; /* 원하는 색으로 변경 가능 */
  }


`;

export const TileImage = styled.img`
  width: 100%;
  height: 90%;
  margin-top: 0px;
  object-fit: cover;
`;



export const OftenTitle = styled.div`
  font-size: 14px;
  //font-weight: bold;
  color: #000;
  margin-top: 15px;
  margin-bottom:5px;
  padding-left: 20px;
  //text-align: left; //왼쪽 정렬 
  width: 100%;
`;

export const OftenContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  //align-items: center;
  padding: 5px 0;
  //background-color: rgba(206, 150, 148, 0.15); /* 옅은 배경 */
`;

export const OftenItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 30%; /* 각 아이템의 크기 */
`;

export const OftenCateg = styled.div`
  font-size: 14px;
  color: #000;
  margin-bottom: 5px;
  text-align: left; /* 왼쪽 정렬 */
  width: 90%; /* 부모 요소의 전체 너비를 차지하여 왼쪽 정렬 유지 */
`;

export const OftenImage = styled.div`
  width: 90%;  /* 이미지 크기 조절 */
  aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
  object-fit: cover;
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #F2F2F2;
`;

export const OftenCount = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
  width: 90%;
  text-align: right;
`;

export const LoadingText = styled.div`
  font-size: 14px;
  color: #999;
  text-align: center;
  width: 100%;
  padding: 20px;
`;
