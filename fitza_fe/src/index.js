import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Google Fonts에서 Joan 폰트 불러오기
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Joan:wght@400;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);  // 폰트 링크를 document.head에 추가

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


