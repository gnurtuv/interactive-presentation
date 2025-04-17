// src/components/ImageSlide.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // <-- Import ReactDOM
import styles from './ImageSlide.module.css';
import placeholderImg from '../assets/images/placeholder.jpg';

const ImageSlide = ({ imageUrl, caption }) => {
  const finalImageUrl = imageUrl || placeholderImg;
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageError = (e) => {
    // ... (giữ nguyên)
    if (e.target.src !== placeholderImg && !isZoomed) {
      e.target.onerror = null;
      e.target.src = placeholderImg;
    }
  };

  // --- Toggle Zoom State ---
  const toggleZoom = (e) => {
      // Prevent toggling zoom if clicking on the caption accidentally bubbles up
      if (e.target.closest(`.${styles.caption}`)) return;
      if (!isZoomed && e.target.closest(`.${styles.imageWrapper}`)) {
        e.stopPropagation(); // Ngăn container cha bắt sự kiện toggleZoom
      }
      setIsZoomed(!isZoomed);
  };

  // Ngăn chặn lan truyền khi click vào ảnh đã zoom (để không bị toggle bởi overlay)
    const stopPropagation = (e) => {
      e.stopPropagation();
    }

  // --- Phần tử Zoom được render qua Portal ---
  const zoomedImageElement = isZoomed ? ReactDOM.createPortal(
    <>
      {/* Overlay render cùng với ảnh zoom trong portal */}
      <div
        className={styles.zoomOverlayPortal} // Style riêng cho overlay trong portal
        onClick={toggleZoom} // Click overlay để đóng
      />
      {/* Ảnh zoom render trong portal */}
      <div
        className={`${styles.imageWrapper} ${styles.zoomedViaPortal}`} // Class mới cho trạng thái zoom portal
        onClick={stopPropagation} // Ngăn click vào ảnh đã zoom đóng lại
      >
        <img
          src={finalImageUrl}
          alt={caption || 'Presentation image'}
          className={styles.image}
          onError={handleImageError}
        />
      </div>
    </>,
    document.body // Render vào cuối thẻ body
  ) : null; // Không render gì nếu không zoom

  return (
    // Container chính của slide
    <div className={`${styles.imageSlideContainer}`}>
       {/* --- THÊM HÌNH KHỐI TRANG TRÍ --- */}
      <div className={`${styles.decoShape} ${styles.shapeLeft}`}></div>
      <div className={`${styles.decoShape} ${styles.shapeRight}`}></div>
       {/* ------------------------------ */}

       {/* Chỉ render ảnh thường và caption ở đây */}
      <div
        className={`${styles.imageWrapper} ${styles.zoomIn}`}
        onClick={toggleZoom} // Click vào ảnh thường để mở zoom
      >
        <img
          src={finalImageUrl}
          alt={caption || 'Presentation image'}
          className={styles.image}
          onError={handleImageError}
        />
      </div>

      {caption && (
        <p className={`${styles.caption} ${styles.slideUp}`}>{caption}</p>
      )}

      {/* Render phần tử zoom qua portal */}
      {zoomedImageElement}
    </div>
  );
};

export default ImageSlide;