import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import { EnglishFontStyle } from './styles/EnglishFontStyle';
import ScrollToTop from './components/ScrollToTop';

import Main from "./pages/Main";
import Splash from "./pages/Splash";
import Join from "./pages/Join";
import SignUp from "./pages/SignUp";
import MyCloset_1 from "./pages/MyCloset_1";
import MyCloset_2 from "./pages/MyCloset_2";
import MyCloset_3 from "./pages/MyCloset_3";
import Mypage from "./pages/Mypage";
import Person from "./pages/Person";
import CalendarPage from "./pages/CalendarPage";
import ShareCloset from "./pages/ShareCloset";
import Friends from "./pages/Friends";
import FriendCloset from "./pages/FriendCloset";
import CalendarDetail from "./pages/CalendarDetail";
import CalendarCreate from "./pages/CalendarCreate";
import ClothesRegistration from "./pages/ClothesRegistration";

function App() {
  return (
    <div className="App">
      <EnglishFontStyle /> {/* 여기에서 폰트 스타일 적용 */}
      <ScrollToTop />
      <Routes>
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/mycloset_1" element={<MyCloset_1 />} />
        <Route path="/category/:categoryName" element={<MyCloset_2 />} />
        <Route exact path="/mycloset_3" element={<MyCloset_3 />} />
        <Route exact path="/mypage" element={<Mypage />} />
        <Route exact path="/person" element={<Person />} />
        <Route exact path="/calendarpage" element={<CalendarPage />} />
        <Route exact path="/sharecloset" element={<ShareCloset />} />
        <Route exact path="/friends" element={<Friends />} />
        <Route exact path="/friendcloset" element={<FriendCloset />} />
        <Route exact path="/calendardetail" element={<CalendarDetail />} />
        <Route exact path="/calendarcreate" element={<CalendarCreate />} />
        <Route exact path="/clothesRegistration" element={<ClothesRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
