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
  padding-left: 5px;
  padding-top:5px;
  padding-bottom:5px;
  margin:0;
`;

export const dateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  padding-left: 10px;

  img {
    width: 25px;
    height: auto;
    vertical-align: middle;
    display: flex;
  }
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
  width: 80%;
  max-width: 700px;
  aspect-ratio: 1 / 1.1;
  background: #fff;
  border: 1px solid #CE9694;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  border-radius: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end; /* 오른쪽 정렬 */
  width: 80%; /* Board와 동일한 너비 적용 */
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
export const FinishButton = styled.button`
  margin-top: 20px; 
  padding: 10px 20px;
  background-color: #AD8574;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;


export const BottomSheet = styled.div`
  position: fixed;
  bottom: 70px; /* 바텀시트가 화면의 아래쪽에 고정되도록 */
  width: 100%;
  height: 50%;  /* 높이는 50%로 고정 */
  background-color: #FBEEED;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.2);
  //overflow-y: auto; 
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;  /* 탭 헤더 바로 위에 위치시킴 */
  background: none;
  border: none;
  font-size: 13px;
  color: #CE9694;
  font-weight: bold;
  cursor: pointer;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 20px; /* 탭 위에 여백을 주어 닫기 버튼 아래에 위치하도록 */
  padding-bottom: 0px
`;

export const TabButton = styled.button`
  padding: 10px 10px;
  //margin: 10px 2px;
  margin-top:10px;
  background-color: #FBEEED;
  color: black;
  font-size: 13px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  overflow-y: auto;
  width: 100%;  /* 100%로 설정해 가로 스크롤을 방지 */
  //height: 100%;
  height: calc(100% - 90px);
  padding-top: 10px;
  padding-bottom: 30px;
  background-color: #fff;
  z-index: 1003;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4개의 열로 구성 */
  gap: 10px;
  width: 100%;  /* 전체 너비에 맞게 */
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 10px;
  max-width: 100%;  /* 이미지 셀 크기가 부모 컨테이너에 맞도록 제한 */
  aspect-ratio: 1; /* 정사각형 유지 */
  overflow: hidden; /* 이미지가 셀 크기를 넘어가지 않도록 함 */

  
  img {
    width: 100%;  /* 이미지가 셀의 너비에 맞게 조정 */
    max-width: 100%;  /* 화면에 맞게 이미지 크기 자동 조정 */
    height: auto;  /* 비율 유지 */
    object-fit: cover;  /* 이미지가 비율을 유지하면서 셀에 꽉 차도록 */
  }
`;

