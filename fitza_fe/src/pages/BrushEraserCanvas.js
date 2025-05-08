// BrushEraserCanvas.js
import React, { useRef, useEffect } from "react";

const BrushEraserCanvas = ({ imageUrl, onExport }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);

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

  const startErasing = (e) => {
    isDrawing.current = true;
    erase(e);
  };

  const erase = (e) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = ctxRef.current;
    ctx.clearRect(x - 10, y - 10, 20, 20);
  };

  const eraseTouch = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = ctxRef.current;
    ctx.clearRect(x - 10, y - 10, 20, 20);
  };

  const stopErasing = () => {
    isDrawing.current = false;
  };

  const handleExport = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onExport(dataUrl);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #aaa", maxWidth: "100%", height: "auto" }}
        onMouseDown={startErasing}
        onMouseMove={erase}
        onMouseUp={stopErasing}
        onMouseLeave={stopErasing}
        onTouchStart={(e) => {
          e.preventDefault();
          isDrawing.current = true;
          eraseTouch(e);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          eraseTouch(e);
        }}
        onTouchEnd={stopErasing}
      />
      <button onClick={handleExport} style={{ marginTop: "10px" }}>
        이미지 저장
      </button>
    </div>
  );
};

export default BrushEraserCanvas;