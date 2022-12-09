import React, { useState, useEffect } from 'react';

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
    <button
      className="scroll-to-top-btn"
      style={{ visibility: scrollY > 100 ? 'visible' : 'hidden' }}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      Scroll to top
    </button>
  );
}
