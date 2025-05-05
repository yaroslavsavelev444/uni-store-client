import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import { ArrowUp } from 'lucide-react'; // или любой другой иконкой
import Button from '../Buttons/Button';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`scroll-to-top-wrapper ${visible ? 'visible' : ''}`}>
      <Button
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Вернуться наверх"
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;