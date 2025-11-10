import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { ResultType, type Answers } from '../types';

interface QuizProps {
  onQuizComplete: (result: ResultType) => void;
}

const Quiz: React.FC<QuizProps> = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isEmailStep, setIsEmailStep] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');


  const handleAnswerClick = (resultType: ResultType) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: resultType };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsEmailStep(true);
    }
  };
  
  const calculateResult = (): ResultType => {
    const answerValues = Object.values(answers);
    if (answerValues.length === 0) {
      // Safeguard against no answers, return a default.
      return QUIZ_QUESTIONS[0].options[0].resultType;
    }

    const counts = answerValues.reduce((acc, value) => {
      const key = value as ResultType;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<ResultType, number>);

    // Find the key with the highest value in `counts`.
    const result = (Object.keys(counts) as ResultType[]).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    setNameError('');
    setEmailError('');
    setSubmitError('');

    if (!name.trim()) {
      setNameError('Please enter your first name.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);
    const finalResult = calculateResult();

    try {
      // --- PRODUCTION CODE ---
      // This sends the data to your backend serverless function.
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          result: finalResult, // e.g., 'DRAMA_MAGNET'
        }),
      });

      if (!response.ok) {
        // Handle server errors (e.g., if the API endpoint is down)
        let errorMessage = 'Something went wrong. Please try again.';
        try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
            // Response was not JSON, use default error message
        }
        throw new Error(errorMessage);
      }

      // If submission is successful, proceed to the results page
      onQuizComplete(finalResult);

    } catch (error) {
        if (error instanceof Error) {
            setSubmitError(error.message);
        } else {
            setSubmitError('An unknown error occurred.');
        }
        console.error('Submission failed:', error);
    } finally {
        setIsLoading(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
  
  const renderQuizContent = () => {
    if (isEmailStep) {
      return (
          <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Almost there!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Enter your details below to get your personalized results and unlock the first step to transforming your love life.</p>
              <form onSubmit={handleSubmit} className="max-w-sm mx-auto" noValidate>
                  <div className="mb-4">
                    <input 
                        type="text"
                        placeholder="Your First Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if(nameError) setNameError('');
                        }}
                        aria-invalid={!!nameError}
                        aria-describedby="name-error"
                        className={`w-full p-3 border rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 ${nameError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {nameError && <p id="name-error" className="text-red-500 text-sm mt-1 text-left">{nameError}</p>}
                  </div>
                  <div className="mb-6">
                    <input 
                        type="email"
                        placeholder="Your Best Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if(emailError) setEmailError('');
                        }}
                        aria-invalid={!!emailError}
                        aria-describedby="email-error"
                        className={`w-full p-3 border rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                     {emailError && <p id="email-error" className="text-red-500 text-sm mt-1 text-left">{emailError}</p>}
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-fuchsia-700 transition-colors duration-300 shadow-lg disabled:bg-fuchsia-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                      {isLoading ? 'Submitting...' : 'See My Results'}
                  </button>
                  {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
              </form>
          </div>
      );
    }

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    return (
      <div className="animate-fade-in">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-fuchsia-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center text-gray-800 mb-8">{currentQuestion.text}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option.resultType)}
              className="bg-white border-2 border-gray-200 p-4 rounded-lg text-left text-gray-700 hover:bg-fuchsia-100 hover:border-fuchsia-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-2xl">
        {renderQuizContent()}
      </div>
    </div>
  );
};

export default Quiz;