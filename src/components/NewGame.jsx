import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import GameMap from "./GameMap";
import { TiTick } from "react-icons/ti";
import { SiFuturelearn } from "react-icons/si";
import { IoTimerOutline } from "react-icons/io5";
import { useBalloonQuestions } from "../context/BallonQuestionContext";

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

function NewGame() {
  const { currentQuestions } = useBalloonQuestions(); // Soruları context'ten alın
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [gameResult, setGameResult] = useState("");
  const [balloons, setBalloons] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const updateBalloons = () => {
    setBalloons((prevBalloons) =>
      prevBalloons.map((balloon) => ({
        ...balloon,
        y: balloon.y - 2,
      }))
    );
  };

  useEffect(() => {
    if (gameStarted) {
      const newQuestions = getRandomQuestions(currentQuestions, 5);
      setSelectedQuestions(newQuestions);
      resetGame(newQuestions);
    }
  }, [gameStarted, currentQuestions]);

  useEffect(() => {
    let animationFrameId;

    const render = () => {
      if (canvasRef.current && selectedQuestions.length > 0) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const container = containerRef.current;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawQuestion(context, selectedQuestions[currentQuestionIndex]);
        drawBalloons(context);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (selectedQuestions.length > 0) {
      render();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentQuestionIndex, selectedQuestions, balloons]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateBalloons();
      checkBalloonsPosition();
    }, 20);

    return () => clearInterval(interval);
  }, [balloons]);

  useEffect(() => {
    if (gameStarted && selectedQuestions.length > 0) {
      resetBalloons(selectedQuestions[0].answers);
    }
  }, [gameStarted, selectedQuestions]);

  const drawQuestion = (context, question) => {
    if (question) {
      const fontSize =
        Math.min(canvasRef.current.width, canvasRef.current.height) / 30;
      context.font = `${fontSize}px Arial`;
      context.fillStyle = "white";
      context.textAlign = "center";
      const maxWidth = canvasRef.current.width - 40;
      const x = canvasRef.current.width / 2;
      const y = fontSize + 20;

      const words = question.question.split(" ");
      let line = "";
      const lines = [];
      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && line.length > 0) {
          lines.push(line);
          line = word + " ";
        } else {
          line = testLine;
        }
      });
      lines.push(line);

      lines.forEach((line, index) => {
        context.fillText(line.trim(), x, y + index * fontSize);
      });
    }
  };

  const drawBalloons = (context) => {
    const balloonRadius =
      Math.min(canvasRef.current.width, canvasRef.current.height) / 12;
    const neckHeight = balloonRadius / 2;
    const neckWidth = balloonRadius / 3;

    balloons.forEach((balloon) => {
      if (!balloon.isPopped) {
        const { x, y, color, text } = balloon;

        context.beginPath();
        context.arc(x, y, balloonRadius, 0, Math.PI * 2, true);
        context.closePath();
        const gradient = context.createRadialGradient(
          x,
          y - balloonRadius / 3,
          balloonRadius / 5,
          x,
          y,
          balloonRadius
        );
        gradient.addColorStop(0, "#FFFFFF");
        gradient.addColorStop(1, color);
        context.fillStyle = gradient;
        context.fill();

        context.beginPath();
        context.moveTo(x - neckWidth / 2, y + balloonRadius);
        context.lineTo(x + neckWidth / 2, y + balloonRadius);
        context.lineTo(x, y + balloonRadius + neckHeight);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.fillStyle = "black";
        context.textAlign = "center";
        context.font = `${balloonRadius / 3}px Arial`;

        const words = text.split(" ");
        let line = "";
        const lines = [];
        const maxWidth = balloonRadius * 1.8;
        words.forEach((word) => {
          const testLine = line + word + " ";
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && line.length > 0) {
            lines.push(line);
            line = word + " ";
          } else {
            line = testLine;
          }
        });
        lines.push(line);

        lines.forEach((line, index) => {
          context.fillText(
            line.trim(),
            x,
            y - (lines.length - 1) * 10 + index * (balloonRadius / 4)
          );
        });
      }
    });
  };

  const checkBalloonsPosition = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const balloonsOutOfView = balloons.filter((balloon) => balloon.y < 0);
      if (
        balloonsOutOfView.length === balloons.length &&
        balloons.length > 0 &&
        !gameCompleted
      ) {
        setGameCompleted(true);
        setGameResult("Tekrar deneyiniz!");
      }
    }
  };

  const handleCanvasClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    balloons.forEach((balloon, index) => {
      const balloonRadius =
        Math.min(canvasRef.current.width, canvasRef.current.height) / 12;
      if (
        !balloon.isPopped &&
        Math.hypot(balloon.x - offsetX, balloon.y - offsetY) <= balloonRadius
      ) {
        handleAnswer(index);
        setBackgroundColor(balloons[index].color);
      }
    });
  };

  const handleAnswer = (index) => {
    if (index === selectedQuestions[currentQuestionIndex].correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setScore(score + 1);
      if (currentQuestionIndex + 1 < selectedQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        resetBalloons(selectedQuestions[currentQuestionIndex + 1].answers);
      } else {
        if (score + 1 >= 1) {
          setGameResult("Tebrikler! Oyunu kazandınız!");
          setGameCompleted(true);
        } else {
          setGameCompleted(true);
        }
      }
    } else {
      const newBalloons = [...balloons];
      newBalloons[index].isPopped = true;
      setBalloons(newBalloons);
    }
  };

  const resetGame = (newQuestions) => {
    setGameCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    resetBalloons(newQuestions[0].answers);
  };

  const resetBalloons = (answers) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const newBalloons = answers.map((answer, index) => ({
        text: answer,
        x: (index + 1) * (canvas.width / (answers.length + 1)),
        y: canvas.height - 50,
        color: colors[index % colors.length],
        isPopped: false,
      }));
      setBalloons(newBalloons);
    }
  };

  const getRandomQuestions = (questions, numQuestions) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  };

  const sections = [
    {
      icon: TiTick,
      text: "Kombo Yap",
      bgColor: "bg-sky-600",
    },
    {
      icon: IoTimerOutline,
      text: "Karşı Koy",
      bgColor: "bg-green-600",
    },
    {
      icon: SiFuturelearn,
      text: "Öğren",
      bgColor: "bg-yellow-500",
    },
  ];

  const description = [
    "1. Oyunun amacı soruların cevaplarını uçan balonlardan yakalamaktır.",
    "2. 20 Adet soru ile karşı karşıya kalacaksın. Eğer 5 adet doğru cevap verebilirsen robot ortaya çıkacak.",
    "3. İstediğin kadar deneme hakkına sahipsin.",
    "4. Daha fazla ne bekliyorsun? Oyunu Başlat butonuna tıkla ve macerayı başlat!",
  ];

  const handleButtonClick = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="w-full">
        <GameMap
          sections={sections}
          title="Yol Haritası"
          description={description}
          buttonText="Oyunu Başlat"
          onButtonClick={handleButtonClick}
        />
      </div>
    );
  }

  if (selectedQuestions.length === 0) {
    return null;
  }

  return (
    <div
      className="h-[75vh] w-full lg:w-[50vw] 2xl:w-[50vw]  "
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        id="game-area"
        ref={containerRef}
        className="game-area relative overflow-hidden border-2 border-black z-30 rounded h-full w-full"
      >
        <div className="absolute bg-black/50 inset-0 w-full h-full -z-10"></div>
        {showConfetti && (
          <Confetti
            width={canvasRef.current?.width || window.innerWidth}
            height={canvasRef.current?.height || window.innerHeight}
          />
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onClick={handleCanvasClick}
        ></canvas>
        {gameCompleted && (
          <div className="game-over flex text-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-green-500 p-5 border-3 border-green-500 rounded-lg text-xl !z-50 try-again max-w-4xl px-8">
            {gameResult}
            <button
              className="retry-button mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setGameStarted(false);
                setBalloons([]);
                setBackgroundColor("#FFFFFF");
              }}
            >
              Yeniden Başla
            </button>
          </div>
        )}
      </div>

      <div className="w-full text-white relative text-3xl !z-50">
        <span className="flex items-center justify-center w-fit bg-green-600 py-2 px-4 rounded -mt-8 z-[9999] mx-auto">
          Skorun: {score}
        </span>
      </div>
    </div>
  );
}

export default NewGame;
