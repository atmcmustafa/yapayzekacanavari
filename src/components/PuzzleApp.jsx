import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import Puzzle from "./Puzzle";
import Result from "./Result";
import { IoTimerOutline } from "react-icons/io5";
import Confetti from "react-confetti";
import { useQuestions } from "../context/QuestionContext";

function PuzzleApp() {
  const { currentQuestions } = useQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completedPieces, setCompletedPieces] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showConfetti, setShowConfetti] = useState(false);

  const correctSound = useRef(new Audio("/correct.mp3"));
  const wrongSound = useRef(new Audio("/error.mp3"));
  const failSound = useRef(new Audio("/fail.mp3"));
  const winSound = useRef(new Audio("/win.wav"));

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResult(true);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // lose
  useEffect(() => {
    if (showResult && completedPieces < 9) {
      if (failSound.current) {
        failSound.current.currentTime = 0;
        failSound.current.play();
      }
    }
  }, [showResult, completedPieces]);

  // win sound
  useEffect(() => {
    if (showResult && completedPieces >= 9) {
      if (winSound.current) {
        winSound.current.currentTime = 0;
        winSound.current.play();
      }
    }
  }, [showResult, completedPieces]);

  const handleAnswer = (index) => {
    if (index === currentQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
      setCompletedPieces(completedPieces + 1);
      setShowConfetti(true);
      correctSound.current.currentTime = 0;
      correctSound.current.play();
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      wrongSound.current.currentTime = 0;
      wrongSound.current.play();
    }

    if (completedPieces + 1 >= 9) {
      setShowResult(true);
    } else if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCompletedPieces(0);
    setShowResult(false);
    setTimeLeft(30);
    setShowConfetti(false);
  };

  return (
    <div className="flex flex-col items-center max-w-7xl w-full justify-center  p-4 ">
      {showResult ? (
        <>
          <Result score={score} onRestart={handleRestart} />
        </>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}

          <Puzzle completedPieces={completedPieces} />
          <div className="flex flex-col">
            <div className="text-lg xl:text-2xl font-bold mb-2 text-center bg-green-500 text-white  rounded flex gap-4 items-center justify-center select-none">
              <IoTimerOutline size={36} />
              <span>Kalan Süre: {timeLeft} saniye</span>
            </div>
            <Question
              question={currentQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PuzzleApp;
