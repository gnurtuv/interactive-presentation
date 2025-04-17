// src/App.js
import React, { useState, useCallback } from 'react';
import slidesData from './slidesData';
import SlideViewer from './components/SlideViewer';
import Navigation from './components/Navigation';
import styles from './App.module.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Bắt sự kiện bàn phím (optional, nhưng tiện lợi khi thuyết trình)
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        goToNextSlide();
      } else if (event.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextSlide, goToPrevSlide]);


  return (
    <div className={styles.appContainer}>
      <SlideViewer
        slide={slidesData[currentSlide]}
        slideIndex={currentSlide} // Truyền index để reset poll khi chuyển slide
        />
      <Navigation
        current={currentSlide}
        total={totalSlides}
        onPrev={goToPrevSlide}
        onNext={goToNextSlide}
      />
    </div>
  );
}

export default App;