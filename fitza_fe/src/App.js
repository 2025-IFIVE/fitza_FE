import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import { EnglishFontStyle } from './styles/EnglishFontStyle';
import Main from "./pages/Main";
import Splash from "./pages/Splash";
import Join from "./pages/Join";
import SignUp from "./pages/SignUp";
import MyCloset_1 from "./pages/MyCloset_1";
import Mypage from "./pages/Mypage";
import Calendar from "./pages/Calendar";
import ShareCloset from "./pages/ShareCloset";

function App() {
  return (
    <div className="App">
      <EnglishFontStyle /> {/* 여기에서 폰트 스타일 적용 */}
      <Routes>
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/splash" element={<Splash />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/mycloset_1" element={<MyCloset_1 />} />
        <Route exact path="/mypage" element={<Mypage />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/sharecloset" element={<ShareCloset />} />
      </Routes>
    </div>
  );
}

export default App;
