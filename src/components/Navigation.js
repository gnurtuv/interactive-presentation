// src/components/Navigation.js
import React from 'react';
import styles from './Navigation.module.css';

const Navigation = ({ current, total, onPrev, onNext }) => {
  return (
    <div className={styles.navigation}>
      <button onClick={onPrev} disabled={current === 0} className={styles.navButton}>
        ← Trước
      </button>
      <span className={styles.slideCounter}>
        {current + 1} / {total}
      </span>
      <button onClick={onNext} disabled={current === total - 1} className={styles.navButton}>
        Sau →
      </button>
    </div>
  );
};

export default Navigation;