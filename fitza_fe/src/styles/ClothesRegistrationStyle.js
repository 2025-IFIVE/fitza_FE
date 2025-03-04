import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Button = styled.button`
  background-color: #CE9694;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #CE9694;
  }
`;

export const Video = styled.video`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-size: 16px;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 400px;
  margin-top: 20px;
  border-radius: 10px;
`;
