import React, { useRef, useEffect } from "react";

const BrushEraserCanvas = ({ imageUrl, onExport }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);

  // 이미지 로딩 및 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = () => {
      const maxWidth = 500;
      const maxHeight = 500;

      let width = image.width;
      let height = image.height;
      const ratio = Math.min(maxWidth / width, maxHeight / height);

      width *= ratio;
      height *= ratio;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);
    };
  }, [imageUrl]);

  // 공통 브러시 함수 (터치/마우스 모두 대응)
  const erase = (e) => {
    e.preventDefault();

    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (e.touches) {
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const ctx = ctxRef.current;
    ctx.clearRect(x - 10, y - 10, 20, 20);
  };

  const startErasing = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    erase(e);
  };

  const stopErasing = () => {
    isDrawing.current = false;
  };

  // 터치 이벤트 등록
  useEffect(() => {
    const canvas = canvasRef.current;

    const handleTouchStart = (e) => {
      if (e.cancelable) e.preventDefault();
      isDrawing.current = true;
      erase(e);
    };

    const handleTouchMove = (e) => {
      if (e.cancelable) e.preventDefault();
      erase(e);
    };

    const handleTouchEnd = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleExport = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onExport(dataUrl);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid #aaa",
          maxWidth: "100%",
          height: "auto",
          touchAction: "none" // 💡 터치 방지
        }}
        onMouseDown={startErasing}
        onMouseMove={erase}
        onMouseUp={stopErasing}
        onMouseLeave={stopErasing}
      />
      <button onClick={handleExport} style={{ marginTop: "10px" }}>
        이미지 저장
      </button>
    </div>
  );
};

export default BrushEraserCanvas;
