import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ScrollToTopButton() {
  // State to track the scroll position
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Listen for changes to the scroll position
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle changes to the scroll position
  function handleScroll() {
    setScrollY(window.scrollY);
  }

  return (
    <Button
      className="scroll-to-top-btn"
      variant='outlined'
      color='secondary'
      style={{ visibility: scrollY > 100 ? 'visible' : 'hidden' }}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <ArrowUpwardIcon />
    </Button>
  );
}
