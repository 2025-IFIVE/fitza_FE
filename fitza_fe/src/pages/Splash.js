import React, { useState, useEffect, useRef } from 'react';
import { SplashScreen } from '../styles/SplashStyle';  // 스타일 불러오기
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const splashScreenRef = useRef(null);  // DOM 요소 참조를 위한 useRef

  useEffect(() => {
    // fade-out 효과 추가
    setTimeout(() => {
      if (splashScreenRef.current) {
        splashScreenRef.current.classList.add('fade-out'); // 페이드 아웃 시작
      }
    }, 1300);

    // 페이드 아웃이 끝난 후 화면 전환
    setTimeout(() => {
      navigate('/join');  
    }, 2000);  
  }, [navigate]);

  return (
    <div>
      {loading && (
        <SplashScreen ref={splashScreenRef}>
          <div className="main-text">FITZA</div>
          <div className="footer-text">© 2025. ifive Co. all rights reserved.</div>
        </SplashScreen>
      )}
    </div>
  );
}
