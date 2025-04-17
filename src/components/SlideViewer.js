// src/components/SlideViewer.js
import React from 'react';
import styles from './SlideViewer.module.css';

const SlideViewer = ({ slide, slideIndex }) => {
  if (!slide) {
    return <div className={styles.slideContainer}>Không có slide nào.</div>;
  }

  // Render component tương ứng với slide hiện tại
  // Truyền `key={slideIndex}` vào component slide để React biết cần re-render hoàn toàn
  // component đó khi slide thay đổi. Điều này quan trọng để reset state của InteractivePoll.
  const SlideComponent = slide.component;

  return (
    <div className={styles.slideContainer}>
       <SlideComponent key={slideIndex} {...slide.content} />
    </div>
  );
};

export default SlideViewer;