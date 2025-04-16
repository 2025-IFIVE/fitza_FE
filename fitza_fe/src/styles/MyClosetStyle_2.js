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
  height: 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #AD8574;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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

export const BackButton = styled.div`
  position: absolute; 
  left: 10px;
  color: black;
  width: 35px;  // 원하는 크기 설정
  height: 35px; // 원하는 크기 설정
  
  img {
    width: 100%;  // 이미지가 div를 꽉 채우게끔
    height: 100%; // 이미지 크기를 div 크기에 맞게 설정
  }
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
  padding-left: 10px;
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

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* 반응형 */
  gap: 25px;
  width: 100%;
  max-width: 900px;
  margin: 50px;

  @media (min-width: 700px) {
    grid-template-columns: repeat(4, 1fr); /* 웹에서는 4개 */
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr); /* 작은 화면에서는 3개 */
    max-width: 400px;
    gap:15px;
  }
`;

export const Box = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 유지 */
  position: relative;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
`;

export const BoxImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 90%;
  object-fit: contain; /* 이미지 잘리지 않고 전부 보이게 */
  transform: translate(-50%, -50%);
`;


