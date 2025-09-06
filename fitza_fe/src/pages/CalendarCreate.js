// CalendarCreate.js  
import React, { useState, useEffect, useRef } from "react";
import * as C from "../styles/CalendarCreateStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import smallPlus from "../img/smallPlus.png";
import backButton from "../img/backButton.png";
import calendar_black from "../img/calendar_black.png";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { normalizeAbsoluteUrl } from "../utils/url.ts";

Modal.setAppElement("#root");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

function CalendarCreate() {
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.state?.mode === "edit";
  const editCalendarId = location.state?.calendarId;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("상의");
  const [coordiName, setCoordiName] = useState("");
  const [clothingData, setClothingData] = useState([]);
  const [selectedImages, setSelectedImages] = useState({
    상의: null,
    하의: null,
    아우터: null,
    원피스: null,
    신발: null,
    가방: null,
  });
  const [imageStyles, setImageStyles] = useState({});
  const [dragState, setDragState] = useState({});
  const [resizeState, setResizeState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const boardRef = useRef(null);
  const itemRefs = useRef({});           // 각 카테고리 DOM 참조
  const dragRafId = useRef(null);
  const resizeRafId = useRef(null);
  const pendingDrag = useRef(null);      // {cat, left, top}
  const pendingResize = useRef(null);    // {cat, size}

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const labelToCategory = (label) => {
    const labelMap = {
      "20": "상의",
      "21": "하의",
      "22": "아우터",
      "23": "원피스",
      "24": "신발",
      "25": "가방",
    };
    return labelMap[label] || `기타${label}`;
  };

  const categoryList = ["상의", "하의", "아우터", "원피스", "모자", "기타"];

  const getRandomStyle = () => ({
    top: `${Math.floor(Math.random() * 60)}%`,
    left: `${Math.floor(Math.random() * 60)}%`,
  });

  // 내 옷장 불러오기
  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_API}/api/clothing/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClothingData(res.data || []);
      } catch (err) {
        console.error("옷장 불러오기 실패:", err);
      }
    };
    fetchClothing();
  }, []);

  // 편집 모드 복원
  useEffect(() => {
    if (!isEditMode || !location.state) return;

    setCoordiName(location.state.title || "");
    setSelectedDate(new Date(location.state.date));

    const fetchTypes = async () => {
      const token = localStorage.getItem("authToken");
      const imagesByCat = {};
      const stylesByCat = {};

      for (const item of location.state.items || []) {
        try {
          const cid = item.clothid || item.clothId; // 보정
          if (!cid) continue;
          const res = await axios.get(`${process.env.REACT_APP_API}/api/clothing/${cid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const type = res.data?.type;
          if (type) {
            const imagePath = (res.data?.croppedPath || res.data?.imagePath || "").replace(/^\//, "");
            imagesByCat[type] = { ...item, type, clothid: Number(cid), imagePath };
            stylesByCat[type] = { top: `${item.y}%`, left: `${item.x}%`, size: item.size ?? 100 };
          }
        } catch (err) {
          console.error("cloth type 불러오기 실패:", err);
        }
      }
      setSelectedImages((prev) => ({ ...prev, ...imagesByCat }));
      setImageStyles((prev) => ({ ...prev, ...stylesByCat }));
    };

    fetchTypes();
  }, [isEditMode, location]);

  // 자동 매칭 반영
  useEffect(() => {
    const matched = location.state?.matchedImages; // URL[]
    const labels = location.state?.labels;         // "20"~"25"
    const matchedIds = location.state?.matchedIds; // clothid[]

    if (!matched || !labels || matched.length !== labels.length) return;
    if (!matchedIds && clothingData.length === 0) return;

    const findClothIdByUrl = (url) => {
      const norm = url.replace(process.env.REACT_APP_API || "", "").replace(/^\//, "");
      const found = clothingData.find((c) => {
        const p = (c?.croppedPath || c?.imagePath || "").replace(/^\//, "");
        return p && (p === norm || norm.endsWith(p) || p.endsWith(norm));
      });
      return found?.clothid;
    };

    const newImages = {};
    const newStyles = {};
    matched.forEach((url, idx) => {
      const cat = labelToCategory(String(labels[idx]));
      const realId = matchedIds?.[idx] ?? findClothIdByUrl(url);
      if (!realId) return;
      newImages[cat] = {
        imagePath: url.replace(process.env.REACT_APP_API || "", "").replace(/^\//, ""),
        clothid: Number(realId),
      };
      const { top, left } = getRandomStyle();
      newStyles[cat] = { top, left, size: 30 };
    });

    if (Object.keys(newImages).length > 0) {
      setSelectedImages((prev) => ({ ...prev, ...newImages }));
      setImageStyles((prev) => ({ ...prev, ...newStyles }));
    }
  }, [location, clothingData]);

  // 바텀시트 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isBottomSheetOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isBottomSheetOpen]);

  const handleImageSelect = (tab, item) => {
    setSelectedImages((prev) => {
      const current = prev[tab];
      const currentId = current?.clothid || current?.clothId;
      const newId = item.clothid || item.clothId;

      if (current && currentId === newId) {
        const newImages = { ...prev };
        delete newImages[tab];
        setImageStyles((prevStyle) => {
          const newStyles = { ...prevStyle };
          delete newStyles[tab];
          return newStyles;
        });
        return newImages;
      }
      return { ...prev, [tab]: item };
    });

    setImageStyles((prev) => {
      if (prev[tab]) return prev;
      const { top, left } = getRandomStyle();
      return { ...prev, [tab]: { top, left, size: 30 } };
    });
  };

  // ===== pointer 기반 Drag (DOM 직접 갱신 + rAF) =====
  const handlePointerDownDrag = (cat, e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}

    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!boardRect) return;

    const currentStyle = imageStyles[cat] || { left: "0%", top: "0%" };
    const currentLeft = parseFloat(String(currentStyle.left).replace("%", "")) || 0;
    const currentTop = parseFloat(String(currentStyle.top).replace("%", "")) || 0;

    setDragState({
      isDragging: true,
      category: cat,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: currentLeft,
      startTop: currentTop,
      boardRect,
    });
    pendingDrag.current = { cat, left: currentLeft, top: currentTop };
  };

  const handlePointerMoveDrag = (e) => {
    if (!dragState.isDragging) return;
    e.preventDefault();

    const rect = dragState.boardRect;
    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;
    const dxp = (deltaX / rect.width) * 100;
    const dyp = (deltaY / rect.height) * 100;

    const left = Math.max(0, Math.min(dragState.startLeft + dxp, 85));
    const top  = Math.max(0, Math.min(dragState.startTop  + dyp, 85));

    const el = itemRefs.current[dragState.category];
    pendingDrag.current = { cat: dragState.category, left, top };

    if (el && dragRafId.current == null) {
      dragRafId.current = requestAnimationFrame(() => {
        const p = pendingDrag.current;
        if (p && itemRefs.current[p.cat]) {
          itemRefs.current[p.cat].style.left = `${p.left}%`;
          itemRefs.current[p.cat].style.top  = `${p.top}%`;
        }
        dragRafId.current = null;
      });
    }
  };

  const handlePointerUpDrag = () => {
    const p = pendingDrag.current;
    if (p) {
      setImageStyles((prev) => ({
        ...prev,
        [p.cat]: { ...(prev[p.cat] || {}), left: `${p.left}%`, top: `${p.top}%` },
      }));
    }
    setDragState({});
    pendingDrag.current = null;
    if (dragRafId.current) cancelAnimationFrame(dragRafId.current);
    dragRafId.current = null;
  };

  // ===== pointer 기반 Resize (DOM 직접 갱신 + rAF) =====
  const handlePointerDownResize = (cat, e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}

    setResizeState({
      isResizing: true,
      category: cat,
      startX: e.clientX,
      startSize: imageStyles[cat]?.size ?? 100,
    });
    pendingResize.current = { cat, size: imageStyles[cat]?.size ?? 100 };
  };

  const handlePointerMoveResize = (e) => {
    if (!resizeState.isResizing) return;
    e.preventDefault();

    const deltaX = e.clientX - resizeState.startX;
    const size = Math.max(30, (resizeState.startSize ?? 100) + deltaX * 0.5);

    const el = itemRefs.current[resizeState.category];
    pendingResize.current = { cat: resizeState.category, size };

    if (el && resizeRafId.current == null) {
      resizeRafId.current = requestAnimationFrame(() => {
        const p = pendingResize.current;
        if (p && itemRefs.current[p.cat]) {
          itemRefs.current[p.cat].style.width = `${p.size}%`;
        }
        resizeRafId.current = null;
      });
    }
  };

  const handlePointerUpResize = () => {
    const p = pendingResize.current;
    if (p) {
      setImageStyles((prev) => ({
        ...prev,
        [p.cat]: { ...(prev[p.cat] || {}), size: p.size },
      }));
    }
    setResizeState({});
    pendingResize.current = null;
    if (resizeRafId.current) cancelAnimationFrame(resizeRafId.current);
    resizeRafId.current = null;
  };

  // 문서 백업 리스너 (드문 케이스 대비)
  useEffect(() => {
    if (!dragState.isDragging) return;
    const move = (e) => handlePointerMoveDrag(e);
    const up = () => handlePointerUpDrag();
    document.addEventListener("pointermove", move, { passive: false });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointercancel", up, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
    };
  }, [dragState]);

  useEffect(() => {
    if (!resizeState.isResizing) return;
    const move = (e) => handlePointerMoveResize(e);
    const up = () => handlePointerUpResize();
    document.addEventListener("pointermove", move, { passive: false });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointercancel", up, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
    };
  }, [resizeState]);

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 전송 방지
    setIsSubmitting(true);

    const token = localStorage.getItem("authToken");

    const entries = Object.entries(selectedImages).filter(([, item]) => !!item);

    // clothid 누락 카테고리 표시
    const missingCats = entries
      .filter(([, item]) => !(item.clothid || item.clothId))
      .map(([cat]) => cat);
    if (missingCats.length > 0) {
      alert(`아래 항목은 clothid를 찾지 못했습니다. 옷장에서 다시 선택해주세요:\n- ${missingCats.join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    const items = entries.map(([cat, item]) => {
      const { left = "0%", top = "0%", size = 100 } = imageStyles[cat] || {};
      const id = Number(item.clothid || item.clothId);
      const x = Math.max(0, Math.min(100, parseFloat(String(left).replace("%", "")) || 0));
      const y = Math.max(0, Math.min(100, parseFloat(String(top).replace("%", "")) || 0));
      const s = Math.max(10, Math.min(200, Math.round(Number(size) || 100)));
      return { clothId: id, clothid: id, x, y, size: s };
    });

    // 숫자성 검증
    const invalid = items.filter((it) => !Number.isFinite(it.clothid));
    if (invalid.length > 0) {
      alert("일부 아이템의 clothid가 숫자가 아닙니다. 선택을 다시 해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (!coordiName.trim()) {
      alert("코디 이름을 입력하세요.");
      setIsSubmitting(false);
      return;
    }
    if (items.length === 0) {
      alert("옷을 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    const dataToSend = {
      title: coordiName.trim(),
      date: formatDate(selectedDate),
      weather: "맑음",
      items,
    };

    console.log("[coordination payload]", dataToSend);

    try {
      if (isEditMode) {
        await axios.put(`${process.env.REACT_APP_API}/api/coordination/${editCalendarId}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        alert("코디 수정 성공!");
        navigate("/CalendarDetail", {
          state: { calendarId: editCalendarId, selectedDate: formatDate(selectedDate) },
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API}/api/coordination`, dataToSend, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        alert("코디 등록 성공!");
        navigate("/Calendarpage");
      }
    } catch (err) {
      console.error("등록/수정 실패:", { status: err?.response?.status, data: err?.response?.data });
      alert(`요청 실패: ${err?.response?.data?.message || "서버 오류"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <C.Background>
      <C.TopBox>
        <TopBar />
      </C.TopBox>

      <C.Container>
        <C.Header>
          <C.BackButton onClick={() => navigate(-1)}>
            <img src={backButton} alt="뒤로" />
          </C.BackButton>
          <C.Title>{isEditMode ? "코디 수정하기" : "코디 기록하기"}</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.dateContainer>
            <button
              onClick={() => setIsCalendarOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <img src={calendar_black} alt="calendar_black" />
            </button>
            <C.Title1>
              {selectedDate.toLocaleDateString("ko-KR").replace(/\. /g, "-").replace(".", "")}
            </C.Title1>
          </C.dateContainer>
          <C.RegisterContainer>
            <C.Register>촬영하기</C.Register>
            <Link to="/CalendarCreate3">
              <img src={smallPlus} alt="plus" />
            </Link>
          </C.RegisterContainer>
        </C.TitleBox1>

        <Modal isOpen={isCalendarOpen} onRequestClose={() => setIsCalendarOpen(false)}>
          <h3>날짜 선택</h3>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <button onClick={() => setIsCalendarOpen(false)}>닫기</button>
        </Modal>

        <C.CoordiNameInput
          type="text"
          placeholder="코디 이름을 입력하세요"
          value={coordiName}
          onChange={(e) => setCoordiName(e.target.value)}
        />

        {/* pointer 이벤트 최적화: touch 제스처 차단 */}
        <C.RandomBoard ref={boardRef} style={{ touchAction: "none" }}>
          {Object.entries(selectedImages)
            .filter(([, item]) => item && (item.croppedPath || item.imagePath))
            .map(([cat, item], index) => {
              const st = imageStyles[cat] || { top: "0%", left: "0%", size: 100 };
              return (
                <C.RandomItem
                  key={`${cat}-${index}`}
                  ref={(el) => { if (el) itemRefs.current[cat] = el; }}
                  $top={st.top}
                  $left={st.left}
                  style={{
                    position: "absolute",
                    width: `${st.size}%`,
                    cursor: dragState.isDragging && dragState.category === cat ? "grabbing" : "grab",
                    zIndex: dragState.category === cat ? 100 : 10 + index,
                    userSelect: "none",
                    touchAction: "none",
                    willChange: "left, top, width",
                    transition:
                      (dragState.isDragging && dragState.category === cat) ||
                      (resizeState.isResizing && resizeState.category === cat)
                        ? "none" : "left 60ms ease, top 60ms ease, width 60ms ease",
                  }}
                  onPointerDown={(e) => handlePointerDownDrag(cat, e)}
                  onPointerMove={handlePointerMoveDrag}
                  onPointerUp={handlePointerUpDrag}
                >
                  {(() => {
                    const rawPath = item.croppedPath || item.imagePath || "";
                    const fullPath = normalizeAbsoluteUrl(rawPath, process.env.REACT_APP_API); // ✅ 유틸 유지

                    return (
                      <img
                        src={fullPath}
                        alt={cat}
                        style={{ width: "100%", height: "auto", objectFit: "contain", pointerEvents: "none" }}
                        onError={(e) => {
                          console.warn("이미지 로드 실패:", fullPath);
                          e.target.style.display = "none";
                        }}
                        draggable={false}
                      />
                    );
                  })()}

                  {/* 삭제 버튼 */}
                  <div
                    onClick={() => handleImageSelect(cat, item)}
                    style={{
                      position: "absolute", top: 2, right: 2, width: 16, height: 16,
                      backgroundColor: "rgba(0,0,0,0.5)", color: "white", borderRadius: "50%",
                      fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", zIndex: 999, lineHeight: 1,
                    }}
                  >
                    ×
                  </div>

                  {/* 리사이즈 핸들 */}
                  <div
                    onPointerDown={(e) => handlePointerDownResize(cat, e)}
                    onPointerMove={handlePointerMoveResize}
                    onPointerUp={handlePointerUpResize}
                    style={{
                      width: 10, height: 10, backgroundColor: "gray",
                      position: "absolute", bottom: 0, right: 0,
                      cursor: "nwse-resize", touchAction: "none",
                    }}
                  />
                </C.RandomItem>
              );
            })}
        </C.RandomBoard>

        <C.ButtonContainer>
          <C.EditButton onClick={() => setIsBottomSheetOpen(true)}>옷장에서 선택</C.EditButton>
          <C.FinishButton onClick={handleSubmit} disabled={isSubmitting}>
            {isEditMode ? (isSubmitting ? "수정 중..." : "수정 완료") : (isSubmitting ? "등록 중..." : "등록하기")}
          </C.FinishButton>
        </C.ButtonContainer>

        {isBottomSheetOpen && (
          <C.BottomSheet style={{ zIndex: 9999 }}>
            <C.CloseButton onClick={() => setIsBottomSheetOpen(false)}>완료</C.CloseButton>
            <C.TabContainer>
              {categoryList.map((tab, index) => (
                <C.TabButton
                  key={index}
                  onClick={() => setSelectedTab(tab)}
                  style={selectedTab === tab ? { backgroundColor: "#CE9694" } : {}}
                >
                  {tab}
                </C.TabButton>
              ))}
            </C.TabContainer>
            <C.ImageContainer>
              <C.ImageGrid>
                {clothingData
                  .filter((item) => item.type === selectedTab)
                  .map((item, idx) => (
                    <C.ImageBox key={idx} onClick={() => handleImageSelect(selectedTab, item)}>
                      <img
                        src={normalizeAbsoluteUrl(item.croppedPath || "", process.env.REACT_APP_API)} // ✅ 유틸 유지
                        alt={`cloth-${item.clothid}`}
                      />
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
