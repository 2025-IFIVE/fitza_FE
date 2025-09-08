import styled from 'styled-components';

export const ClosedScreen = styled.div`
  position: fixed;
  inset: 0;
  background-color: #A47864;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;   /* 메인 텍스트 중앙 배치 */
  align-items: center;
  padding: 8vh 2vw;
  text-align: center;

  .main-text {
    font-size: 15vw;
    font-weight: 500;
  }

  .notice-text {
    margin-top: 2vh;          /* FITZA와 간격 */
    font-size: 2.5vw;         /* footer-text보다 조금 작게 */
    line-height: 1.4;
    max-width: 80%;           /* 긴 문장 줄바꿈 */
    opacity: 0.9;             /* 약간 연하게 */
  }

  .footer-text {
    position: absolute;
    bottom: 3vh;              /* 화면 맨 아래에서 조금 위 */
    font-size: 3vw;
  }
`;
