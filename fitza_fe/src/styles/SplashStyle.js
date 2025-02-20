import styled from 'styled-components';

// 스플래시 화면 스타일
export const SplashScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #A47864;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.7s ease-out;

  /* fade-out 효과 */
  &.fade-out {
    opacity: 0;
  }

  /* 텍스트 컨테이너 */
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
  }

  /* 메인 텍스트 */
  .main-text {
    font-size: 15vw;  
    /* 화면 크기에 맞게 조정 */
    @media (min-width: 768px) {
      font-size: 10vw; 
    }
    @media (min-width: 1024px) {
      font-size: 10vw;
    }
  }

  /* 푸터 텍스트 (아래 30% 위치) */
  .footer-text {
    position: absolute;
    bottom: 15%;
    font-size: 3vw;
    text-align: center;
    
    /* 화면 크기에 맞는 크기 조정 */
    @media (min-width: 768px) {
      font-size: 2.5vw;
    }
    @media (min-width: 1024px) {
      font-size: 2vw;
    }
  }
`;
