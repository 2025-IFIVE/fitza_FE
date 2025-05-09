import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarCreateStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import backButton from '../img/backButton.png';
import calendar_black from '../img/calendar_black.png';

import Modal from "react-modal";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";

//더미데이터
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
import img4 from '../img/img4.png';
import img5 from '../img/img5.png';
import img6 from '../img/img6.png';
import img7 from '../img/img7.png';
import img8 from '../img/img8.png';
import img9 from '../img/img9.png';

function CalendarCreate() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('상의');  // 기본 탭을 '상의'로 설정
  const [coordiName, setCoordiName] = useState(""); // 코디 이름 상태 추가
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 각 탭에 맞는 이미지 데이터 (더미 데이터)
  const images = {
    '상의': [
      img6, img2, img3, 'top_4.png',
      'top_5.png', 'top_6.png', 'top_7.png', 'top_8.png',
      'top_9.png', 'top_10.png', 'top_11.png', 'top_12.png',
      'top_13.png', 'top_14.png', 'top_15.png', 'top_16.png'
    ],
    '하의': [
      img8, 'bottom_2.png', 'bottom_3.png', 'bottom_4.png',
      'bottom_5.png', 'bottom_6.png', 'bottom_7.png', 'bottom_8.png',
      'bottom_9.png', 'bottom_10.png', 'bottom_11.png', 'bottom_12.png',
      'bottom_13.png', 'bottom_14.png', 'bottom_15.png', 'bottom_16.png'
    ],
    '아우터': [
      img3, img1, 'outer_3.png', 'outer_4.png',
      'outer_5.png', 'outer_6.png', 'outer_7.png', 'outer_8.png',
      'outer_9.png', 'outer_10.png', 'outer_11.png', 'outer_12.png',
      'outer_13.png', 'outer_14.png', 'outer_15.png', 'outer_16.png'
    ],
    '셋업': [
      img4, 'set_2.png', 'set_3.png', 'set_4.png',
      'set_5.png', 'set_6.png', 'set_7.png', 'set_8.png',
      'set_9.png', 'set_10.png', 'set_11.png', 'set_12.png',
      'set_13.png', 'set_14.png', 'set_15.png', 'set_16.png'
    ],
    '신발': [
      img5, 'shoes_2.png', 'shoes_3.png', 'shoes_4.png',
      'shoes_5.png', 'shoes_6.png', 'shoes_7.png', 'shoes_8.png',
      'shoes_9.png', 'shoes_10.png', 'shoes_11.png', 'shoes_12.png',
      'shoes_13.png', 'shoes_14.png', 'shoes_15.png', 'shoes_16.png'
    ],
    '가방': [
      img9, 'bags_2.png', 'bags_3.png', 'bags_4.png',
      'bags_5.png', 'bags_6.png', 'bags_7.png', 'bags_8.png',
      'bags_9.png', 'bags_10.png', 'bags_11.png', 'bags_12.png',
      'bags_13.png', 'bags_14.png', 'bags_15.png', 'bags_16.png'
    ]
  };

  // 이미지 상태를 관리하는 변수 (각각의 구역에 선택된 이미지를 저장)
  const [selectedImages, setSelectedImages] = useState({
    '상의': null,
    '하의': null,
    '아우터': null,
    '셋업': null,
    '신발': null,
    '가방': null
  });

  // 바텀시트가 열릴 때 페이지 스크롤을 비활성화
  useEffect(() => {
    if (isBottomSheetOpen) {
      document.body.style.overflow = 'hidden'; // 전체 페이지 스크롤 차단
    } else {
      document.body.style.overflow = 'auto'; // 바텀시트 닫히면 스크롤 허용
    }
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트가 언마운트되면 복원
    };
  }, [isBottomSheetOpen]);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 초기값을 오늘 날짜로 설정
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  // 이미지 선택 시 구역에 해당하는 이미지 상태 업데이트
  const handleImageSelect = (tab, image) => {
    setSelectedImages((prevState) => ({
      ...prevState,
      [tab]: image
    }));
  };

  return (
    <C.Background>
      <C.TopBox>
        <TopBar />
      </C.TopBox>

      <C.Container>
        <C.Header>
          <C.BackButton onClick={() => navigate(-1)}>
            <img src={backButton} alt="뒤로 가기" />
          </C.BackButton>
          <C.Title>코디 기록하기</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.dateContainer>
            <button onClick={() => setIsCalendarOpen(true)} style={{ background: "none", border: "none", padding: "0", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <img src={calendar_black} alt="calendar_black" className="calendar_black" />
            </button>
            <C.Title1>{selectedDate.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, '-').replace('.', '')}</C.Title1>
          </C.dateContainer>
          <C.RegisterContainer>
            <C.Register>촬영하기</C.Register>
            <Link to="/Camera">
              <img src={smallPlus} alt="plus" className="plusImage" />
            </Link>
          </C.RegisterContainer>
        </C.TitleBox1>

        <Modal
          isOpen={isCalendarOpen}
          onRequestClose={() => setIsCalendarOpen(false)}
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            content: {
              width: "300px",
              height: "400px",
              margin: "auto",
              borderRadius: "10px",
              padding: "10px",
            },
          }}
        >
          <h3 style={{ margin: "5px" }}>날짜 선택</h3>
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <button onClick={() => setIsCalendarOpen(false)} style={{ marginTop: "10px", padding: "5px 12px", border: "none", borderRadius: "6px", cursor: "pointer" }}>닫기</button>
        </Modal>

        <C.CoordiNameInput
          type="text"
          placeholder="코디 이름을 입력하세요"
          value={coordiName}
          onChange={(e) => setCoordiName(e.target.value)}
        />

        <C.Board>
          <C.Section>
            {selectedImages['상의'] ? (
              <img src={selectedImages['상의']} alt="상의" />
            ) : (
              <C.ImagePlaceholder>선택된 이미지 없음</C.ImagePlaceholder>
            )}
          </C.Section>

          <C.Section>
            {selectedImages['하의'] ? (
              <img src={selectedImages['하의']} alt="하의" />
            ) : (
              <C.ImagePlaceholder>선택된 이미지 없음</C.ImagePlaceholder>
            )}
          </C.Section>
          <C.Section>
            
            {selectedImages['아우터'] ? (
              <img src={selectedImages['아우터']} alt="아우터" />
            ) : (
              <C.ImagePlaceholder>선택된 이미지 없음</C.ImagePlaceholder>
            )}
          </C.Section>

          <C.Section>         
            {selectedImages['셋업'] ? (
              <img src={selectedImages['셋업']} alt="셋업" />
            ) : (
              <C.ImagePlaceholder>선택된 이미지 없음</C.ImagePlaceholder>
            )}
          </C.Section>

          <C.Section>            
            {selectedImages['신발'] ? (
              <img src={selectedImages['신발']} alt="신발" />
            ) : (
              <C.ImagePlaceholder>선택된 이미지 없음</C.ImagePlaceholder>
            )}
          </C.Section>

          <C.Section>            
            {selectedImages['가방'] ? (
              <img src={selectedImages['가방']} alt="가방" />
            ) : (
              <C.ImagePlaceholder>선택된 이미지 없음</C.ImagePlaceholder>
            )}
          </C.Section>
        </C.Board>


        <C.ButtonContainer>
          <C.EditButton onClick={handleEditButtonClick}>옷장에서 선택</C.EditButton>
          <C.FinishButton>등록하기</C.FinishButton>
        </C.ButtonContainer>

        {/* Bottom Sheet */}
        {isBottomSheetOpen && (
          <C.BottomSheet>
            <C.CloseButton onClick={closeBottomSheet}>완료</C.CloseButton>
            <C.TabContainer>
              {['상의', '하의', '아우터', '셋업', '신발', '가방'].map((tab, index) => (
                <C.TabButton
                  key={index}
                  onClick={() => setSelectedTab(tab)}  // 탭 클릭 시 상태 업데이트
                  style={selectedTab === tab ? { backgroundColor: '#CE9694' } : {}}  // 선택된 탭에 스타일 적용
                >
                  {tab}
                </C.TabButton>
              ))}
            </C.TabContainer>
            <C.ImageContainer>
              <C.ImageGrid>
                {/* 현재 선택된 탭에 맞는 이미지들만 표시 */}
                {images[selectedTab].map((image, index) => (
                  <C.ImageBox key={index} onClick={() => handleImageSelect(selectedTab, image)}>
                    <img src={image} alt={`item-${index + 1}`} />
                  </C.ImageBox>
                ))}
              </C.ImageGrid>
            </C.ImageContainer>
          </C.BottomSheet>
        )}
      </C.Container>

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarCreate;