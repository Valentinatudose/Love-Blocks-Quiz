
import React from 'react';
import { QUIZ_RESULTS } from '../constants';
import { ResultType, type QuizResult } from '../types';

interface ResultsPageProps {
  resultType: ResultType;
  onRestart: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ resultType, onRestart }) => {
  const result: QuizResult = QUIZ_RESULTS[resultType];

  return (
    <div className="bg-gray-800 text-white py-12 md:py-20 px-4 animate-fade-in">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="bg-white text-gray-800 p-8 md:p-12 rounded-xl shadow-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-fuchsia-600 mb-2">Your Result</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{result.title}</h3>
          <p className="text-lg text-gray-700 mb-8">{result.description}</p>
          
          <div className="bg-gray-100 p-6 my-8 text-left rounded-lg">
            <h4 className="font-bold text-xl text-gray-800 mb-2">The Psychology Behind It</h4>
            <p className="text-gray-700">{result.psychology}</p>
          </div>

          <div className="bg-fuchsia-50 border-l-4 border-fuchsia-500 p-6 my-8 text-left rounded-r-lg">
            <h4 className="font-bold text-xl text-gray-800 mb-2">Your Path Forward:</h4>
            <p className="text-gray-700">{result.nextStep}</p>
          </div>

          <p className="text-xl font-semibold mb-4">Ready to heal this pattern for good?</p>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">Discover the exact subconscious patterns holding you back and your next steps to reset them in a 30-minute Relationship Blocks Diagnostic Session.</p>

          <a
            href="https://live.vcita.com/site/happyeverafter/online-scheduling?service=2zfvqvmbyuvhbiel"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-fuchsia-600 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-fuchsia-700 transform hover:scale-105 transition-transform duration-300 shadow-lg inline-block focus:outline-none focus:ring-4 focus:ring-fuchsia-300"
            aria-label="Book Your FREE Diagnostic Session"
          >
            Book Your FREE Diagnostic Session
          </a>
          <p className="text-sm text-gray-500 mt-3">Only 3 slots available this month!</p>

          <button 
            onClick={onRestart} 
            className="mt-12 text-gray-500 hover:text-gray-800 hover:underline focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded"
            aria-label="Retake the quiz"
          >
            Take the quiz again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;