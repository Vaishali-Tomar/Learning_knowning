import React, { useState, useEffect } from 'react';

const quizQuestions = [
  { question: 'What is 2 + 2?', options: ['2', '3', '4', '5'], answer: '4' },
  { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'], answer: 'Paris' },
  { question: 'What is 3 + 5?', options: ['5', '8', '9', '10'], answer: '8' },
  { question: 'What is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Mars', 'Venus'], answer: 'Jupiter' },
  { question: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'J.K. Rowling', 'Mark Twain', 'Ernest Hemingway'], answer: 'Harper Lee' },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit(); // Auto-submit if time runs out
    }
  }, [timeLeft]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });
  };

  // Move to the next question or submit quiz
  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  // Submit the quiz
  const handleSubmit = () => {
    const finalScore = quizQuestions.reduce((acc, question, index) => {
      return selectedAnswers[index] === question.answer ? acc + 1 : acc;
    }, 0);

    setScore(finalScore);
    setQuizCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 flex flex-col items-center justify-center p-4">
      {quizCompleted ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Quiz Completed!</h2>
          <p className="text-lg text-gray-600">Your Score: {score}/{quizQuestions.length}</p>
          <button
            onClick={() => window.location.reload()} // Reload to start over
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Quiz</h2>
          <h3 className="text-xl font-bold text-center text-gray-700 mb-6">
            Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
          </h3>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {quizQuestions[currentQuestion].question}
            </h3>
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="mb-2">
                <button
                  className={`w-full px-4 py-2 text-left border rounded-lg ${
                    selectedAnswers[currentQuestion] === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;