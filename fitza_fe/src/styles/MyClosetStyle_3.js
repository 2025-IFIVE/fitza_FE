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
  position: relative;
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

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 500px;

  img {
    max-width: 100%;
    height: 400px;
    object-fit: contain;
  }
`;

export const ImageBox = styled.div`
  width: 95%;
  max-width: 400px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 25px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #CE9694;
  }
`;

export const ImageLine = styled.div`
  width: 95%;
  border-bottom: 1.5px solid #ccc;
  margin-top: 30px;
  margin-bottom: 10px;
  }
`;

export const CordiRec = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 100%; /* 부모 요소와 동일한 너비 */
  max-width: 400px;
  text-align: left; /* 왼쪽 정렬 */
`;

export const RecBoxWrapper = styled.div`
  display: flex; /* RecBox들을 가로로 배치 */
  gap: 40px; /* RecBox들 사이에 간격 추가 */
  width: 100%;
  max-width: 400px;
  margin-top: 20px; /* 상단 여백 */
  position: relative; /* 제목을 절대적으로 배치할 수 있도록 함 */
`;

export const RecBox = styled.div`
  width: 48%; /* 각 RecBox의 너비를 2개가 가로로 배치되도록 설정 */
  padding-top: 48%; /* 1:1 비율 유지 */
  position: relative;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

export const RecBoxTitle = styled.div`
  position: absolute;
  top: -22px; /* 박스 상단에서 10px 떨어지게 */
  left: 5px; /* 박스 왼쪽에서 10px 떨어지게 */
  font-size: 13px; /* 작은 제목 크기 */
  font-weight: normal;
  color: #333; /* 제목 색상 */
  padding: 2px 5px;
  z-index: 10; /* 제목이 다른 요소보다 위에 표시되도록 */
`;

export const RecBoxImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;  /* 이미지 크기 조정 */
  height: auto; /* 이미지 비율 유지 */
`;

export const CategorySection = styled.div`
  width: 85%;
  max-width: 410px;
  margin-top: 70px;
  margin-bottom: 10px;
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
  font-size: 18px;
  font-weight: normal;
  margin:5px 8px;
  border-bottom: 1.2px solid #ccc;
  padding-bottom: 10px;
`;

export const CategoryItem = styled.div`
display: inline-block;
padding: 4px 10px;
margin: 4px;
border-radius: 25px;  /* 둥근 모서리 적용 */
border: ${({ selected }) => (selected ? "1.5px solid black" : "1.5px solid #787575")};
background-color: ${({ selected }) => (selected ? "#EEEAEA" : "white")};
color: ${({ selected }) => (selected ? "black" : "#787575")};
cursor: pointer;
transition: all 0.3s ease;

&:hover {
  background-color: ${({ selected }) => (selected ? "#EEEAEA" : "white")};
}
`;

export const CategoryItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* 넘치면 다음 줄로 이동 */
  align-items: flex-start; /* 박스 크기가 자동으로 늘어나지 않게 설정 */
  gap: 0px;
`;

export const SubCategoryItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* 넘치면 다음 줄로 이동 */
  align-items: flex-start; /* 박스 크기가 자동으로 늘어나지 않게 설정 */
  gap: 0px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 400px;
`;

export const EditButton = styled.button`
  margin-top: 5px;
  margin-bottom: 30px;
  padding: 8px 15px;
  font-size: 16px;
  background-color: #CE9694;
  color: black;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #8d6b64;
  }
`;

