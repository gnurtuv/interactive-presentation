// src/components/TitleSlide.js
import React from 'react';
import styles from './TitleSlide.module.css';
import titleBackground from '../assets/images/title-background.jpg'; // Giữ ảnh nền

const TitleSlide = ({ title, subtitle }) => {
  const backgroundStyle = {
    backgroundImage: `url(${titleBackground})`,
  };

  // Tạo mảng các phần tử "hạt"
  const particles = Array.from({ length: 15 }).map((_, i) => (
    <div
      key={i}
      className={styles.particle}
      // Đặt vị trí và delay animation ngẫu nhiên bằng inline style
      style={{
        left: `${Math.random() * 100}%`, // Vị trí ngang ngẫu nhiên
        top: `${Math.random() * 100}%`,  // Vị trí dọc ngẫu nhiên
        animationDelay: `${Math.random() * 10}s, ${Math.random() * 10 + 2}s`, // Delay khác nhau cho 2 animation
        animationDuration: `${Math.random() * 10 + 10}s, ${Math.random() * 1 + 1}s` // Thời gian khác nhau
      }}
    ></div>
  ));

  return (
    <div
      className={styles.titleSlideContainer}
      style={backgroundStyle}
    >
      {/* Render các hạt */}
      <div className={styles.particleContainer}>{particles}</div>

      {/* Lớp phủ tối vẫn cần thiết */}
      <div className={styles.overlay}></div>

      {/* Text với animation */}
      {/* Thêm một wrapper cho hiệu ứng shimmer */}
      <div className={styles.textWrapper}>
          <h1 className={`${styles.title} ${styles.fadeInUp}`}>{title}</h1>
      </div>
      {subtitle && <h2 className={`${styles.subtitle} ${styles.fadeInUpDelay}`}>{subtitle}</h2>}
    </div>
  );
};

export default TitleSlide;