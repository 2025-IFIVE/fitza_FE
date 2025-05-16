import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as M from "../styles/MyClosetStyle_3";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import backbtn from '../img/backButton.png';
import BrushEraserCanvas from "../pages/BrushEraserCanvas";
import axios from "axios";

import img8 from '../img/img8.png';
import img9 from '../img/img9.png';
import penIcon from '../img/MyCloset_3_pen.png';
import checkedIcon from '../img/MyCloset_3_checked.png';

function MyCloset_3() {
  const navigate = useNavigate(); // navigate 훅 사용
  const location = useLocation(); // useLocation 훅을 사용하여 상태값 가져오기
  const imageSrc = location.state?.imageSrc; // 전달받은 이미지 정보
  const category = location.state?.category || "상의";
  
  const [isEditing, setIsEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);

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


  const categoryData = {
    상의: ["탑", "블라우스", "티셔츠", "니트웨어", "셔츠", "브라탑", "후드티"],
    하의: ["청바지", "팬츠", "스커트", "레깅스", "조거팬츠"],
    아우터: ["코트", "재킷", "점퍼", "패딩","베스트","가디건","짚업"],
    원피스: ["드레스","점프수트"],
    신발: ["스니커즈", "슬립온", "운동화", "로퍼", "플랫슈즈","힐","샌들","샌들힐","슬리퍼","뮬","부츠","워커","어그부츠","등산화","기타"],
    모자: ["캡", "비니", "베레모", "페도라", "기타"],
    기타: ["홈웨어", "헤어악세사리", "안경/선글라스", "스카프", "목도리","시계","장갑","양말","벨트","지갑","기타"]
  };
  
  const [selectedCtgy, setSelectedCtgy] = useState([]);
  const [selectedSubCtgy, setSelectedSubCtgy] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [selectedDetail, setSelectedDetail] = useState([]);
  const detail = ["메탈", "리본/띠", "봉제/자수", "허리라인","절개/비대칭","단추","지퍼","스트링","소매/밑단","포켓","주름","어깨라인","레이스","기타"];

  const [selectedcolor, setSelectedcolor] = useState([]);
  const color = ["블랙", "화이트", "그레이", "레드", "핑크", "오렌지", "베이지", "브라운", "옐로우", "그린", "카키", "민트", "블루", "네이비", "스카이블루", "퍼플", "라벤더", "와인", "네온", "골드", "실버"];

  const [selectedCloth, setSelectedCloth] = useState([]);
  const cloth = ["패딩", "퍼", "니트", "울/플리스","골덴/벨벳","트위드","가죽","데님","소프트 패브릭","린넨","면","신축/기능성 소재","기타"];

  const [selectedPrint, setSelectedPrint] = useState([]);
  const print = ["무지", "레터링", "체크", "스트라이프","기하학/반복 패턴","도트","자연/동물무늬","추상/그래픽","밀리터리 패턴","기타"];

  const [selectedStyle, setSelectedStyle] = useState([]);
  const style = ["스트리트", "힙합", "페미닌", "모던/클래식","레트로/빈티지","밀리터리","스포티","로맨틱","리조트","기타"];

  const [selectedSubStyle, setSelectedSubStyle] = useState([]);
  const substyle = ["스트리트", "힙합", "페미닌", "모던/클래식","레트로/빈티지","밀리터리","스포티","로맨틱","리조트","기타"];

  const [selectedFit, setSelectedFit] = useState([]);
  const fit = ["슬림","타이트", "레귤러", "루즈", "오버사이즈"];

  const [selectedbottomFit, setSelectedbottomFit] = useState([]);
  const bottomfit = ["스키니", "노멀", "와이드", "루즈","벨보텀"];

  const [selectedNeckline, setSelectedNeckline] = useState([]);
  const neckline = ["라운드넥", "브이넥", "스퀘어넥","오프숄더","터틀넥","노카라","기타"];

  const [selectedSleeve, setSelectedSleeve] = useState([]);
  const sleeve = ["민소매","캡소매","반소매","7부 소매","긴소매"];

  const [selectedLength, setSelectedLength] = useState([]);
  const length = ["크롭","노멀","롱"];

  const [selectedbottomLength, setSelectedbottomLength] = useState([]);
  const bottomlength = ["미니","니렝스","미디","발목","맥시"];

  const [selectedouterLength, setSelectedouterLength] = useState([]);
  const outerlength = ["크롭","노멀","하프","맥시","롱"];

  const [selecteddressLength, setSelecteddressLength] = useState([]);
  const dresslength = ["미니","니렝스","미디","발목","맥시"];

  const getFitOptions = () => {
    switch (selectedCtgy) {
      case "하의":
        return { options: bottomfit, selected: selectedbottomFit, setSelected: setSelectedbottomFit };
      case "상의":
      case "원피스":
      case "아우터":
        return { options: fit, selected: selectedFit, setSelected: setSelectedFit };
      default:
        return { options: [], selected: [], setSelected: () => {} };
    }
  };

  const handleFitClickDynamic = (item) => {
    const { setSelected } = getFitOptions();
    setSelected([item]);   // ⭐ 단일 선택
  };
  


  const handleEditClick = () => {
    setIsEditing((prev) => !prev);

    
  };

  const handleCtgyClick = (category) => {
    if (!isEditing) return; // 편집 모드에서만 변경 가능
  
    if (selectedCtgy === category) {
      // 이미 선택된 경우 선택 해제
      setSelectedCtgy(null);
      setActiveCategory(null);
      setSelectedSubCtgy([]); // 하위 카테고리도 초기화
    } else {
      // 새로운 카테고리 선택
      setSelectedCtgy(category);
      setActiveCategory(category);
      setSelectedSubCtgy([]); // 새로운 카테고리 선택 시 하위 초기화
    }
  };
  
  
  // ⭐ 변경: 하위 카테고리 (단일 선택으로 수정)
const handleSubCtgyClick = (subcategory) => {
  setSelectedSubCtgy([subcategory]);
};


  const handleDetailClick = (detail) => {
    setSelectedDetail((prev) =>
      prev.includes(detail) ? prev.filter((s) => s !== detail) : [...prev, detail]
    );
  };

  const handleColorClick = (color) => {
    setSelectedcolor((prev) =>
      prev.includes(color) ? prev.filter((s) => s !== color) : [...prev, color]
    );
  };

  const handleClothClick = (cloth) => {
    setSelectedCloth((prev) =>
      prev.includes(cloth) ? prev.filter((s) => s !== cloth) : [...prev, cloth]
    );
  };

  const handlePrintClick = (print) => {
    setSelectedPrint((prev) =>
      prev.includes(print) ? prev.filter((s) => s !== print) : [...prev, print]
    );
  };

  // ⭐ 변경: 스타일
const handleStyleClick = (item) => handleSingleSelect(selectedStyle, setSelectedStyle, item);

// ⭐ 변경: 서브스타일
const handleSubStyleClick = (item) => handleSingleSelect(selectedSubStyle, setSelectedSubStyle, item);


  // ⭐ 변경: 넥라인 (단일 선택으로 수정)
const handleNecklineClick = (item) => handleSingleSelect(selectedNeckline, setSelectedNeckline, item);
  // ⭐ 변경: 소매길이
const handleSleeveClick = (item) => handleSingleSelect(selectedSleeve, setSelectedSleeve, item);

  // ✅ 상의/하의/아우터/원피스에 따라 length 값을 동적으로 반환
const getLengthOptions = () => {
  switch (selectedCtgy) {
    case "상의":
      return { options: length, selected: selectedLength, setSelected: setSelectedLength };
    case "하의":
      return { options: bottomlength, selected: selectedbottomLength, setSelected: setSelectedbottomLength };
    case "아우터":
      return { options: outerlength, selected: selectedouterLength, setSelected: setSelectedouterLength };
    case "원피스":
      return { options: dresslength, selected: selecteddressLength, setSelected: setSelecteddressLength };
    default:
      return { options: [], selected: [], setSelected: () => {} };
  }
};

// ✅ handle 함수 (공통화 가능)
const handleLengthClickDynamic = (item) => {
  const { setSelected } = getLengthOptions();
  setSelected([item]);   // ⭐ 단일 선택
};

const handleSingleSelect = (selected, setSelected, item) => {
  setSelected([item]);
};

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
          <M.Title1>{`내 옷장 > ${category} > 옷 정보`}</M.Title1>
        </M.TitleBox1>

        <M.ImageContainer>
        <M.ImageBox>
            {imageSrc ? (
              <>
                <img src={imageSrc} alt="선택한 옷" />
                <button onClick={openEditModal} style={{ marginTop: "10px" }}>
                  이미지 수정하기
                </button>
              </>
            ) : (
              <p>이미지가 없습니다.</p>
            )}
                
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

        {/* 카테고리 */}
        <M.CategorySection>
        <M.CategoryTitle>카테고리</M.CategoryTitle>
            <M.CategoryItems>
              {isEditing
                ? Object.keys(categoryData).map((ctgy) => (
                    <M.CategoryItem
                      key={ctgy}
                      selected={selectedCtgy === ctgy} // 단일 선택
                      onClick={() => handleCtgyClick(ctgy)}
                    >
                      {ctgy}
                    </M.CategoryItem>
                  ))
                : selectedCtgy !== null && ( // selectedCtgy가 null이 아닐 때만 표시
                    <M.CategoryItem key={selectedCtgy} selected>
                      {selectedCtgy}
                    </M.CategoryItem>
                  )}
            </M.CategoryItems>

            {/* 하위 카테고리 표시 */}
            {selectedCtgy && categoryData[selectedCtgy] && (
              <M.SubCategoryItems>
                {isEditing
                  ? categoryData[selectedCtgy].map((subCtgy) => (
                      <M.CategoryItem
                        key={subCtgy}
                        selected={selectedSubCtgy.includes(subCtgy)}
                        onClick={() => handleSubCtgyClick(subCtgy)}
                      >
                        {subCtgy}
                      </M.CategoryItem>
                    ))
                  : selectedSubCtgy.map((subCtgy) => (
                      <M.CategoryItem key={subCtgy} selected>
                        {subCtgy}
                      </M.CategoryItem>
                    ))}
              </M.SubCategoryItems>
            )}

  <M.CategoryTitle>색상</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? color.map((color) => (
          <M.CategoryItem
            key={color}
            selected={selectedcolor.includes(color)}
            onClick={() => handleColorClick(color)}
          >
            {color}
          </M.CategoryItem>
        ))
      : selectedcolor.map((color) => (
          <M.CategoryItem key={color} selected>
            {color}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
  <M.CategoryTitle>디테일</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? detail.map((detail) => (
          <M.CategoryItem
            key={detail}
            selected={selectedDetail.includes(detail)}
            onClick={() => handleDetailClick(detail)}
          >
            {detail}
          </M.CategoryItem>
        ))
      : selectedDetail.map((detail) => (
          <M.CategoryItem key={detail} selected>
            {detail}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
  <M.CategoryTitle>소재</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? cloth.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selectedCloth.includes(item)}
            onClick={() => handleClothClick(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selectedCloth.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
  <M.CategoryTitle>프린트</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? print.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selectedPrint.includes(item)}
            onClick={() => handlePrintClick(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selectedPrint.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
  <M.CategoryTitle>스타일</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? style.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selectedStyle.includes(item)}
            onClick={() => handleStyleClick(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selectedStyle.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
  <M.CategoryTitle>서브 스타일</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? substyle.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selectedSubStyle.includes(item)}
            onClick={() => handleSubStyleClick(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selectedSubStyle.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
  <M.CategoryTitle>핏</M.CategoryTitle>
<M.CategoryItems>
  {(() => {
    const { options, selected } = getFitOptions();
    return isEditing
      ? options.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selected.includes(item)}
            onClick={() => handleFitClickDynamic(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selected.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ));
  })()}
</M.CategoryItems>

  {/* 넥라인 : 하의가 아닐 때만 표시 */}
{selectedCtgy !== "하의" && (
  <>
    <M.CategoryTitle>넥라인</M.CategoryTitle>
    <M.CategoryItems>
      {isEditing
        ? neckline.map((item) => (
            <M.CategoryItem
              key={item}
              selected={selectedNeckline.includes(item)}
              onClick={() => handleNecklineClick(item)}
            >
              {item}
            </M.CategoryItem>
          ))
        : selectedNeckline.map((item) => (
            <M.CategoryItem key={item} selected>
              {item}
            </M.CategoryItem>
          ))}
    </M.CategoryItems>
  </>
)}

{/* 소매길이 : 하의가 아닐 때만 표시 */}
{selectedCtgy !== "하의" && (
  <>
    <M.CategoryTitle>소매길이</M.CategoryTitle>
    <M.CategoryItems>
      {isEditing
        ? sleeve.map((item) => (
            <M.CategoryItem
              key={item}
              selected={selectedSleeve.includes(item)}
              onClick={() => handleSleeveClick(item)}
            >
              {item}
            </M.CategoryItem>
          ))
        : selectedSleeve.map((item) => (
            <M.CategoryItem key={item} selected>
              {item}
            </M.CategoryItem>
          ))}
    </M.CategoryItems>
  </>
)}

  <M.CategoryTitle>기장</M.CategoryTitle>
<M.CategoryItems>
  {(() => {
    const { options, selected } = getLengthOptions();
    return isEditing
      ? options.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selected.includes(item)}
            onClick={() => handleLengthClickDynamic(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selected.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ));
  })()}
</M.CategoryItems>


</M.CategorySection>
    <M.ButtonContainer>
        <M.EditButton onClick={handleEditClick}>
        {isEditing ? "저장" : "편집"}
      <img 
        alt={isEditing ? "저장 아이콘" : "편집 아이콘"} 
        src={isEditing ? checkedIcon : penIcon} 
        style={{ marginLeft: '3px', width: '18px', height: '18px',position: 'relative',top: '2px' }} 
      />
        </M.EditButton>
    </M.ButtonContainer>

        <M.BottomBox>
          <Footer />
        </M.BottomBox>
      </M.Container>
    </M.Background>
  );
}

export default MyCloset_3;