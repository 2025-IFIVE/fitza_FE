import React, { useState, useEffect } from "react";
import * as F from "../styles/FriendsStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import axios from 'axios';

import find from "../img/friendspage_find.png";
import backIcon from "../img/backButton.png";

function Friends() {
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [friendNumber, setFriendNumber] = useState("");
    const [newFriend, setNewFriend] = useState(null);
    const navigate = useNavigate();

    // ✅ 친구 목록 조회
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        axios.get("http://localhost:8080/api/friends/list", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const friendsData = response.data?.data || [];
                const uniqueFriends = friendsData.filter((f, i, arr) =>
                    i === arr.findIndex(t => t.id === f.id)
                );
                setFriends(uniqueFriends);
            })
            .catch(error => {
                console.error("❌ 친구 목록 가져오기 실패:", error.response?.data || error.message);
            });
    }, [newFriend]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddFriend = () => {
        setShowModal(true);
    };

    const handleAddFriendNumber = () => {
        if (!friendNumber) return;

        const token = localStorage.getItem("authToken");
        if (!token) return;

        const normalizedPhone = friendNumber.includes("-")
            ? friendNumber
            : friendNumber.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");

        axios.post("http://localhost:8080/api/friends/request", {
            phone: normalizedPhone
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                alert("친구 요청이 전송되었습니다!");
                setNewFriend(response.data);
                setShowModal(false);
                setFriendNumber("");
            })
            .catch(error => {
                console.error("친구 요청 실패", error.response?.data || error.message);
                alert("친구 요청에 실패했습니다.");
                setShowModal(false);
            });
    };

    const filteredFriends = friends.filter(friend =>
        (friend.nickname || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBackClick = () => {
        navigate(-1);
    };

    const [incomingRequests, setIncomingRequests] = useState([]);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    // ✅ 친구 요청 목록 조회
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        axios.get("http://localhost:8080/api/friends/received", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const requests = response.data?.data || [];
                const uniqueRequests = requests.filter((r, i, arr) =>
                    i === arr.findIndex(t => t.requestId === r.requestId)
                );
                setIncomingRequests(uniqueRequests);

                if (uniqueRequests.length > 0) {
                    setSelectedRequestId(uniqueRequests[0].requestId);
                    setShowRequestModal(true);
                }
            })
            .catch(error => {
                console.error("친구 요청 목록 조회 실패", error);
            });
    }, []);

    // ✅ 친구 요청 수락/거절
    const handleRespondFriend = (accept) => {
        const token = localStorage.getItem("authToken");
        if (!token || selectedRequestId === null) return;

        axios.post(`http://localhost:8080/api/friends/respond/${selectedRequestId}?accept=${accept}`, null, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                const remaining = incomingRequests.filter(req => req.requestId !== selectedRequestId);
                setIncomingRequests(remaining);

                if (accept) {
                    alert("친구 요청을 수락했습니다.");
                    window.location.reload();
                } else {
                    alert("친구 요청을 거절했습니다.");
                    if (remaining.length > 0) {
                        setSelectedRequestId(remaining[0].requestId);
                    } else {
                        setShowRequestModal(false);
                    }
                }
            })
            .catch(error => {
                console.error("친구 요청 응답 실패", error);
                alert("친구 요청 응답 처리에 실패했습니다.");
            });
    };

    const handleDeleteFriend = (friendId) => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        axios.delete(`http://localhost:8080/api/friends/delete/${friendId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setFriends(prev => prev.filter(f => f.id !== friendId));
                alert("친구가 삭제되었습니다.");
            })
            .catch(error => {
                console.error("❌ 친구 삭제 실패:", error.response?.data || error.message);
                alert("친구 삭제에 실패했습니다.");
            });
    };

    return (
        <F.Background>
            <F.TopBox><TopBar /></F.TopBox>

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
                        <F.Register>친구 추가하기</F.Register>
                        <F.AddFnd onClick={handleAddFriend}>
                            <img src={smallPlus} alt="plus" />
                        </F.AddFnd>
                    </F.RegisterContainer>
                </F.TitleBox1>

                <F.Search>
                    <F.SearchInput
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="친구 이름을 입력하세요"
                    />
                    <F.Find>
                        <F.FindImg><img src={find} alt="find" /></F.FindImg>
                    </F.Find>
                </F.Search>

                <F.FriendList>
                    {filteredFriends.length > 0 ? (
                        filteredFriends.map(friend => (
                            <F.FriendItem key={friend.id} to={`/friendCloset/${friend.id}`}>
                                <div style={{ flex: 1 }}>{friend.nickname}</div>
                                <F.DeleteButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFriend(friend.id);
                                    }}
                                    title="삭제"
                                >
                                    –
                                </F.DeleteButton>
                            </F.FriendItem>

                        ))
                    ) : (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <F.EmptyMessage>친구가 없습니다.</F.EmptyMessage>
                        </div>
                    )}
                </F.FriendList>
            </F.Container>

            <F.BottomBox><Footer /></F.BottomBox>

            {/* 친구 추가 모달 */}
            {showModal && (
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
            )}

            {/* 친구 요청 수락/거절 모달 */}
            {showRequestModal && selectedRequestId !== null && (
                <F.ModalOverlay>
                    <F.ModalContent>
                        <h3>친구 요청이 도착했습니다!</h3>
                        <div style={{ marginBottom: '10px' }}>
                            요청자: {
                                incomingRequests.find(r => r.requestId === selectedRequestId)?.nickname || "알 수 없음"
                            }
                        </div>
                        <F.ButtonBox>
                            <F.SaveButton onClick={() => handleRespondFriend(true)}>수락</F.SaveButton>
                            <F.RejectButton onClick={() => handleRespondFriend(false)}>거절</F.RejectButton>
                        </F.ButtonBox>
                    </F.ModalContent>
                </F.ModalOverlay>
            )}
        </F.Background>
    );
}

export default Friends;
