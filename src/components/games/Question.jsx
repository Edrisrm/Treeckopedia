import React from "react";
import Confetti from 'react-confetti'

const Question = ({
  gameMode,
  question,
  spriteUrl,
  options,
  handleAnswer,
  isCorrect,
  questionType,
  correctAnswer,
  selectedAnswer
}) => {
  return (
    <div className="text-center w-full px-4 pl-0">
      <h1 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">{gameMode}</h1>
      {questionType === "sprite" && spriteUrl && (
        <img
          src={spriteUrl}
          alt="pokemon"
          className={`mx-auto h-40 w-40 mb-4 ${
            selectedAnswer ? "" : "filter contrast-0"
          }`}
        />
      )}
      {questionType === "description" && <p className="mb-4 dark:text-white text-gray-900">{question}</p>}
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2 max-w-4xl mx-auto ">
        {options.map((option) => (
          <div className="relative w-full lg:w-1/4 m-2 ">
            {isCorrect && option === correctAnswer && (
              <Confetti
                width={300} 
                height={300}
                recycle={false} 
              />
            )}
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`bg-gradient-to-r bg-green-500 text-white py-2 rounded hover:bg-cyan-700 w-full
                ${selectedAnswer
                  ? option === correctAnswer
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-gray-500 hover:bg-gray-700"
                }
              `}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
