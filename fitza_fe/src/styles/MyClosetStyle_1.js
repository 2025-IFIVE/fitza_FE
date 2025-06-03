import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding-top: 50px;
  padding-bottom: 60px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding: 15px;
`;

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

export const Container2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position:relative;
  justify-content: space-between;
  //margin-top:1.5%;
`;

export const Header_ = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Logo = styled.h1`
  position:absolute;
  left: 10px;
  font-size: 33px;
  color: black;
  font-weight: normal;
`;

export const Title = styled.h2`
  font-size: 18px;
  color: black;
  margin:auto;
`;

export const WeatherandDailyCodi = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const WeatherContainer = styled.div`
  padding-right: 20px;
  width: 100%;

  @media (max-width: 400px) {
    width: 70%;
    padding-right: 190px;
  }
`;

export const WeatherSection1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  text-align: center;
`;

export const WeatherSection2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px;
  border-radius: 12px;
  background-color: #f0f0f0;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.22);
  width: fit-content;
  min-width: 115px;
  text-align: center;
  flex-direction: column;
  margin-top: 20px;
`;

export const WeatherTitle = styled.p`
  font-size: 18px;
  font-weight: normal;
`;

export const WeatherTemp = styled.p`
  font-size: 13px;
  font-weight: normal;
`;

export const TempValue = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const WeatherDesc = styled.p`
  font-size: 14px;
  color: #555;
`;

export const WeatherDetails = styled.p`
  font-size: 12px;
  color: #777;
`;

export const WeatherIcon = styled.img`
  width: 23px;
  height: 23px;
`;

export const DailyCodiSection = styled.div`
  width: 85%;
  max-width: 400px;
  margin-top: 20px;
  margin-right: 35px;
  background-color: #fff;
  border-radius: 25px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #CE9694;
`;

export const DailyCodiTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

export const DailyCodiLook = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);  // 2열 고정
gap: 10px;
justify-items: center;
align-items: center;
padding: 10px;
box-sizing: border-box;
max-height: 220px;        // ✅ 박스 안 넘치게 제한
overflow: hidden;
  img {
    max-width: 100%;
    max-height: 90%;
    border-radius: 10px;
  }
`;


export const CategorySection = styled.div`
  width: 85%;
  max-width: 400px;
  margin-top: 20px;
  background-color: #fff0f0;
  border-radius: 25px;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 400px) {
    width: 85%;
    padding-right: 10px;
  }
`;

export const CategoryTitle = styled.div`
  font-size: 20px;
  font-weight: 550;
  margin:5px 8px;
  border-bottom: 1.2px solid #ccc;
  padding-bottom: 10px;
`;

export const CategoryItem = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #fff0f0;
  }
`;

export const RecentCoordiSection = styled.div`
  width: 100%;
  margin-top: 40px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 15px;
  margin-bottom: 80px;

  @media (max-width: 400px) {
    width: 80%;
    margin-bottom: 100px;
  }
`;

export const CoordiTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 100%; /* 부모 요소와 동일한 너비 */
  max-width: 400px; /* CoordiCardWrapper와 동일한 최대 너비 설정 */
  text-align: left; /* 왼쪽 정렬 */
`;

export const CoordiCardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  max-width: 460px;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-top: 20px;
  flex-wrap: nowrap;
  
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CoordiCardWrapperItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 450px;

  p {
    width: 70%;
    text-align: left;
    font-size: 12px;
    color: #333;
  }
`;

export const CoordiCard = styled.div`
  margin: 10px;
  text-align: center;
  height: 120px;
  width: 100px;
  max-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 25px;
  padding: 10px;
  overflow: visible; /* ✅ 이미지가 밖으로 튀지 않게 */
  position: relative; /* ✅ 겹칠 기준이 되는 위치 기준 */

  ::-webkit-scrollbar {
    display: none;
  }

  img {
    position: absolute;           /* ✅ 겹쳐지도록 */
    top: 50%;                     /* 기본값 설정 (없으면 중심에서 어긋날 수 있음) */
    left: 50%;
    max-width: 100%;
    max-height: 100%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
    object-fit: contain;
    pointer-events: none;         /* 클릭 방지 */
    border-radius: 8px;
  }
`;


export const Coordidate = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: #333;
`;

export const CoordiImageLink = styled.a`
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

export const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid #d0d0d0;
  margin-top: 20px;
`;
