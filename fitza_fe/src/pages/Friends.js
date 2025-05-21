import React, { useState, useEffect } from "react";
import * as F from "../styles/FriendsStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import axios from 'axios';



// 이미지 주소
import find from "../img/friendspage_find.png";
import backIcon from "../img/backButton.png";

function Friends() {

    const [friends, setFriends] = useState([]);  // 친구 목록 상태
    const [searchTerm, setSearchTerm] = useState("");  // 검색어 상태
    const [showModal, setShowModal] = useState(false);  // 모달 표시 상태
    const [friendNumber, setFriendNumber] = useState("");  // 입력받은 친구 번호
    const [newFriend, setNewFriend] = useState(null);  // 추가된 친구 정보
    const navigate = useNavigate();


    //친구 목록 조회
    useEffect(() => {
        const token = localStorage.getItem("authToken");  // 토큰 가져오기

        axios.get("http://localhost:8080/api/friends/list", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setFriends(response.data.data);  // 응답의 data 필드 사용
            })
            .catch(error => {
                console.error("친구 목록 가져오기 실패", error);
            });
    }, [newFriend]);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddFriend = () => {
        setShowModal(true);  // 친구 추가 모달 열기
    };

    const handleAddFriendNumber = () => {
        if (!friendNumber) return;

        // 친구 번호로 친구 정보를 가져오는 API 호출
        axios.post("/api/add-friend", { friendNumber })
            .then(response => {
                setNewFriend(response.data);  // 추가된 친구 정보 상태에 저장
                setShowModal(false);  // 모달 닫기
                setFriendNumber("");  // 번호 입력 초기화
            })
            .catch(error => {
                console.error("친구 추가 실패", error);
                setShowModal(false);
            });
    };

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBackClick = () => {
        navigate(-1);  // 이전 페이지로 이동
    };

    return (
        <F.Background>
            <F.TopBox>
                <TopBar />
            </F.TopBox>

            <F.Container>
                <F.Header>
                    <F.Back onClick={handleBackClick}>
                        <img src={backIcon} alt="back" />
                    </F.Back>
                    <F.Title>친구 목록</F.Title>
                </F.Header>
                <F.TitleBox1>
                    <F.Title1>내 옷장 ᐳ 친구 목록</F.Title1>
                    <F.RegisterContainer>
                        <F.Register  >친구 추가하기</F.Register>

                        <F.AddFnd onClick={handleAddFriend}>
                            <img src={smallPlus} alt="plus" />
                        </F.AddFnd>

                    </F.RegisterContainer>
                </F.TitleBox1>

                <F.Search>
                    <F.SearchInput
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="친구 이름을 입력하세요"
                    />

                    <F.Find >
                        <F.FindImg>
                            <img src={find} alt="find" />
                        </F.FindImg>
                    </F.Find>
                </F.Search>

                <F.FriendList>
                    {filteredFriends.length > 0 ? (
                        filteredFriends.map((friend) => (
                            <F.FriendItem to={`/friendCloset/${friend.id}`} key={friend.id}>
                                {friend.nickname}
                            </F.FriendItem>
                        ))
                    ) : (
                        <p>친구가 없습니다.</p>
                    )}
                </F.FriendList>


            </F.Container >

            <F.BottomBox>
                <Footer />
            </F.BottomBox>


            {/* 친구 추가 모달 */}
            {
                showModal && (
                    <F.ModalOverlay>
                        <F.ModalContent>
                            <h3>친구 번호 입력</h3>
                            <F.TextareaBox>
                                <input
                                    type="text"
                                    value={friendNumber}
                                    onChange={(e) => setFriendNumber(e.target.value)}
                                    placeholder="- 없이 입력해주세요"
                                />
                            </F.TextareaBox>
                            <F.ButtonBox>
                                <F.SaveButton onClick={handleAddFriendNumber}>친구 추가</F.SaveButton>
                                <F.CancelButton onClick={() => setShowModal(false)}>닫기</F.CancelButton>
                            </F.ButtonBox>
                        </F.ModalContent>
                    </F.ModalOverlay>
                )
            }


        </F.Background >
    );
}

export default Friends;
