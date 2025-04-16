import React from "react";
import * as M from "../styles/MyClosetStyle_2";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useLocation, useNavigate } from "react-router-dom";

import smallPlus from '../img/smallPlus.png';
import backbtn from '../img/backButton.png';

// 더미 이미지 import
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import img4 from "../img/img4.png";
import img5 from "../img/img5.png";
import img6 from "../img/img6.png";
import img7 from "../img/img7.png";
import domi30 from "../img/domi30.PNG";
import domi31 from "../img/domi31.PNG";
import domi32 from "../img/domi32.PNG";
import domi34 from "../img/domi34.PNG";
import domi35 from "../img/domi35.PNG";


// 이미지 리스트 매핑 (카테고리별 더미 이미지)
const dummyImagesByCategory = {
  상의: ["image3.jpg", "image7.jpg","domi30.PNG","domi31.PNG","domi32.PNG","domi34.PNG","domi35.PNG"],
  하의: ["image4.jpg", "image5.jpg"],
  아우터: ["image6.jpg", "image7.jpg"],
  원피스: ["image1.jpg"],
  신발: ["image2.jpg", "image3.jpg"],
  모자: ["image4.jpg"],
  기타: ["image5.jpg", "image6.jpg"],
};

// 이미지 파일 이름에 대응하는 이미지 파일 import
const imageMap = {
  "image1.jpg": img1,
  "image2.jpg": img2,
  "image3.jpg": img3,
  "image4.jpg": img4,
  "image5.jpg": img5,
  "image6.jpg": img6,
  "image7.jpg": img7,
  "domi30.PNG": domi30,
  "domi31.PNG": domi31,
  "domi32.PNG": domi32,
  "domi34.PNG": domi34,
  "domi35.PNG": domi35,
};


function MyCloset_2() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 카테고리 추출 (/category/:category 경로를 따라온 경우)
  const category = decodeURIComponent(location.pathname.split("/").pop());
  const images = dummyImagesByCategory[category] || [];

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleBoxClick = (image) => {
    navigate("/MyCloset_3", { state: { imageSrc: imageMap[image],category: category } });
  };

  return (
    <M.Background>
      <M.TopBox>
        <TopBar />
      </M.TopBox>

      <M.Container>
        <M.Header>
          <M.BackButton onClick={handleBackButtonClick}>
            <img src={backbtn} alt="Back" />
          </M.BackButton>
          <M.Title>내 옷장</M.Title>
        </M.Header>

        <M.TitleBox1>
          <M.Title1>{`내 옷장 > ${category}`}</M.Title1>
          <M.RegisterContainer>
            <M.Register>옷 등록하기</M.Register>
            <Link to="/Main">
              <img src={smallPlus} alt="plus" className="plusImage" />
            </Link>
          </M.RegisterContainer>
        </M.TitleBox1>

        {/* 이미지 박스 렌더링 */}
        <M.ImageGrid>
          {images.map((image, index) => (
            <M.Box key={index} onClick={() => handleBoxClick(image)}>
              <M.BoxImage src={imageMap[image]} alt={`옷 ${index + 1}`} />
            </M.Box>
          ))}
        </M.ImageGrid>
      </M.Container>

      <M.BottomBox>
        <Footer />
      </M.BottomBox>
    </M.Background>
  );
}

export default MyCloset_2;
