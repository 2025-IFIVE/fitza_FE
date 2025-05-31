import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 60px;
  overflow-x: hidden;
`;

export const TopBox = styled.div`
  width: 100%;
  height: 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color:#AD8574;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export const BottomBox = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: #AD8574;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  justify-content: center;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: auto;
  }
`;

export const Title = styled.div`
  position: relative; 
  font-size: 17px;
  color: black;
  padding-top: 20px;
  padding-bottom: 20px; 
`;

export const TitleBox1 = styled.div`
  background-color: rgba(206, 150, 148, 0.25);
  width: 100%;
  padding: 0.1px;
  display: flex;
  justify-content: space-between;
`;

export const Title1 = styled.div`
  color: #000;
  font-size: 15px;
  padding-left: 15px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const Register = styled.div`
  color: #000;
  font-size: 15px;
  padding-left: 10px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
  padding-right: 10px;

  img {
    width: 24px;
    height: auto;
    vertical-align: middle;
    display: flex;
  }
`;

export const CoordiName = styled.div`
  width: 50%;
  max-width: 500px;
  margin-top: 15px;
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid #CE9694;
  text-align: center;
  background-color: #ffffff;
  box-sizing: border-box;
  color: black;
`;


export const Board = styled.div`
  width: 85%;
  max-width: 500px;
  aspect-ratio: 1 / 1.1;
  background: #fff;
  border: 1px solid #CE9694;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  border-radius: 20px;
  flex-wrap: wrap; /* 추가: 줄 바꿈 허용 */
  gap: 10px; /* 섹션 간 간격을 조정 */
`;

export const EditButton = styled.button`
  margin-top: 20px; 
  padding: 10px 20px;
  background-color: #AD8574;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const Section = styled.div`
  width: 30%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

export const ImagePlaceholder = styled.p`
  font-size: 14px;
  color: #bbb;
  text-align: center;
  margin: 0;
  padding: 5px;
`;

export const RandomBoard = styled.div`
   position: relative;
  width: 85%;
  max-width: 500px;
  aspect-ratio: 1 / 1.1;
  background: #fff;
  border: 1px solid #CE9694;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

export const RandomItem = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  //transform: rotate(${(props) => props.$rotate || "0deg"});
  z-index: 1;
  transition: all 0.1s ease;
`;



