import React, { useState, useCallback } from 'react';
import { AppState, ResultType } from './types';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import ResultsPage from './components/ResultsPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Landing);
  const [quizResult, setQuizResult] = useState<ResultType | null>(null);

  const handleStartQuiz = useCallback(() => {
    setAppState(AppState.Quiz);
  }, []);

  const handleQuizComplete = useCallback((result: ResultType) => {
    setQuizResult(result);
    setAppState(AppState.Results);
    window.scrollTo(0, 0);
  }, []);
  
  const handleRestart = useCallback(() => {
    setQuizResult(null);
    setAppState(AppState.Landing);
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.Quiz:
        return <Quiz onQuizComplete={handleQuizComplete} />;
      case AppState.Results:
        return quizResult ? <ResultsPage resultType={quizResult} onRestart={handleRestart} /> : <LandingPage onStartQuiz={handleStartQuiz} />;
      case AppState.Landing:
      default:
        return <LandingPage onStartQuiz={handleStartQuiz} />;
    }
  };

  const isLandingPage = appState === AppState.Landing;

  return (
    <div className={`${appState === AppState.Quiz ? 'bg-gray-50' : 'bg-gray-900'} min-h-screen flex flex-col transition-colors duration-300`}>
      {!isLandingPage && <Header appState={appState} />}
      <main className="flex-grow flex flex-col">
        {renderContent()}
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

export default App;