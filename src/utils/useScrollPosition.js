import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        top: window.scrollY,
        left: window.scrollX,
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize the scroll position on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;