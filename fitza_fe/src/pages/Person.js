import React, { useState, useEffect } from "react";
import * as Per from "../styles/PersonStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import axios from 'axios';


// 이미지 주소
import find from "../img/friendspage_find.png";
import backIcon from "../img/backButton.png";


function Person() {

    const [Person, setPerson] = useState([
        { id: 1, name: "홍길동" },
        { id: 2, name: "김철수" },
        { id: 3, name: "박영희" },
    ]);  // 친구 목록 상태
    const [searchTerm, setSearchTerm] = useState("");  // 검색어 상태
    const [showModal, setShowModal] = useState(false);  // 모달 표시 상태
    const [friendNumber, setFriendNumber] = useState("");  // 입력받은 친구 번호
    const [newFriend, setNewFriend] = useState(null);  // 추가된 친구 정보
    const navigate = useNavigate();


    useEffect(() => {
        // 백엔드에서 친구 목록을 가져오는 API 호출 (예시)
        axios.get("/api/Person")
            .then(response => setPerson(response.data))
            .catch(error => console.error("친구 목록 가져오기 실패", error));
    }, [newFriend]);  // 새로운 친구가 추가될 때마다 목록 갱신

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

    const filteredPerson = Person.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBackClick = () => {
        navigate(-1);  // 이전 페이지로 이동
    };

    return (
        <Per.Background>
            <Per.TopBox>
                <TopBar />
            </Per.TopBox>

            <Per.Container>
                <Per.Header>
                    <Per.Back onClick={handleBackClick}>
                        <img src={backIcon} alt="back" />
                    </Per.Back>
                    <Per.Title>개인 정보</Per.Title>
                </Per.Header>
                <Per.TitleBox1>
                    <Per.Title1>개인 정보</Per.Title1>
                </Per.TitleBox1>
                <Per.FriendList>
                    <Per.FriendItem >
                        <div>이름</div>
                    </Per.FriendItem>
                    <Per.FriendItem >
                        <div>닉네임</div>
                    </Per.FriendItem>
                    <Per.FriendItem >
                        <div>아이디</div>
                    </Per.FriendItem>
                    <Per.FriendItem >
                        <div>비밀번호</div>
                    </Per.FriendItem>
                    <Per.FriendItem >
                        <div>전화번호</div>
                    </Per.FriendItem>
                </Per.FriendList>


                <Per.TitleBox1>
                    <Per.Title1>내 옷장 정보</Per.Title1>
                </Per.TitleBox1>
                <Per.FriendList>
                    <Per.FriendItem >
                        <div>프로필 사진</div>
                    </Per.FriendItem>
                    <Per.FriendItem >
                        <div>닉네임</div>
                    </Per.FriendItem>
                    <Per.FriendItem >
                        <div>코멘트</div>
                    </Per.FriendItem>
                    <Per.FriendItem >
                        <div>스타일</div>
                    </Per.FriendItem>
                </Per.FriendList>
            </Per.Container >

            <Per.BottomBox>
                <Footer />
            </Per.BottomBox>

        </Per.Background >
    );
}

export default Person;
