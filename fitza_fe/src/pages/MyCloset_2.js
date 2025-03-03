import React, { useState } from "react";
import * as M from "../styles/MyClosetStyle_2";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import backbtn from '../img/backButton.png';

// 일단 더미?가짜? 이미지 import
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import img4 from "../img/img4.png";
import img5 from "../img/img5.png";
import img6 from "../img/img6.png";
import img7 from "../img/img7.png";

// 이미지 리스트 (객체)
const imageMap = {
  "image1.jpg": img1,
  "image2.jpg": img2,
  "image3.jpg": img3,
  "image4.jpg": img4,
  "image5.jpg": img5,
  "image6.jpg": img6,
  "image7.jpg": img7,
};

// 이미지 데이터 배열
const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg"];

function MyCloset_2() {
  const navigate = useNavigate(); // navigate 훅 사용

  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 박스 클릭 시 MyCloset_3으로 이동
  const handleBoxClick = (image) => {
    navigate("/MyCloset_3", { state: { imageSrc: imageMap[image] } });
  };

  return (
    <M.Background>
      <M.TopBox>
        <TopBar />
      </M.TopBox>

      <M.Container>
        <M.Header>
          {/* M.BackButton을 클릭 시 handleBackButtonClick 함수 실행 */}
          <M.BackButton onClick={handleBackButtonClick}>
            <img src={backbtn} alt="Back" />
          </M.BackButton>
          <M.Title>내 옷장</M.Title>
        </M.Header>

        <M.TitleBox1>
          <M.Title1>{`내 옷장 > 상의 `}</M.Title1>
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
            <M.Box key={index} onClick={() => handleBoxClick(image)}> {/* 여기에 onClick 추가 */}
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
