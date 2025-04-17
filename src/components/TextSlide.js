// src/components/TextSlide.js (Revised with useRef for index)
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import styles from './TextSlide.module.css';

const TextSlide = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const indexRef = useRef(0); // Ref để lưu trữ index hiện tại
  const intervalRef = useRef(null); // Ref để lưu trữ ID của interval

  useEffect(() => {
    // --- Bước 1: Dọn dẹp interval cũ (nếu có) ---
    // Rất quan trọng khi text thay đổi hoặc component unmount
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // --- Bước 2: Reset trạng thái và ref cho text mới ---
    setDisplayedText('');
    setIsTypingComplete(false);
    indexRef.current = 0; // Reset index về 0

    const typingSpeed = 60; // Tốc độ gõ

    // --- Bước 3: Tạo interval mới ---
    intervalRef.current = setInterval(() => {
      const currentIndex = indexRef.current; // Lấy index hiện tại từ ref

      if (currentIndex < text.length) {
        // --- Sử dụng functional update cho setDisplayedText ---
        // Đảm bảo luôn lấy state `prev` mới nhất để nối chuỗi
        setDisplayedText((prev) => prev + text.charAt(currentIndex));
        indexRef.current++; // Tăng index trong ref
      } else {
        // --- Gõ xong ---
        clearInterval(intervalRef.current); // Dừng interval
        intervalRef.current = null; // Reset interval ID ref
        setIsTypingComplete(true); // Đánh dấu hoàn thành
      }
    }, typingSpeed);

    // --- Bước 4: Hàm cleanup cuối cùng ---
    // Chạy khi component unmount hoặc khi `text` thay đổi (trước khi effect mới chạy)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text]); // Effect này chỉ chạy lại khi prop `text` thay đổi

  return (
    <div className={`${styles.textContainer} ${styles.modernLook}`}>
      <p className={`${styles.text} ${!isTypingComplete ? styles.typingCursor : ''}`}>
        <span className={isTypingComplete ? styles.typingDone : ''}>
          {displayedText}
        </span>
      </p>
    </div>
  );
};

export default TextSlide;