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
    const [nickname, setNickname] = useState(""); // 닉네임
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 편집 모달
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지
    const [intro, setIntro] = useState(""); // 자기소개
    const [tag, setTag] = useState('');  // 태그 입력 필드 값
    const [tags, setTags] = useState([]); // 태그 배열 상태

    // 사용자 닉네임 정보 가져오기
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("로그인 토큰이 없습니다.");
            return;
        }

        // 🔹 닉네임 가져오기
        fetch("http://localhost:8080/mypage", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("마이페이지 응답:", data);
                const nicknameValue = data?.data?.nickname;
                if (typeof nicknameValue === "string") {
                    setNickname(nicknameValue);
                } else {
                    console.warn("nickname 없음 또는 잘못된 형식:", data);
                    setNickname("이름없음");
                }
            })
            .catch(error => {
                console.error("닉네임 가져오기 실패:", error);
                setNickname("오류");
            });

    }, []);

    // 프사 업로드
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);  // 이미지 파일 자체 저장
        }
    };

    // 태그 입력 후 엔터 누를 때
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && tag.trim() !== '') {
            setTags((prevTags) => [...prevTags, tag.trim()]);
            setTag(''); // 입력 필드 비우기
        }
    };

    // 태그 삭제
    const handleTagDelete = (tagToDelete) => {
        setTags(tags.filter((item) => item !== tagToDelete));
    };

    // 프로필 사진 저장하기
    const handleSaveProfile = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("로그인 토큰이 없습니다.");
            return;
        }

        const formData = new FormData();

        // 프로필 이미지 File인지 확인
        if (profileImage instanceof File) {
            formData.append("file", profileImage);
        } else {
            console.warn("파일이 없습니다. 혹은 File 객체가 아닙니다.");
            return;
        }

        // 스타일
        if (tags.length > 0) {
            formData.append("style", tags.join(', '));
        } else {
            console.warn("스타일 태그가 없습니다.");
            return;
        }

        // 코멘트
        if (intro.trim()) {
            formData.append("comment", intro.trim());
        } else {
            console.warn("코멘트가 없습니다.");
            return;
        }

        // 디버깅용 로그
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post("http://localhost:8080/api/profile", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const resData = response.data?.data;
            localStorage.setItem("profileImage", resData.imagePath);
            setProfileImage(resData.imagePath);
            setIntro(resData.comment);
            setTags(resData.style.split(',').map(tag => tag.trim()));
            setNickname(resData.nickname);



            console.log("프로필 업데이트 성공:", resData);

            closeEditModal();

        } catch (error) {
            console.error("프로필 업데이트 실패:", error.response?.data || error.message);
        }


    };

    // 프로필 이미지 가져오기
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("토큰이 없습니다.");
            return;
        }

        fetch("http://localhost:8080/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("프로필 정보 응답:", data);
                const resData = data?.data;
                if (resData) {
                    setNickname(resData.nickname);
                    setIntro(resData.comment);
                    setTags(resData.style.split(',').map(tag => tag.trim()));
                    setProfileImage(resData.imagePath); // 문자열 경로로 저장
                    console.log("🔥 profileImage:", resData.imagePath);


                }
            })
            .catch(err => {
                console.error("프로필 정보 가져오기 실패:", err);
            });
    }, []);

    // 이미지 다운로드
    const profileRef = useRef();
    const handleDownloadProfileBox = () => {
        if (!profileRef.current) return;

        html2canvas(profileRef.current, {
            useCORS: true,
            allowTaint: false,
            logging: true,
            scale: 2, // 해상도 개선
        }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'profile-box.png';
            link.click();
        }).catch(err => {
            console.error("다운로드 오류:", err);
        });
    };


    /* ================================================================== */
    /* 2. 방문자수 설정 */

    const [showTodayOutfit, setShowTodayOutfit] = useState(false);
    const [showOutfitList, setShowOutfitList] = useState(false);

    const navigate = useNavigate();  // useNavigate 훅 사용

    const handleBackClick = () => {
        navigate(-1);  // 이전 페이지로 이동
    };



    /* ================================================================== */
    /* 3. 모달1 - 오늘의 코디 */

    /* 모달 열기/닫기 */
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const toggleOutfitList = () => {
        setShowOutfitList(prevState => !prevState);
        setShowTodayOutfit(false); // 다른 콘텐츠가 열릴 때는 자동으로 닫히게 설정
    };

    // 버튼 클릭 시 토글 상태 변경
    // 오늘의 코디 
    const toggleTodayOutfit = () => {
        setShowTodayOutfit(prevState => !prevState);
        setShowOutfitList(false); // 다른 콘텐츠가 열릴 때는 자동으로 닫히게 설정
    };

    // 오늘의 코디 상태
    const [todayCoordi, setTodayCoordi] = useState(null);
    const [todayCoordiImages, setTodayCoordiImages] = useState([]);

    // KST 기준 날짜 계산 함수
    function getTodayKST() {
        const now = new Date();
        const kstOffset = 9 * 60 * 60 * 1000;
        const kstDate = new Date(now.getTime() + kstOffset);
        return kstDate.toISOString().split('T')[0];
    }

    // 오늘의 코디 메타 데이터 가져오기 (한 번만 실행)
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        axios.get("http://localhost:8080/api/coordination/my", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const todayStr = getTodayKST();
                console.log("한국 기준 오늘 날짜:", todayStr);
                console.log("서버 응답:", res.data.map(d => d.date));

                const todayItem = res.data.find(item => {
                    const itemDateStr = new Date(item.date).toISOString().split('T')[0];
                    return itemDateStr === todayStr;
                });

                setTodayCoordi(todayItem || null);
            })
            .catch(err => {
                console.error("오늘의 코디 불러오기 실패", err);
            });
    }, []);

    // 오늘의 코디 이미지 가져오기 (todayCoordi가 바뀔 때 실행)
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token || !todayCoordi?.calendarId) return;

        axios.get(`http://localhost:8080/api/coordination/${todayCoordi.calendarId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const imagePaths = res.data.items.map(item => item.croppedPath); // 또는 imagePath
                setTodayCoordiImages(imagePaths);
            })
            .catch(err => {
                console.error("오늘의 코디 상세 이미지 불러오기 실패", err);
            });
    }, [todayCoordi]);




    // 공유 코디
    const handleGoToCalendarCreate = () => {
        navigate("/sharecloset2"); // 또는 원하는 경로
    };

    const [sharedCoordis, setSharedCoordis] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        axios.get("http://localhost:8080/api/share/my", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setSharedCoordis(response.data);
            })
            .catch(error => {
                console.error("공유 코디 불러오기 실패:", error);
            });
    }, []);



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
                                <SC.TodayTotal></SC.TodayTotal>
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
                                                    ? `http://localhost:8080/${profileImage.replace(/^\/+/, '')}`
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
                                        <SC.Down onClick={handleDownloadProfileBox}> <img src={down} alt="download" /></SC.Down>
                                        <SC.Edit onClick={openEditModal}> <img src={edit} alt="edit" /> </SC.Edit>
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
                                            {todayCoordi ? (
                                                <SC.OutfitBox3>
                                                    <div > {todayCoordi.title}<br /> </div>
                                                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }} >
                                                        {todayCoordiImages.map((src, idx) => (
                                                            <img key={idx} src={`http://localhost:8080${src}`} alt={`coordi-${idx}`} style={{ height: "60px" }} />
                                                        ))}
                                                    </div>
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
                                                sharedCoordis.map((coordi, index) => (
                                                    <SC.OutfitBox2 key={index}>
                                                        <div>{coordi.title}</div>
                                                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                                            {coordi.items.slice(0, 3).map((item, idx) => (
                                                                <img
                                                                    key={idx}
                                                                    src={`http://localhost:8080${item.croppedPath}`}
                                                                    alt={`item-${idx}`}
                                                                    style={{ height: '45px' }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </SC.OutfitBox2>

                                                ))
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

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}

            {/* 1. 편집 모달 */}

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}
            {isEditModalOpen && (
                <SC.ModalOverlay>
                    <SC.ModalContent>
                        <h3>프로필 편집</h3>
                        <SC.ProfileImageBox>
                            {/* 프로필 사진 수정 */}
                            <SC.ProfileImagePreview>
                                {profileImage ? (
                                    <img src={profileImage} alt="프로필 이미지" className="profile-image-preview" />
                                ) : (
                                    <div>현재 프로필 사진이 없습니다</div>
                                )}
                            </SC.ProfileImagePreview>
                            {/* 커스터마이즈된 파일 선택 버튼 */}
                            <label
                                htmlFor="file-upload"
                                style={{
                                    cursor: 'pointer',
                                    color: 'black',
                                    fontSize: '10px', // 글씨 크기
                                    textAlign: 'center', // 텍스트 중앙 정렬
                                    backgroundColor: 'white',
                                }}

                            >
                                갤러리에서 프로필 사진 등록하기 ▶
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageUpload} // 이미지 업로드 핸들러
                                style={{ display: 'none' }} // 기본 input을 숨깁니다
                            />
                        </SC.ProfileImageBox>

                        {/* 닉네임 입력 */}
                        <SC.InputBox>
                            <span>닉네임</span>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder={nickname}
                            />
                        </SC.InputBox>

                        {/* 자기소개 입력 */}
                        <SC.TextareaBox>
                            <span>코멘트</span>
                            <textarea
                                value={intro}
                                onChange={(e) => setIntro(e.target.value)}
                                placeholder={intro}
                                maxLength={50}
                            />
                        </SC.TextareaBox>

                        <SC.InputTagBox>
                            <span>태그</span>
                            <textarea
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="태그를 입력하고 엔터를 누르세요"
                                onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
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

                        {/* 버튼들 */}
                        <SC.ButtonBox>
                            <SC.SaveButton onClick={handleSaveProfile}>저장</SC.SaveButton>
                            <SC.CancelButton onClick={closeEditModal}>취소</SC.CancelButton>
                        </SC.ButtonBox>
                    </SC.ModalContent>
                </SC.ModalOverlay>
            )


            }
            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}

            {/* 2.  */}

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}


        </SC.Background >
    );
}

export default ShareCloset;
