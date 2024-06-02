import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

const questions = [
  {
    question: "Yapay zeka, hangi bilim dalının bir alt dalıdır?",
    answers: ["Bilgisayar bilimleri", "Psikoloji", "Fizik"],
    correct: 0,
  },
  {
    question: "Yapay zeka, bilgisayarların ne yapabilmesini sağlar?",
    answers: [
      "Uyumalarını",
      "Düşünmelerini ve öğrenmelerini",
      "Yemek yapmalarını",
    ],
    correct: 1,
  },
  {
    question: "Yapay zekanın en yaygın kullanıldığı yerlerden biri nedir?",
    answers: ["Sesli asistanlar", "Otomobiller", "El fenerleri"],
    correct: 0,
  },
  {
    question: "Siri ve Alexa ne tür yapay zeka örnekleridir?",
    answers: ["Robot", "Sesli asistan", "Bilgisayar oyunu"],
    correct: 1,
  },
  {
    question: "Bir bilgisayar oyununda yapay zeka ne yapar?",
    answers: [
      "Müzik çalar",
      "Oyun oynar",
      "Rakiplerimizi daha akıllı hale getirir",
    ],
    correct: 2,
  },
  {
    question: "Yapay zeka, doktorlara nasıl yardımcı olabilir?",
    answers: [
      "Hastalıkları teşhis ederek",
      "Ameliyat yaparak",
      "Reçete yazarak",
    ],
    correct: 0,
  },
  {
    question:
      "Öneri sistemleri, izlediğimiz veya dinlediğimiz şeylere göre bize ne yapar?",
    answers: ["Yeni şarkılar ve videolar önerir", "Kahve yapar", "Kitap okur"],
    correct: 0,
  },
  {
    question: "Yapay zeka, bir resimdeki kediyi tanımayı nasıl öğrenir?",
    answers: ["Birçok kedi resmi görerek", "Kitap okuyarak", "Uyuyarak"],
    correct: 0,
  },
  {
    question: "Google Asistan, hangi şirketin sesli asistanıdır?",
    answers: ["Apple", "Google", "Amazon"],
    correct: 1,
  },
  {
    question: "Yapay zeka, hangi cihazlarda bulunabilir?",
    answers: ["Akıllı telefonlar", "El fenerleri", "Çiçek vazoları"],
    correct: 0,
  },
  {
    question:
      "Eğer bir yapay zeka robotuna 'En sevdiğin renk ne?' diye sorarsak, ne yapar?",
    answers: [
      "Cevap vermez",
      "Öğrendiği bilgilere göre cevap verir",
      "Şarkı söyler",
    ],
    correct: 1,
  },
  {
    question: "Yapay zeka robotları nasıl öğrenir?",
    answers: ["Kitap okuyarak ve izleyerek", "Oyun oynayarak", "Uyuyarak"],
    correct: 0,
  },
  {
    question: "Bir resim tanıma oyunu ile yapay zeka ne yapabilir?",
    answers: ["Nesneleri tanıyabilir", "Kitap yazabilir", "Dans edebilir"],
    correct: 0,
  },
  {
    question: "Chatbot nedir?",
    answers: [
      "Yemek pişiren bir robot",
      "Sizinle konuşabilen bir bilgisayar programı",
      "Müzik çalan bir cihaz",
    ],
    correct: 1,
  },
  {
    question: "Yapay zeka gelecekte ne yapabilir?",
    answers: [
      "Ev işlerinde yardımcı olabilir",
      "Uzaya gidebilir",
      "Yemek pişirebilir",
    ],
    correct: 0,
  },
  {
    question: "Yapay zeka ile ilgili hikayeler yazmak neye yardımcı olabilir?",
    answers: ["Hayal gücümüzü geliştirmeye", "Uyumaya", "Koşmaya"],
    correct: 0,
  },
  {
    question: "Netflix, hangi yapay zeka türünü kullanarak önerilerde bulunur?",
    answers: ["Öneri sistemleri", "Sesli asistanlar", "Robotlar"],
    correct: 0,
  },
  {
    question: "Bir yapay zeka öğretmen, öğrencilere nasıl yardımcı olabilir?",
    answers: [
      "Dersleri anlatabilir",
      "Ev ödevlerini yapabilir",
      "Müzik dinletebilir",
    ],
    correct: 0,
  },
  {
    question: "Yapay zeka robotları neyi yapamaz?",
    answers: ["Düşünebilir", "Öğrenebilir", "Yemek yiyebilir"],
    correct: 2,
  },
  {
    question: "Yapay zeka ile ilgili en heyecan verici şey nedir?",
    answers: [
      "İnsanlar gibi düşünüp öğrenebilmesi",
      "Uyuması",
      "Yemek pişirmesi",
    ],
    correct: 0,
  },
];
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

function NewGame() {
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
      const newQuestions = getRandomQuestions(questions, 5);
      setSelectedQuestions(newQuestions);
      resetGame(newQuestions);
    }
  }, [gameStarted]);

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

  if (!gameStarted) {
    return (
      <div className="w-full w-full lg:w-[50vw] 2xl:w-[50vw] flex items-center justify-center">
        <button
          onClick={() => setGameStarted(true)}
          className="glow-on-hover w-full lg:w-[50vw] 2xl:w-[50vw]"
        >
          <a
            href="#game-area"
            className="h-full  flex items-center justify-center"
          >
            Oyunu Başlat
          </a>
        </button>
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
          <div className="game-over flex text-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-green-500 p-5 border-3 border-green-500 rounded-lg text-xl !z-50">
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
