import React from 'react';
import { ClosedScreen } from '../styles/ClosedStyle'; // 경로 맞춰주세요

export default function Closed() {
  return (
    <ClosedScreen>
      <div className="main-text">FITZA</div>
      <div className="notice-text">
        졸업 전시 기간 종료 & 배포 예산 소진으로 배포를 중단합니다.
        <br />
        많은 방문과 사용 감사드립니다. 행복하세요!
      </div>
      <div className="footer-text">© 2025. ifive Co. all rights reserved.</div>
    </ClosedScreen>
  );
}
