import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import axios from "axios";
import html2canvas from 'html2canvas';

// 이미지 주소
import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";
import down from "../img/shareClosetPage_download.png";
import edit from "../img/shareClosetPage_edit.png";
import addoutfitbutton from "../img/shareClosetPage_addoutfitbutton.png";

function ShareCloset() {
  // ==================================================================
  // 1. 프로필 설정
  const [nickname, setNickname] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [intro, setIntro] = useState("");
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("로그인 토큰이 없습니다.");
      return;
    }
    fetch(`${process.env.REACT_APP_API}/mypage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const nicknameValue = data?.data?.nickname;
        if (typeof nicknameValue === "string") {
          setNickname(nicknameValue);
        } else {
          setNickname("이름없음");
        }
      })
      .catch(() => setNickname("오류"));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file instanceof File) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      console.warn("⚠️ 올바른 이미지 파일이 아닙니다.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && tag.trim() !== '') {
      setTags((prevTags) => [...prevTags, tag.trim()]);
      setTag('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((item) => item !== tagToDelete));
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const formData = new FormData();
    if (profileImage instanceof File) {
      formData.append("file", profileImage);
    } else {
      console.warn("파일이 없습니다. 혹은 File 객체가 아닙니다.");
      return;
    }
    if (tags.length > 0) {
      formData.append("style", tags.join(', '));
    } else {
      console.warn("스타일 태그가 없습니다.");
      return;
    }
    if (intro.trim()) {
      formData.append("comment", intro.trim());
    } else {
      console.warn("코멘트가 없습니다.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/profile`, formData, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const resData = response.data?.data;
      localStorage.setItem("profileImage", resData.imagePath);
      setProfileImage(resData.imagePath);
      setIntro(resData.comment);
      setTags(resData.style.split(',').map(tag => tag.trim()));
      setNickname(resData.nickname);
      closeEditModal();
      setTimeout(() => handleCaptureFullPage(), 500);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error.response?.data || error.message);
    }
  };

  const handleCaptureFullPage = () => {
    const element = document.body;
    html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      logging: true,
      scale: 2,
      width: window.innerWidth,
      height: window.innerHeight,
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      const safeName = nickname && nickname.trim() !== "" ? nickname : "user";
      link.download = `${safeName}.png`;
      link.click();
    }).catch(err => console.error("전체 페이지 캡처 오류:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    fetch(`${process.env.REACT_APP_API}/api/profile`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const resData = data?.data;
        if (resData) {
          setNickname(resData.nickname);
          setIntro(resData.comment);
          setTags(resData.style.split(',').map(tag => tag.trim()));
          setProfileImage(resData.imagePath);
        }
      })
      .catch(err => console.error("프로필 정보 가져오기 실패:", err));
  }, []);

  const profileRef = useRef();
  const handleDownloadProfileBox = () => {
    if (!profileRef.current) return;
    html2canvas(profileRef.current, {
      useCORS: true,
      allowTaint: false,
      logging: true,
      scale: 2,
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'profile-box.png';
      link.click();
    }).catch(err => console.error("다운로드 오류:", err));
  };

  /* ================================================================== */
  /* 2. 방문자수 / 네비게이션 */
  const [showTodayOutfit, setShowTodayOutfit] = useState(false);
  const [showOutfitList, setShowOutfitList] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  /* ================================================================== */
  /* 3. 오늘의 코디 */
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const toggleOutfitList = () => { setShowOutfitList(prev => !prev); setShowTodayOutfit(false); };
  const toggleTodayOutfit = () => { setShowTodayOutfit(prev => !prev); setShowOutfitList(false); };

  const [todayCoordi, setTodayCoordi] = useState(null);

  function getTodayKST() {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kstOffset);
    return kstDate.toISOString().split('T')[0];
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios.get(`${process.env.REACT_APP_API}/api/coordination/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const todayStr = getTodayKST();
        const todayItem = res.data.find(item => {
          const itemDateStr = new Date(item.date).toISOString().split('T')[0];
          return itemDateStr === todayStr;
        });
        setTodayCoordi(todayItem || null);
      })
      .catch(err => console.error("오늘의 코디 불러오기 실패", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || !todayCoordi?.calendarId) return;

    axios.get(`${process.env.REACT_APP_API}/api/coordination/${todayCoordi.calendarId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTodayCoordi(prev => ({ ...prev, ...res.data })))
      .catch(err => console.error("오늘의 코디 상세 조회 실패:", err));
  }, [todayCoordi?.calendarId]);

  // 공유 코디
  const handleGoToCalendarCreate = () => navigate("/sharecloset2");

  const [sharedCoordis, setSharedCoordis] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios.get(`${process.env.REACT_APP_API}/api/share/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setSharedCoordis(response.data))
      .catch(error => console.error("공유 코디 불러오기 실패:", error));
  }, []);

  // 🔹 카드 클릭 → state 방식으로 ShareDetail 진입 (옵션 B)
  const openShareDetail = (shareId) => {
    if (!shareId) return;
    navigate("/ShareDetail", { state: { shareId } });
  };

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
                    <img
                      src={
                        typeof profileImage === "string"
                          ? `${process.env.REACT_APP_API}/${profileImage.replace(/^\/+/, '')}`
                          : URL.createObjectURL(profileImage)
                      }
                      alt="profile"
                      onError={(e) => (e.target.src = "/img/default.png")}
                    />
                  ) : (
                    <div className="no-image-text">프로필 사진을 <br /> 등록해주세요</div>
                  )}
                </SC.ProfImg>

                <SC.ProfTxt>
                  <SC.NameBox>
                    <SC.Name>{nickname} </SC.Name>
                    <SC.Down onClick={handleCaptureFullPage}><img src={down} alt="download" /></SC.Down>
                    <SC.Edit onClick={openEditModal}><img src={edit} alt="edit" /></SC.Edit>
                  </SC.NameBox>
                  <SC.Intro>{intro || "자기소개가 없습니다."}</SC.Intro>
                  <SC.Tag>
                    {tags.map((tag, index) => (
                      <SC.TagItem key={index}>
                        {tag}
                        <span onClick={() => handleTagDelete(tag)} style={{ cursor: 'pointer', marginLeft: '5px' }}>X</span>
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
                              const { x = 0, y = 0, size = 30 } = item;
                              return (
                                <SC.RandomItem
                                  key={idx}
                                  style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    width: `${size}%`,
                                    zIndex: 10 + idx,
                                  }}
                                >
                                  <img
                                    src={`${process.env.REACT_APP_API}/${(item.croppedPath || item.imagePath).replace(/^\/+/, '')}`}
                                    alt={`item-${idx}`}
                                    style={{ width: "100%", height: "auto", objectFit: "contain", pointerEvents: "none" }}
                                    draggable={false}
                                  />
                                </SC.RandomItem>
                              );
                            })}
                          </SC.RandomBoard>
                        </SC.OutfitBox3>
                      ) : (
                        <SC.OutfitBox3>
                          <div style={{ color: 'white' }}>오늘의 코디가 없습니다</div>
                        </SC.OutfitBox3>
                      )}
                    </SC.RecentOutfit>
                  )}

                  {showOutfitList && (
                    <SC.OutfitList>
                      <SC.OutfitBox1>
                        <div>코디 등록하기</div>
                        <SC.AddOutfitButton onClick={handleGoToCalendarCreate}>
                          <img src={addoutfitbutton} alt="addoutfitbutton" />
                        </SC.AddOutfitButton>
                      </SC.OutfitBox1>

                      {sharedCoordis.length === 0 ? (
                        <SC.OutfitBox2>
                          <div>공유된 코디가 없습니다</div>
                        </SC.OutfitBox2>
                      ) : (
                        sharedCoordis.map((coordi, index) => {
                          const shareId = coordi.shareId ?? coordi.id; // 백 필드명에 맞게 사용
                          return (
                            <SC.OutfitBox2
                              key={index}
                              onClick={() => openShareDetail(shareId)}
                              style={{ cursor: "pointer" }}
                              role="button"
                              aria-label={`${coordi.title} 상세보기`}
                            >
                              <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>{coordi.title}</div>
                              <SC.RandomBoard style={{ position: 'relative', height: '300px' }}>
                                {coordi.items.map((item, idx) => {
                                  const { x = 0, y = 0, size = 30 } = item;
                                  const rawPath = item.croppedPath || item.imagePath || "";
                                  const fullPath = rawPath.startsWith("http")
                                    ? rawPath
                                    : `${process.env.REACT_APP_API}/${rawPath.replace(/^\//, "")}`;
                                  return (
                                    <SC.RandomItem
                                      key={idx}
                                      style={{
                                        position: "absolute",
                                        left: `${x}%`,
                                        top: `${y}%`,
                                        width: `${size}%`,
                                        zIndex: 10 + idx,
                                      }}
                                    >
                                      <img
                                        src={fullPath}
                                        alt={`item-${idx}`}
                                        style={{ width: "100%", height: "auto", objectFit: "contain", pointerEvents: "none" }}
                                        draggable={false}
                                        onError={(e) => { e.target.style.display = "none"; }}
                                      />
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

      {/* 편집 모달 */}
      {isEditModalOpen && (
        <SC.ModalOverlay>
          <SC.ModalContent>
            <h3>프로필 편집</h3>
            <SC.ProfileImageBox>
              <SC.ProfileImagePreview>
                {profileImage ? (
                  typeof profileImage === "string" ? (
                    <img
                      src={`${process.env.REACT_APP_API}/${profileImage.replace(/^\/+/, '')}`}
                      alt="프로필 이미지"
                      className="profile-image-preview"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="프로필 이미지"
                      className="profile-image-preview"
                    />
                  )
                ) : (
                  <div>현재 프로필 사진이 없습니다</div>
                )}
              </SC.ProfileImagePreview>

              <label htmlFor="file-upload" style={{ cursor: 'pointer', color: 'black', fontSize: '10px', textAlign: 'center', backgroundColor: 'white' }}>
                갤러리에서 프로필 사진 등록하기 ▶
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
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
              <textarea
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="태그를 입력하고 엔터를 누르세요"
                onKeyPress={handleKeyPress}
              />
            </SC.InputTagBox>

            <SC.TagList>
              {tags.map((item, index) => (
                <SC.Tag key={index}>
                  {item}
                  <span onClick={() => handleTagDelete(item)}>X</span>
                </SC.Tag>
              ))}
            </SC.TagList>

            <SC.ButtonBox>
              <SC.SaveButton type="button" onClick={handleSaveProfile}>저장</SC.SaveButton>
              <SC.CancelButton onClick={closeEditModal}>취소</SC.CancelButton>
            </SC.ButtonBox>
          </SC.ModalContent>
        </SC.ModalOverlay>
      )}
    </SC.Background>
  );
}

export default ShareCloset;
