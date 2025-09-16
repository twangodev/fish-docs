import React, { useState, useEffect, useRef } from 'react';

export const TypingEffect = () => {
  const words = ['Generate', 'Create', 'Produce', 'Build', 'Craft', 'Design'];
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const mainTimerRef = useRef(null);
  const pauseTimerRef = useRef(null);

  useEffect(() => {
    const word = words[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    // Clear any existing timers before setting new ones
    if (mainTimerRef.current) clearTimeout(mainTimerRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    mainTimerRef.current = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < word.length) {
          setCurrentWord(word.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          pauseTimerRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        if (charIndex > 0) {
          setCurrentWord(word.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => {
      if (mainTimerRef.current) {
        clearTimeout(mainTimerRef.current);
        mainTimerRef.current = null;
      }
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
    };
  }, [charIndex, currentIndex, isDeleting, words]);

  return (
    <>
      <h1 className="mint-text-4xl mint-font-medium mint-text-center mint-text-gray-900 dark:mint-text-white mint-flex mint-flex-col sm:mint-flex-row mint-justify-center mint-items-center sm:mint-items-baseline mint-gap-1">
        <span
          className="mint-inline-flex mint-items-baseline"
          style={{ minWidth: '110px' }}
        >
          {currentWord}
          <span
            className="mint-ml-0.5"
            style={{ animation: 'blink 1s infinite' }}
          >|</span>
        </span>
        <span>with Fish Audio</span>
      </h1>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};