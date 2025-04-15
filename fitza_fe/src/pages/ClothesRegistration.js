import React, { useRef, useState } from 'react';
import * as C from "../styles/ClothesRegistrationStyle";

const ClothesRegistration = () => {
  const [image, setImage] = useState(null);

  // 카메라 / 앨범 input 각각 참조
  const cameraInputRef = useRef(null);
  const albumInputRef = useRef(null);

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
        {/* 버튼 두 개 */}
        <C.Button onClick={() => cameraInputRef.current.click()}>카메라 시작</C.Button>
        <C.Button onClick={() => albumInputRef.current.click()}>앨범에서 선택</C.Button>

        {/* 실제 input은 숨기고 버튼으로 제어 */}
        <C.Input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <C.Input
          type="file"
          accept="image/*"
          ref={albumInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {image && <C.ImagePreview src={image} alt="Selected" />}
    </C.Container>
  );
};

export default ClothesRegistration;
