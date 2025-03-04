import React, { useState, useRef } from 'react';
import * as C from "../styles/ClothesRegistrationStyle"; 

const ClothesRegistration = () => {
  const [image, setImage] = useState(null);
  const [isCamera, setIsCamera] = useState(false);  // 카메라 또는 앨범 선택 여부
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 카메라 시작
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("카메라 접근 실패:", err);
    }
  };

  // 사진 촬영
  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setImage(canvas.toDataURL('image/png'));
  };

  // 앨범에서 파일 선택
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <C.Container>
      <div>
        <C.Button onClick={() => setIsCamera(true)}>사진 촬영</C.Button>
        <C.Button onClick={() => setIsCamera(false)}>앨범 선택</C.Button>
      </div>

      {isCamera ? (
        <div>
          <C.Video ref={videoRef} autoPlay></C.Video>
          <C.Button onClick={startCamera}>카메라 시작</C.Button>
          <C.Button onClick={takePhoto}>사진 찍기</C.Button>
        </div>
      ) : (
        <div>
          <C.Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      )}

      {image && <C.ImagePreview src={image} alt="Selected" />}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </C.Container>
  );
};

export default ClothesRegistration;
