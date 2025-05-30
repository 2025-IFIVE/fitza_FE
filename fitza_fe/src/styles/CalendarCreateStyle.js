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
  z-index: 9999 !important;
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

export const CoordiNameInput = styled.input`
  width: 50%;
  max-width: 500px;
  margin-top: 15px;
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 15px;
  //border: 1px solid #CE9694;
  border: none;
  border-bottom: 1px solid #CE9694; /* 아래쪽 테두리만 적용 */
  border-radius: 0px;
  outline: none;
  text-align: center;
  background-color: #ffffff;
  box-sizing: border-box; //paddingborder포함 너비계산
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


export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end; /* 오른쪽 정렬 */
  max-width: 500px;
  width: 85%; /* Board와 동일한 너비 적용 */
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

export const RandomItem = styled.div`
  position: absolute;
  width: 120px;
  height: 160px;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  //transform: rotate(${(props) => props.$rotate});
  transition: all 0.1s ease;
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
  /*display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;*/
  gap: 10px;
  margin-top: 15px;
`;