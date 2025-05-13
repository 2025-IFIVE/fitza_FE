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
    상의: ["티셔츠", "긴팔티", "민소매티", "카라티", "탱크탑", "크롭탑", "블라우스", "셔츠", "맨투맨", "후드", "니트", "조끼", "가디건", "스포츠", "기타"],
    하의: ["청바지", "슬랙스", "반바지", "트레이닝바지", "레깅스", "미니스커트","미디스커트","롱스커트","기타"],
    아우터: ["코트", "패딩", "가디건", "무스탕","블루종","야구잠바","자켓","조끼","집업","야상","라이더자켓","후리스","경량패딩","기타"],
    원피스: ["캐주얼원피스", "미니원피스", "티셔츠원피스", "셔츠원피스", "니트원피스","후드원피스","자켓원피스","멜빵원피스","점프슈트","파티원피스","기타"],
    신발: ["스니커즈", "슬립온", "운동화", "로퍼", "플랫슈즈","힐","샌들","샌들힐","슬리퍼","뮬","부츠","워커","어그부츠","등산화","기타"],
    모자: ["캡", "비니", "베레모", "페도라", "기타"],
    기타: ["홈웨어", "헤어악세사리", "안경/선글라스", "스카프", "목도리","시계","장갑","양말","벨트","지갑","기타"]
  };
  
  const [selectedCtgy, setSelectedCtgy] = useState([]);
  const [selectedSubCtgy, setSelectedSubCtgy] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const seasons = ["봄", "여름", "가을", "겨울"];

  const [selectedTPO, setSelectedTPO] = useState([]);
  const TPO = ["데일리", "직장", "데이트", "경조사","여행","홈웨어","운동","학교","특별한 날","기타"];

  const [selectedcolor, setSelectedcolor] = useState([]);
  const color = ["흰색", "아이보리", "베이지", "연회색","진회색","검정","연노랑","노랑","황색","주황","코랄","빨강","분홍","진분홍","연두","초록","올리브","다크올리브","청록","카키","하늘","파랑","네이비","라벤더","보라","버건디","카멜","브라운","다크브라운","마젠타","골드","실버","기타"];

  const [selectedCloth, setSelectedCloth] = useState([]);
  const cloth = ["면", "폴리에스터", "나일론", "데님","가죽","울","린넨","아크릴","실크","트위드","벨벳","쉬폰","스웨이드","코듀로이","레이스","퍼","다운 깃털","캐시미어","앙고라","기타"];

  const [selectedPattern, setSelectedPattern] = useState([]);
  const pattern = ["무지", "스트라이프", "프린트", "도트","애니멀","플로럴","트로피칼","아가일","카모","컬러블록","체커보드","격자","하운드투스","헤링본","쉐브론","트위드","타이다이","레이스","기타"];

  const [selectedStyle, setSelectedStyle] = useState([]);
  const style = ["캐주얼", "비즈니스 캐주얼", "포멀", "모던","클래식","미니멀","럭셔리","스포티","트렌디","키드코어","아티스틱","드레스업","페미닌","스트릿","기타"];

  const [selectedFit, setSelectedFit] = useState([]);
  const fit = ["슬림", "레귤러", "루즈", "오버사이즈"];

  const [selectedNeckline, setSelectedNeckline] = useState([]);
  const neckline = ["라운드넥", "U넥", "V넥", "스퉤어넥","셔츠칼라","스탠드업 칼라","와이드칼라","터틀넥","스트랩 없음","두꺼운 스트랩","얇은 스트랩","오프숄더","비대칭넥","훌터넥","수트칼라","기타"];

  const [selectedSleeve, setSelectedSleeve] = useState([]);
  const sleeve = ["민소매","캡소매","반소매","7부 소매","긴소매"];

  const [selectedLength, setSelectedLength] = useState([]);
  const length = ["미니","미디움","맥시"];

  const [purchaseDate, setPurchaseDate] = useState(""); 


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
  
  
  const handleSubCtgyClick = (subcategory) => {
    if (selectedSubCtgy.includes(subcategory)) {
      setSelectedSubCtgy(selectedSubCtgy.filter((sc) => sc !== subcategory));
    } else {
      setSelectedSubCtgy([...selectedSubCtgy, subcategory]);
    }
  };

  const handleSeasonClick = (season) => {
    setSelectedSeasons((prev) =>
      prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season]
    );
  };

  const handleTPOClick = (TPO) => {
    setSelectedTPO((prev) =>
      prev.includes(TPO) ? prev.filter((s) => s !== TPO) : [...prev, TPO]
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

  const handlePatternClick = (pattern) => {
    setSelectedPattern((prev) =>
      prev.includes(pattern) ? prev.filter((s) => s !== pattern) : [...prev, pattern]
    );
  };

  const handleStyleClick = (style) => {
    setSelectedStyle((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleFitClick = (fit) => {
    setSelectedFit((prev) =>
      prev.includes(fit) ? prev.filter((s) => s !== fit) : [...prev, fit]
    );
  };

  const handleNecklineClick = (neckline) => {
    setSelectedNeckline((prev) =>
      prev.includes(neckline) ? prev.filter((s) => s !== neckline) : [...prev, neckline]
    );
  };

  const handleSleeveClick = (sleeve) => {
    setSelectedSleeve((prev) =>
      prev.includes(sleeve) ? prev.filter((s) => s !== sleeve) : [...prev, sleeve]
    );
  };

  const handleLengthClick = (length) => {
    setSelectedLength((prev) =>
      prev.includes(length) ? prev.filter((s) => s !== length) : [...prev, length]
    );
  };

  const handleDateChange = (event) => {
    setPurchaseDate(event.target.value);
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

  <M.CategoryTitle>계절</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? seasons.map((season) => (
          <M.CategoryItem
            key={season}
            selected={selectedSeasons.includes(season)}
            onClick={() => handleSeasonClick(season)}
          >
            {season}
          </M.CategoryItem>
        ))
      : selectedSeasons.map((season) => (
          <M.CategoryItem key={season} selected>
            {season}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
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
  <M.CategoryTitle>TPO</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? TPO.map((tpo) => (
          <M.CategoryItem
            key={tpo}
            selected={selectedTPO.includes(tpo)}
            onClick={() => handleTPOClick(tpo)}
          >
            {tpo}
          </M.CategoryItem>
        ))
      : selectedTPO.map((tpo) => (
          <M.CategoryItem key={tpo} selected>
            {tpo}
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
  <M.CategoryTitle>패턴</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? pattern.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selectedPattern.includes(item)}
            onClick={() => handlePatternClick(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selectedPattern.map((item) => (
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
  <M.CategoryTitle>핏</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? fit.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selectedFit.includes(item)}
            onClick={() => handleFitClick(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selectedFit.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
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
  <M.CategoryTitle>길이</M.CategoryTitle>
  <M.CategoryItems>
    {isEditing
      ? length.map((item) => (
          <M.CategoryItem
            key={item}
            selected={selectedLength.includes(item)}
            onClick={() => handleLengthClick(item)}
          >
            {item}
          </M.CategoryItem>
        ))
      : selectedLength.map((item) => (
          <M.CategoryItem key={item} selected>
            {item}
          </M.CategoryItem>
        ))}
  </M.CategoryItems>
  <M.CategoryTitle>코디</M.CategoryTitle>
  <M.CategoryTitle>구매날짜</M.CategoryTitle>
  <M.CategoryItems>
    <input 
      type="text" 
      value={purchaseDate} 
      onChange={handleDateChange} 
      placeholder="YYYY-MM-DD 형식으로 입력하세요" 
      disabled={!isEditing} 
    />
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