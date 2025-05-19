import React, { useEffect, useState } from "react";
import * as M from "../styles/MyClosetStyle_2";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useLocation, useNavigate } from "react-router-dom";

import smallPlus from '../img/smallPlus.png';
import backbtn from '../img/backButton.png';

import axios from "axios";


function MyCloset_2() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 카테고리 추출 (/category/:category 경로를 따라온 경우)
  const category = decodeURIComponent(location.pathname.split("/").pop());
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const token = localStorage.getItem('authToken'); // 실제 저장된 토큰 키 확인 필요
        const response = await axios.get("http://localhost:8080/api/clothing/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 카테고리별 필터링
        const filtered = response.data.filter(item => item.type === category);
        
        console.log("받아온 이미지 목록:", filtered); //디버깅
        setImages(filtered);
      } catch (error) {
        console.error("의류 목록 불러오기 실패:", error);
      }
    };

    fetchClothing();
  }, [category]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleBoxClick = (item) => {
    navigate("/MyCloset_3", {
      state: {
        imageSrc: `http://localhost:8080${item.croppedPath}`,
        category: item.type,
        clothId: item.clothid, // 상세정보 연동용
      },
    });
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
            <Link to="/clothesRegistration">
  <             img src={smallPlus} alt="plus" className="plusImage" />
            </Link>
          </M.RegisterContainer>
        </M.TitleBox1>

        {/* 이미지 박스 렌더링 */}
        <M.ImageGrid>
          {images.map((image, index) => (
            <M.Box key={index} onClick={() => handleBoxClick(image)}>
              <M.BoxImage 
                src={`http://localhost:8080${image.croppedPath}`}
                alt={`옷 ${index + 1}`}
              />
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
