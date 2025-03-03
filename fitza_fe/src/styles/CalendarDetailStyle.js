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

export const Title= styled.div`
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
  gap: 3px;
  padding-right: 10px;

  img {
    width: 20px;
    height: auto;
    vertical-align: middle;
    display: flex;
  }
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
  margin-top: 30px;
  border-radius: 20px;
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