import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as M from "../styles/MyClosetStyle_3";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import backbtn from '../img/backButton.png';

import img8 from '../img/img8.png';
import img9 from '../img/img9.png';

function MyCloset_3() {
  const navigate = useNavigate(); // navigate 훅 사용
  const location = useLocation(); // useLocation 훅을 사용하여 상태값 가져오기
  const imageSrc = location.state?.imageSrc; // 전달받은 이미지 정보

  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
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
          <M.Title1>{`내 옷장 > 상의 > 옷 정보`}</M.Title1>
        </M.TitleBox1>

        <M.ImageContainer>
            <M.ImageBox>
                {/* 이미지가 있을 경우 이미지 표시, 없으면 텍스트로 "이미지가 없습니다." 출력 */}
                {imageSrc ? (
                <img src={imageSrc} alt="선택한 옷" />
                ) : (
                <p>이미지가 없습니다.</p>
                )}

                {/* 이미지 아래 선 추가 */}
                <M.ImageLine />
                <M.CordiRec>추천 조합</M.CordiRec>
                <M.RecBoxWrapper>
                    <M.RecBox>
                        <M.RecBoxTitle>하의</M.RecBoxTitle>
                        <M.RecBoxImage src={img8} alt="하의 이미지" />
                    </M.RecBox>
                    <M.RecBox>
                        <M.RecBoxTitle>기타</M.RecBoxTitle>
                        <M.RecBoxImage src={img9} alt="하의 이미지" />
                    </M.RecBox>
                </M.RecBoxWrapper>
            </M.ImageBox>
        </M.ImageContainer>

        <M.BottomBox>
          <Footer />
        </M.BottomBox>
      </M.Container>
    </M.Background>
  );
}

export default MyCloset_3;
