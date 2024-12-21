import React, { useState, useRef } from "react";
import Zhelantu from "../asset/pictures/折槛图.png"

const ImageViewer = ({ imageUrl = Zhelantu, height = "100vh", width = "100vw", overflowX = "hidden", overflowY = "hidden" }) => {
  const [scale, setScale] = useState(1); // 缩放比例
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 图片位置
  const [isDragging, setIsDragging] = useState(false); // 是否在拖拽
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // 拖拽起点
  const containerRef = useRef(null); // 容器引用
  const imageRef = useRef(null); // 图片引用

  // 处理缩放
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newScale = e.deltaY > 0 ? scale - zoomSpeed : scale + zoomSpeed;
    setScale(Math.max(0.25, Math.min(3, newScale))); // 限制缩放范围在 0.5 到 3 之间
  };

  // 开始拖拽
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 拖拽中
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = containerRef.current;
    const image = imageRef.current;

    if (container && image) {
    //   const containerRect = container.getBoundingClientRect();
    //   const imageWidth = image.offsetWidth * scale;
    //   const imageHeight = image.offsetHeight * scale;

      // 计算新的位置
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // 限制图片在边界内
    //   const limitedX = Math.min(
    //     Math.max(newX, containerRect.width - imageWidth),
    //     0
    //   );
    //   const limitedY = Math.min(
    //     Math.max(newY, containerRect.height - imageHeight),
    //     0
    //   );

      setPosition({ x: newX, y: newY });
    }
  };

  // 结束拖拽
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: width,
        height: height,
        overflowX: overflowX,
        overflowY: overflowY,
        position: "fixed",
        border: "1px solid #ccc",
        zIndex: "-1",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#fffcf6",
      }}

    >
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Artwork"
        draggable={false} // 禁用默认拖动行为
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // 防止鼠标离开边界无法释放拖拽
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center center",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          width: "auto",
          height: "auto"
        }}
      />
    </div>
  );
};

export default ImageViewer;
