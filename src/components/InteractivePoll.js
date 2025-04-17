// src/components/InteractivePoll.js
import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import styles from './InteractivePoll.module.css';

const InteractivePoll = ({ question, options }) => {
  const initialVotes = useMemo(() => options.reduce((acc, option) => {
    acc[option] = 0;
    return acc;
  }, {}), [options]); // Dùng useMemo để chỉ tính initialVotes khi options thay đổi

  const [votes, setVotes] = useState(initialVotes);
  const [totalVotes, setTotalVotes] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Reset state khi component được unmount hoặc key thay đổi (do slideIndex)
  useEffect(() => {
    setVotes(initialVotes);
    setTotalVotes(0);
    setShowResults(false);
  }, [initialVotes]); // Phụ thuộc vào initialVotes (gián tiếp là options)

  const handleVote = (option) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1
    }));
    setTotalVotes(prevTotal => prevTotal + 1);
    setShowResults(true);
  };

  const getPercentage = (count) => {
    if (totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  // Tìm lựa chọn có nhiều vote nhất (dùng useMemo để tối ưu)
  const leadingOption = useMemo(() => {
    if (!showResults || totalVotes === 0) return null;
    let maxVotes = -1;
    let leader = null;
    options.forEach(option => {
      if (votes[option] > maxVotes) {
        maxVotes = votes[option];
        leader = option;
      } else if (votes[option] === maxVotes) {
        // Nếu có nhiều lựa chọn bằng điểm cao nhất, không có leader duy nhất
        leader = null;
      }
    });
    return leader;
  }, [votes, totalVotes, showResults, options]); // Tính lại khi votes thay đổi

  return (
    // Thêm animation vào container
    <div className={`${styles.pollContainer} ${styles.fadeIn}`}>
      <h2 className={styles.question}>{question}</h2>
      <div className={styles.optionsList}>
        {options.map((option, index) => {
          const percentage = getPercentage(votes[option]);
          const isLeading = showResults && option === leadingOption; // Kiểm tra có phải cao nhất không

          return (
            <div
              key={index}
              // Thêm class isLeading nếu là lựa chọn cao điểm
              className={`${styles.optionWrapper} ${isLeading ? styles.isLeading : ''}`}
              // Thêm hiệu ứng vào wrapper
              style={{ animationDelay: `${0.1 * index}s` }} /* Delay animation cho từng lựa chọn */
            >
              {/* Kết hợp nút và kết quả vào một div để dễ tạo kiểu */}
              <div className={styles.optionContent}>
                <span className={styles.optionText}>{option}</span>
                {/* Hiển thị kết quả chồng lên nút */}
                {showResults && (
                  <div className={styles.resultOverlay}>
                    <div
                      className={styles.resultBar}
                      style={{ width: `${percentage}%` }}
                    ></div>
                     <span className={styles.percentageText}>
                        {votes[option]} ({percentage}%)
                     </span>
                  </div>
                )}
                {/* Nút bấm vô hình nằm trên cùng để bắt click */}
                 <button
                    onClick={() => handleVote(option)}
                    className={styles.voteButtonOverlay}
                    aria-label={`Vote for ${option}`} // Thêm trợ năng
                 ></button>
              </div>
            </div>
          )
        })}
      </div>
      {showResults && <p className={styles.totalVotes}>Tổng số lượt bình chọn: {totalVotes}</p>}
      {!showResults && <p className={styles.instructions}>Người thuyết trình: Click vào lựa chọn dựa trên biểu quyết của khán giả.</p>}
    </div>
  );
};

export default InteractivePoll;