// MyCloset_3.js (완성본)
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as M from "../styles/MyClosetStyle_3";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import backbtn from '../img/backButton.png';
import img8 from '../img/img8.png';
import img9 from '../img/img9.png';
import penIcon from '../img/MyCloset_3_pen.png';
import checkedIcon from '../img/MyCloset_3_checked.png';
import BrushEraserCanvas from "../pages/BrushEraserCanvas";
import axios from "axios";

function MyCloset_3() {
  const navigate = useNavigate();
  const location = useLocation();
  const imageSrc = location.state?.imageSrc;
  const category = location.state?.category || "상의";

  const [isEditing, setIsEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleMaskSubmit = async (maskDataUrl) => {
    const formData = new FormData();
    const originalBlob = await fetch(imageSrc).then((res) => res.blob());
    const maskBlob = dataURLtoBlob(maskDataUrl);

    formData.append("original", originalBlob, "original.jpg");
    formData.append("mask", maskBlob, "mask.png");

    try {
      await axios.post("http://localhost:5000/process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("이미지 전송 완료!");
    } catch (error) {
      alert("전송 실패: 백엔드 서버를 확인하세요");
    }
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
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
          <M.Title1>{`내 옷장 > ${category} > 옷 정보`}</M.Title1>
        </M.TitleBox1>

        <M.ImageContainer>
          <M.ImageBox>
            {imageSrc ? (
              <>
                <img src={imageSrc} alt="선택한 옷" />
                <M.ImageLine />
                <button onClick={openEditModal} style={{ marginTop: "10px" }}>
                  이미지 수정하기
                </button>
              </>
            ) : (
              <p>이미지가 없습니다.</p>
            )}
            <M.ImageLine />
            <M.CordiRec>추천 조합</M.CordiRec>
            <M.RecBoxWrapper>
              <M.RecBox>
                <M.RecBoxTitle>하의</M.RecBoxTitle>
                <M.RecBoxImage src={img8} alt="하의 이미지" />
              </M.RecBox>
              <M.RecBox>
                <M.RecBoxTitle>기타</M.RecBoxTitle>
                <M.RecBoxImage src={img9} alt="기타 이미지" />
              </M.RecBox>
            </M.RecBoxWrapper>
          </M.ImageBox>
        </M.ImageContainer>

        {showEditModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '80vh', height: '80vh', overflow: 'auto' }}>
              <h3>이미지 수정</h3>
              <div style={{ width: '100%', height: 'calc(100% - 150px)' }}>
                <BrushEraserCanvas
                  imageUrl={imageSrc}
                  onExport={(maskDataUrl) => {
                    handleMaskSubmit(maskDataUrl);
                    closeEditModal();
                  }}
                />
              </div>
              <button onClick={closeEditModal} style={{ marginTop: '0px' }}>
                닫기
              </button>
            </div>
          </div>
        )}

        <M.BottomBox>
          <Footer />
        </M.BottomBox>
      </M.Container>
    </M.Background>
  );
}

export default MyCloset_3;