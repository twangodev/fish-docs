import React, { useState, useEffect } from 'react';

export const TypingEffect = () => {
  const words = ['Generate', 'Create', 'Produce', 'Build', 'Craft', 'Design'];
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const word = words[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < word.length) {
          setCurrentWord(word.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setCurrentWord(word.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, currentIndex, isDeleting, words]);

  return (
    <>
      <h1 className="mint-text-4xl mint-font-medium mint-text-center mint-text-gray-900 dark:mint-text-white mint-flex mint-justify-center mint-items-baseline mint-gap-1">
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