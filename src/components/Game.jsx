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
    question: "Hangi programlama dili yapay zeka geliştirme için popülerdir?",
    answers: ["Python", "Java", "JavaScript"],
    correct: 0,
  },
  {
    question: "Nöral ağlar neyi modellemek için kullanılır?",
    answers: ["İnsan beyni", "Hava durumu", "Ekonomik sistemler"],
    correct: 0,
  },
  {
    question:
      "Makine öğrenmesinde, 'öğrenme sürecini denetleyen' modeller hangi kategori altında değerlendirilir?",
    answers: [
      "Denetimsiz öğrenme",
      "Denetimli öğrenme",
      "Pekiştirmeli öğrenme",
    ],
    correct: 1,
  },
  {
    question:
      "Doğal dil işleme ile en çok hangi tip AI uygulaması geliştirilir?",
    answers: ["Chatbotlar", "Tavsiye sistemleri", "Otomatik pilot sistemler"],
    correct: 0,
  },
  {
    question: "Prompt mühendisliği hangi teknoloji ile ilişkilidir?",
    answers: ["Blockchain", "Yapay zeka", "IoT"],
    correct: 1,
  },
  {
    question:
      "Bir yapay zeka modeli eğitilirken, modelin aşırı uyum sağlamasını (overfitting) önlemek için ne yapılabilir?",
    answers: ["Modeli basitleştirme", "Eğitim süresini kısaltma", "Tümü doğru"],
    correct: 1,
  },
  {
    question: "Hangisi yapay zeka etiği ile ilgili bir sorundur?",
    answers: ["Enerji tüketimi", "Algoritmik yanlılık", "Veri depolama"],
    correct: 1,
  },
  {
    question:
      "Bir yapay zeka sistemi gerçek dünya verileriyle nasıl test edilir?",
    answers: [
      "Kontrollü denemeler",
      "Gerçek dünya senaryolarında",
      "Tümü doğru",
    ],
    correct: 2,
  },
  {
    question: "Transfer öğrenme, yapay zeka modellerinde neyi amaçlar?",
    answers: [
      "Öğrenme sürecini hızlandırmak",
      "Daha az veri ile öğrenmek",
      "Tümü doğru",
    ],
    correct: 1,
  },
  {
    question: "Prompt mühendisliği hangi sorunu çözmeyi hedefler?",
    answers: [
      "Veri güvenliği",
      "Modelin kullanıcı isteklerine yanıt verme şekli",

      "Veri depolama",
    ],
    correct: 1,
  },
  {
    question:
      "Özel bir yapay zeka uygulaması için modelin optimize edilmesi işlemine ne ad verilir?",
    answers: [
      "Fonksiyonel tuning",
      "Hiperparametre ayarlama",

      "Veri seti optimizasyonu",
    ],
    correct: 1,
  },
  {
    question:
      "Görüntü tanıma teknolojileri hangi yapay zeka tekniklerinden faydalanır?",
    answers: ["Doğal dil işleme", "Derin öğrenme", "Karar ağaçları"],
    correct: 1,
  },
  {
    question:
      "Bir chatbot'un kullanıcı sorularına daha doğru yanıt verebilmesi için hangi teknoloji kullanılır?",
    answers: ["Doğal dil işleme", "Lojistik regresyon", "Ana bileşen analizi"],
    correct: 0,
  },
  {
    question: "Yapay zeka ile ilgili hangi yaklaşım biyolojik ilham alır?",
    answers: ["Simüle annealing", "Genetik algoritmalar", "SVM"],
    correct: 1,
  },
  {
    question:
      "Hangi metrik, bir yapay zeka modelinin performansını değerlendirmede kullanılmaz?",
    answers: ["F1-Skoru", "MSE", "ROI"],
    correct: 1,
  },
  {
    question:
      "Yapay zekanın karar verme süreçlerinde şeffaflığı sağlamak için hangi yöntemler kullanılır?",
    answers: ["Kara kutu modelleri", "Açıklanabilir AI", "Hiçbiri"],
    correct: 1,
  },
  {
    question: "Prompt mühendisliğinin amacı nedir?",
    answers: [
      "Daha hızlı hesaplama",
      "Daha doğru veri analizi",
      "AI modellerinden daha iyi yanıtlar almak",
    ],
    correct: 2,
  },
  {
    question: "Otonom araçlar hangi yapay zeka tekniklerini kullanır?",
    answers: ["Denetimli öğrenme", "Denetimsiz öğrenme", "Tümü doğru"],
    correct: 1,
  },
  {
    question:
      "Bir yapay zeka modelinin öğrenme kapasitesi hangi özellik ile doğrudan ilişkilidir?",
    answers: ["Model mimarisi", "Hiperparametreler", "Tümü doğru"],
    correct: 1,
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
