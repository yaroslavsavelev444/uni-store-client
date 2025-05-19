// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Прокручиваем к верху документа
    window.scrollTo({ top: 0, behavior: 'instant' }); // можно 'smooth'
  }, [pathname]);

  return null;
};

export default ScrollToTop;