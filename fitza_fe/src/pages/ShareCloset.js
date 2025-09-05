import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import axios from "axios";
import html2canvas from "html2canvas";

import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";
import down from "../img/shareClosetPage_download.png";
import edit from "../img/shareClosetPage_edit.png";
import addoutfitbutton from "../img/shareClosetPage_addoutfitbutton.png";

import { normalizeAbsoluteUrl } from "../utils/url.ts";



function ShareCloset() {
  // 1) 프로필 상태
  const [nickname, setNickname] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // 서버에서 온 문자열(상대/절대) 또는 File
  const [previewImage, setPreviewImage] = useState(null);
  const [intro, setIntro] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  // 2) 오늘의 코디 / 공유 코디
  const [showTodayOutfit, setShowTodayOutfit] = useState(false);
  const [showOutfitList, setShowOutfitList] = useState(false);
  const [todayCoordi, setTodayCoordi] = useState(null);
  const [sharedCoordis, setSharedCoordis] = useState([]);

  const navigate = useNavigate();
  const profileRef = useRef();

  const API_BASE = process.env.REACT_APP_API; 

  const handleBackClick = () => navigate(-1);

  const openShareDetail = (shareId) => {
    if (!shareId) return;
    navigate("/sharedetail", { state: { shareId } }); // state 전달 방식
  };

  // yyyy.mm.dd 형태로 변환
  const formatDateForDisplay = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  // 오늘의 코디 상세 이동
  const openTodayDetail = () => {
    if (!todayCoordi?.calendarId || !todayCoordi?.date) return;
    const selectedDate = formatDateForDisplay(todayCoordi.date);
    navigate("/CalendarDetail", {
      state: { selectedDate, calendarId: todayCoordi.calendarId },
    });
  };


  // 파일 업로드 핸들러(프로필)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file instanceof File) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      console.warn("이미지 파일이 아님");
    }
  };

  // 태그 입력
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      setTags((prev) => [...prev, tag.trim()]);
      setTag("");
    }
  };
  const handleTagDelete = (t) => setTags(tags.filter((x) => x !== t));

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const toggleOutfitList = () => {
    setShowOutfitList((v) => !v);
    setShowTodayOutfit(false);
  };
  const toggleTodayOutfit = () => {
    setShowTodayOutfit((v) => !v);
    setShowOutfitList(false);
  };

  // KST 날짜(yyyy-mm-dd)
  const getTodayKST = () => {
    const now = new Date();
    const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return kst.toISOString().split("T")[0];
  };

  // 마이페이지(닉네임)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    fetch(normalizeAbsoluteUrl("mypage", API_BASE), {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const n = data?.data?.nickname;
        setNickname(typeof n === "string" ? n : "이름없음");
      })
      .catch((e) => {
        console.error("마이페이지 실패:", e);
        setNickname("오류");
      });
  }, [API_BASE]);

  // 프로필 조회
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    fetch(normalizeAbsoluteUrl("api/profile", API_BASE), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const d = data?.data;
        if (!d) return;
        setNickname(d.nickname || "");
        setIntro(d.comment || "");
        setTags((d.style || "").split(",").map((s) => s.trim()).filter(Boolean));
        setProfileImage(d.imagePath || null); // 문자열(상대/절대) 그대로 유지
      })
      .catch((e) => console.error("프로필 조회 실패:", e));
  }, [API_BASE]);

  // 프로필 저장
  const handleSaveProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fd = new FormData();

    if (profileImage instanceof File) fd.append("file", profileImage);
    if (tags.length > 0) fd.append("style", tags.join(", "));
    if (intro.trim()) fd.append("comment", intro.trim());

    try {
      const res = await axios.post(normalizeAbsoluteUrl("api/profile", API_BASE), fd, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = res.data?.data;
      if (d) {
        setProfileImage(d.imagePath || null);
        setIntro(d.comment || "");
        setTags((d.style || "").split(",").map((s) => s.trim()).filter(Boolean));
        setNickname(d.nickname || "");
      }
      closeEditModal();

      // 선택: 화면 캡처 (필요 시만 사용)
      setTimeout(() => handleCaptureFullPage(), 400);
    } catch (e) {
      console.error("프로필 저장 실패:", e?.response?.data || e?.message);
    }
  };

  // 페이지 캡처
const waitForImagesToLoad = async (root = document) => {
  const imgs = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => {
            img.onload = img.onerror = res;
          })
    )
  );
};

const handleCaptureFullPage = async () => {
  try {
    await waitForImagesToLoad(document); // ⬅️ 모든 이미지 로딩 대기
    const canvas = await html2canvas(document.body, {
      useCORS: true,
      allowTaint: false,
      logging: true,
      scale: 2,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${(nickname || "user").trim() || "user"}.png`;
    link.click();
  } catch (err) {
    console.error("캡처 오류:", err);
  }
};

  // 오늘의 코디 메타
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios.get(normalizeAbsoluteUrl("api/coordination/my", API_BASE), { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const today = getTodayKST();
        const item = (res.data || []).find((it) => new Date(it.date).toISOString().split("T")[0] === today);
        setTodayCoordi(item || null);
      })
      .catch((e) => console.error("오늘의 코디 목록 실패:", e));
  }, [API_BASE]);

  // 오늘의 코디 상세
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || !todayCoordi?.calendarId) return;

    axios.get(normalizeAbsoluteUrl(`api/coordination/${todayCoordi.calendarId}`, API_BASE), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTodayCoordi((prev) => ({ ...prev, ...(res.data || {}) })))
      .catch((e) => console.error("오늘의 코디 상세 실패:", e));
  }, [API_BASE, todayCoordi?.calendarId]);

  // 공유 코디
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios.get(normalizeAbsoluteUrl("api/share/my", API_BASE), { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setSharedCoordis(res.data || []))
      .catch((e) => console.error("공유 코디 실패:", e));
  }, [API_BASE]);


  const handleGoToCalendarCreate = () => navigate("/sharecloset2");

  return (
    <SC.Background>
      <SC.TopBox>
        <TopBar />
      </SC.TopBox>

      <SC.Container>
        <SC.Header>
          <SC.Back onClick={handleBackClick}>
            <img src={backIcon} alt="back" />
          </SC.Back>
          <SC.Title>옷장 공유</SC.Title>
        </SC.Header>

        <SC.ContentBox>
          <div style={{ fontFamily: "NanumSquareNeo", fontSize: "15px", fontWeight: "bold", color: "white" }}>
            {nickname}의 옷장
          </div>

          <SC.DashandBox>
            <SC.GrayBox>
              <SC.TopBox2>
                <SC.TodayTotal />
                <SC.Friends>
                  <SC.FriendLink to="/friends">
                    <img src={friends} alt="find friends" />
                  </SC.FriendLink>
                </SC.Friends>
              </SC.TopBox2>

              <SC.WhiteBox ref={profileRef}>
                <SC.ProfImg>
                  {profileImage ? (
                    (() => {
                      const src = profileImage instanceof File
                        ? previewImage
                        : normalizeAbsoluteUrl(profileImage, API_BASE);
                      return src ? (
                        <img
                          src={src}
                          crossOrigin="anonymous"
                          alt="profile"
                          onError={(e) => {
                            console.error("프로필 이미지 로딩 실패:", src);
                            e.currentTarget.style.display = "none"; // 디폴트 치환 없이 숨김
                          }}
                        />
                      ) : (
                        <div className="no-image-text">프로필 이미지 경로 없음</div>
                      );
                    })()
                  ) : (
                    <div className="no-image-text">프로필 사진을 <br /> 등록해주세요</div>
                  )}
                </SC.ProfImg>

                <SC.ProfTxt>
                  <SC.NameBox>
                    <SC.Name>{nickname}</SC.Name>
                    <SC.Down onClick={handleCaptureFullPage}>
                      <img src={down} alt="download" />
                    </SC.Down>
                    <SC.Edit onClick={openEditModal}>
                      <img src={edit} alt="edit" />
                    </SC.Edit>
                  </SC.NameBox>
                  <SC.Intro>{intro || "자기소개가 없습니다."}</SC.Intro>
                  <SC.Tag>
                    {tags.map((t, i) => (
                      <SC.TagItem key={`${t}-${i}`}>
                        {t}
                        <span onClick={() => handleTagDelete(t)} style={{ cursor: "pointer", marginLeft: 5 }}>
                          X
                        </span>
                      </SC.TagItem>
                    ))}
                  </SC.Tag>
                </SC.ProfTxt>
              </SC.WhiteBox>

              <SC.WhiteBox2>
                <SC.ToggleBox>
                  <SC.ToggleButton onClick={toggleTodayOutfit} $isActive={showTodayOutfit}>
                    오늘의 코디
                  </SC.ToggleButton>
                  <SC.ToggleButton onClick={toggleOutfitList} $isActive={showOutfitList}>
                    코디 목록
                  </SC.ToggleButton>
                </SC.ToggleBox>

                <SC.ContentBox2>
                  {showTodayOutfit && (
                    <SC.RecentOutfit>
                      {todayCoordi && todayCoordi.items?.length > 0 ? (
                        <SC.OutfitBox3>
                          <div>{todayCoordi.title}</div>
                          <SC.RandomBoard>
                            {todayCoordi.items.map((item, idx) => {
                              const { x = 0, y = 0, size = 30 } = item || {};
                              const rawPath = item?.croppedPath || item?.imagePath || "";
                              const src = normalizeAbsoluteUrl(rawPath, API_BASE);
                              return (
                                <SC.RandomItem
                                  key={`${rawPath}-${idx}`}
                                  style={{ left: `${x}%`, top: `${y}%`, width: `${size}%`, zIndex: 10 + idx }}
                                >
                                  {src ? (
                                    <img
                                      src={src}
                                      crossOrigin="anonymous"
                                      alt={`item-${idx}`}
                                      style={{ width: "100%", height: "auto", objectFit: "contain", pointerEvents: "none" }}
                                      draggable={false}
                                      onError={(e) => {
                                        console.error("오늘의 코디 이미지 로딩 실패:", src);
                                        e.currentTarget.style.display = "none"; // 치환 없음
                                      }}
                                    />
                                  ) : (
                                    <div style={{ color: "#999", fontSize: 12 }}>이미지 경로 없음</div>
                                  )}
                                </SC.RandomItem>
                              );
                            })}
                          </SC.RandomBoard>
                        </SC.OutfitBox3>
                      ) : (
                        <SC.OutfitBox3>
                          <div style={{ color: "white" }}>오늘의 코디가 없습니다</div>
                        </SC.OutfitBox3>
                      )}
                    </SC.RecentOutfit>
                  )}

                  {showOutfitList && (
  <SC.OutfitList>
    <SC.OutfitBox1>
      <div>코디 등록하기</div>
      <SC.AddOutfitButton onClick={() => navigate("/sharecloset2")}>
        <img src={addoutfitbutton} alt="addoutfitbutton" />
      </SC.AddOutfitButton>
    </SC.OutfitBox1>

    {sharedCoordis.length === 0 ? (
      <SC.OutfitBox2>
        <div>공유된 코디가 없습니다</div>
      </SC.OutfitBox2>
    ) : (
      sharedCoordis.map((coordi, index) => {
        const shareId = coordi.shareId ?? coordi.id; // 백엔드 필드 두 가지 대응
        return (
          <SC.OutfitBox2
            key={`coordi-${index}`}
            onClick={() => openShareDetail(shareId)}   // ⬅️ 클릭 시 상세로
            style={{ cursor: "pointer" }}
            role="button"
            aria-label={`${coordi.title} 상세보기`}
          >
            <div style={{ fontWeight: "bold", marginBottom: 6 }}>{coordi.title}</div>
            <SC.RandomBoard style={{ position: "relative", height: 300 }}>
              {(coordi.items || []).map((item, idx) => {
                const { x = 0, y = 0, size = 30 } = item || {};
                const rawPath = item?.croppedPath || item?.imagePath || "";
                const src = normalizeAbsoluteUrl(rawPath, API_BASE); // ⬅️ 배포용 유틸로 정규화
                return (
                  <SC.RandomItem
                    key={`${rawPath}-${idx}`}
                    style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: `${size}%`, zIndex: 10 + idx }}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={`item-${idx}`}
                        crossOrigin="anonymous"
                        style={{ width: "100%", height: "auto", objectFit: "contain", pointerEvents: "none" }}
                        draggable={false}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div style={{ color: "#999", fontSize: 12 }}>이미지 경로 없음</div>
                    )}
                  </SC.RandomItem>
                );
              })}
            </SC.RandomBoard>
          </SC.OutfitBox2>
        );
      })
    )}
  </SC.OutfitList>
)}
                </SC.ContentBox2>
              </SC.WhiteBox2>
            </SC.GrayBox>
          </SC.DashandBox>
        </SC.ContentBox>
      </SC.Container>

      <SC.BottomBox>
        <Footer />
      </SC.BottomBox>

      {isEditModalOpen && (
        <SC.ModalOverlay>
          <SC.ModalContent>
            <h3>프로필 편집</h3>

            <SC.ProfileImageBox>
              <SC.ProfileImagePreview>
                {profileImage ? (
                  (() => {
                    const src = profileImage instanceof File
                       ? previewImage
                       : normalizeAbsoluteUrl(profileImage, API_BASE);
                    return src ? (
                      <img
                        src={src}
                        crossOrigin="anonymous"
                        alt="프로필 이미지"
                        className="profile-image-preview"
                        onError={(e) => {
                          console.error("프로필 미리보기 로딩 실패:", src);
                          e.currentTarget.style.display = "none"; // 치환 없음
                        }}
                      />
                    ) : (
                      <div>이미지 경로 없음</div>
                    );
                  })()
                ) : (
                  <div>현재 프로필 사진이 없습니다</div>
                )}
              </SC.ProfileImagePreview>

              <label htmlFor="file-upload" style={{ cursor: "pointer", color: "black", fontSize: 10, textAlign: "center", backgroundColor: "white" }}>
                갤러리에서 프로필 사진 등록하기 ▶
              </label>
              <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </SC.ProfileImageBox>

            <SC.InputBox>
              <span>닉네임</span>
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder={nickname} />
            </SC.InputBox>

            <SC.TextareaBox>
              <span>코멘트</span>
              <textarea value={intro} onChange={(e) => setIntro(e.target.value)} placeholder={intro} maxLength={50} />
            </SC.TextareaBox>

            <SC.InputTagBox>
              <span>태그</span>
              <textarea value={tag} onChange={(e) => setTag(e.target.value)} placeholder="태그를 입력하고 엔터를 누르세요" onKeyPress={handleKeyPress} />
            </SC.InputTagBox>
            <SC.TagList>
              {tags.map((item, idx) => (
                <SC.Tag key={`${item}-${idx}`}>
                  {item}
                  <span onClick={() => handleTagDelete(item)}>X</span>
                </SC.Tag>
              ))}
            </SC.TagList>

            <SC.ButtonBox>
              <SC.SaveButton type="button" onClick={handleSaveProfile}>
                저장
              </SC.SaveButton>
              <SC.CancelButton onClick={closeEditModal}>취소</SC.CancelButton>
            </SC.ButtonBox>
          </SC.ModalContent>
        </SC.ModalOverlay>
      )}
    </SC.Background>
  );
}

export default ShareCloset;
