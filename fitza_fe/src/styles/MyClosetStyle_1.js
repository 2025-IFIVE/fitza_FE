import styled from "styled-components";
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

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
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

export const Container2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position:relative;
  justify-content: space-between;
  margin-top:1.5%;
`;

export const Header_ = styled.div`
  width: 100%;
  justify-content: center; /* Title을 가운데 정렬 */
  align-items: center;
  position: relative; /* Logo의 위치를 조정하기 위해 필요 */
`;

export const Logo = styled.h1`
  /* Logo를 절대 위치로 설정 */
  position:absolute;
  left: 10px; /* Logo를 왼쪽으로 배치 */
  font-size: 24px;
  font-weight: bold;
  color: black;
`;


export const Title = styled.h2`
  font-size: 18px;
  color: black;
  margin:auto;
`;

export const WeatherSection = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: center;
`;

export const CategorySection = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  background-color: #fff0f0;
  border-radius: 12px;
  padding: 15px;
`;

export const CategoryItem = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0e0e0;
  }
`;

export const RecentCoordiSection = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;

export const CoordiCard = styled.div`
  display: inline-block;
  width: 100px;
  margin: 10px;
  img {
    width: 100%;
    border-radius: 8px;
  }
  p {
    font-size: 14px;
  }
`;

export const Hr = styled.hr`
  width:100%;
  margin-top:2%;
  color:#0000004f;
`;

