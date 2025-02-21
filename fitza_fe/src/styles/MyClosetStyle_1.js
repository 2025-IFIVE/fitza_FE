import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Header_ = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* Title을 가운데 정렬 */
  align-items: center;
  position: relative; /* Logo의 위치를 조정하기 위해 필요 */
  border-bottom: 1px solid #0000004f; /* 아래에 검은 선 추가 */
`;

export const Logo = styled.h1`
  position: absolute; /* Logo를 절대 위치로 설정 */
  left: 10px; /* Logo를 왼쪽으로 배치 */
  font-size: 24px;
  font-weight: bold;
  color: black;
`;


export const Title = styled.h2`
  font-size: 18px;
  color: black;
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
