import React from 'react';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
  return (
    <div className="text-white flex-grow flex items-center justify-center text-center px-4 animate-fade-in">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
          Discover the Hidden Pattern That Keeps You Stuck in Love
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
          Take this free 2-minute quiz to reveal your subconscious Love Block — and learn the exact shift you need to attract healthy, lasting love.
        </p>
        <button
          onClick={onStartQuiz}
          className="bg-fuchsia-600 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-fuchsia-700 transform hover:scale-105 transition-transform duration-300 shadow-lg inline-block focus:outline-none focus:ring-4 focus:ring-fuchsia-300"
          aria-label="Start the Quiz to Begin Your Journey"
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  );
};

export default LandingPage;