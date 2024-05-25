import { useEffect, useState } from "react";
import Balloon from "./Balloon";
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

function Game() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [positions, setPositions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [poppedIndexes, setPoppedIndexes] = useState([]);
  const [resetBottom, setResetBottom] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [gameResult, setGameResult] = useState("");

  useEffect(() => {
    const updatePositions = () => {
      const container = document.querySelector(".game-area");
      if (container) {
        const containerWidth = container.clientWidth;
        const balloonWidth = 100;
        const count =
          selectedQuestions[currentQuestionIndex]?.answers.length || 0;
        setPositions(getRandomPositions(count, containerWidth, balloonWidth));
      }
    };

    window.addEventListener("resize", updatePositions);
    updatePositions();

    return () => window.removeEventListener("resize", updatePositions);
  }, [currentQuestionIndex, selectedQuestions, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const newQuestions = getRandomQuestions(questions, 5);
      setSelectedQuestions(newQuestions);
      resetGame();
    }
  }, [gameStarted]);

  const handleAnswer = (index) => {
    if (index === selectedQuestions[currentQuestionIndex].correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setScore(score + 1);
      if (currentQuestionIndex + 1 < selectedQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setPoppedIndexes([]);
        setResetBottom(true);
      } else {
        if (score + 1 >= 1) {
          setGameResult("Tebrikler! Oyunu kazandınız!");
          setGameCompleted(true);
        } else {
          setGameCompleted(true);
        }
      }
    } else {
      setPoppedIndexes([...poppedIndexes, index]);
    }
  };

  const resetGame = () => {
    setGameCompleted(false);
    setCurrentQuestionIndex(0);
    setPoppedIndexes([]);
    setGameStarted(true);
    setResetBottom(true);
    setScore(0);
    setPositions([]);
    setTimeout(() => {
      setPositions(getRandomPositions(questions[0].answers.length, 800, 100));
    }, 10);
  };

  const handleEscape = (index) => {
    setPositions((prevPositions) =>
      prevPositions.filter((_, i) => i !== index)
    );
    if (positions.length === 1 && !gameCompleted) {
      setGameCompleted(true);
      setGameResult("Süreniz bitti!");
    }
  };

  const getRandomPositions = (count) => {
    const gameArea = document.querySelector(".game-area");
    const containerWidth = gameArea.offsetWidth;
    const balloonWidth = 80;
    const spacing = (containerWidth - balloonWidth * count) / (count + 1);

    let positions = [];
    const totalWidth = count * balloonWidth + (count - 1) * spacing;
    let currentLeft = (containerWidth - totalWidth) / 2;

    for (let i = 0; i < count; i++) {
      positions.push(currentLeft);
      currentLeft += balloonWidth + spacing;
    }

    return positions;
  };

  const getRandomQuestions = (questions, numQuestions) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  };

  if (!gameStarted) {
    return (
      <div className="w-full flex items-center justify-center ">
        <button
          onClick={() => setGameStarted(true)}
          className=" glow-on-hover  !w-[300px]"
        >
          <a
            href="#game-area"
            className="h-full w-full flex items-center justify-center"
          >
            Oyunu Başlat
          </a>
        </button>
      </div>
    );
  }

  return (
    <div className=" h-full">
      <div
        id="game-area"
        className="game-area  relative overflow-hidden border-2 border-black z-30 rounded"
      >
        <div className="absolute bg-black/50 inset-0 w-full h-full -z-10"></div>
        {showConfetti && <Confetti width={800} height={600} />}
        <div className="question text-center text-2xl mt-5  w-80 sm:w-[400px] lg:w-[500px] xl:w-[700px]  text-deep-orange-600 font-bold !z-[30]">
          {selectedQuestions[currentQuestionIndex]?.question}
        </div>

        {positions.map((position, index) => (
          <Balloon
            key={index}
            text={selectedQuestions[currentQuestionIndex].answers[index]}
            left={position}
            onEscape={() => handleEscape(index)}
            onAnswer={() => handleAnswer(index)}
            index={index}
            isPopped={poppedIndexes.includes(index)}
          />
        ))}
        {gameCompleted && (
          <div className="game-over flex text-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-green-500 p-5 border-3 border-green-500 rounded-lg text-xl !z-50">
            {gameResult}
            <button
              className="retry-button mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setGameStarted(false)}
            >
              Yeniden Başla
            </button>
          </div>
        )}
      </div>

      <div className="w-full text-white relative text-3xl  !z-50">
        <span className="flex items-center justify-center w-fit bg-green-600 py-2 px-4 rounded -mt-8 z-[9999] mx-auto">
          Skorun: {score}
        </span>
      </div>
    </div>
  );
}

export default Game;
