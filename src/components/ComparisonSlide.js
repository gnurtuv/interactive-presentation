// src/components/ComparisonSlide.js
import React, { useState } from 'react';
import styles from './ComparisonSlide.module.css';
import placeholderImg from '../assets/images/placeholder.jpg';

const ComparisonSlide = ({ title, item1, item2, revealText }) => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const getImage = (item) => item?.image || placeholderImg;
  const getLabel = (item) => item?.label || "Item";

  const handleImageError = (e) => {
    if (e.target.src !== placeholderImg) {
      e.target.onerror = null;
      e.target.src = placeholderImg;
    }
  };

  return (
    // Thêm class để tạo kiểu nền riêng nếu muốn
    <div className={`${styles.comparisonContainer} ${revealed ? styles.isRevealed : ''}`}>
      {/* Animation cho tiêu đề */}
      {title && <h2 className={`${styles.title} ${styles.slideInDown}`}>{title}</h2>}

      <div className={styles.itemsWrapper}>
        {/* Panel cho Item 1 */}
        <div className={`${styles.itemPanel} ${styles.slideInLeft}`}>
          <div className={styles.imageContainer}>
            <img
              src={getImage(item1)}
              alt={getLabel(item1)}
              className={styles.itemImage}
              onError={handleImageError}
            />
          </div>
          <p className={styles.itemLabel}>{getLabel(item1)}</p>
        </div>

        {/* VS Element cách điệu */}
        <div className={`${styles.vsElement} ${styles.zoomInVs}`}>
          <span className={styles.vsText}>VS</span>
        </div>

        {/* Panel cho Item 2 */}
        <div className={`${styles.itemPanel} ${styles.slideInRight}`}>
           <div className={styles.imageContainer}>
             <img
               src={getImage(item2)}
               alt={getLabel(item2)}
               className={styles.itemImage}
               onError={handleImageError}
             />
          </div>
          <p className={styles.itemLabel}>{getLabel(item2)}</p>
        </div>
      </div>

      {/* Khu vực Reveal */}
      <div className={`${styles.revealSection} ${styles.fadeInUpReveal}`}>
        {!revealed ? (
          <button onClick={handleReveal} className={styles.revealButton}>
             {/* Optional: Thêm Icon */}
             {/* <svg>...</svg> */}
            Thảo luận & Xem kết luận
          </button>
        ) : (
          // Container riêng cho text đã reveal
          <div className={styles.revealedContent}>
             {/* Optional: Icon kết luận */}
             {/* <svg>...</svg> */}
            <p className={styles.revealedText}>{revealText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonSlide;