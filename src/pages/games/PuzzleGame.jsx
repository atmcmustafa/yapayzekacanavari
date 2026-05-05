import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import Layout from "../../layout/Layout";
import { aiQuestions, getRandomQuestions } from "../../data/questions";

const GRID_SIZE = 9;
const TIME_PER_QUESTION = 25;

const puzzleColors = [
  "from-purple-400 to-purple-500",
  "from-pink-400 to-rose-500",
  "from-cyan-400 to-teal-500",
  "from-yellow-400 to-orange-500",
  "from-green-400 to-emerald-500",
  "from-blue-400 to-indigo-500",
  "from-red-400 to-rose-500",
  "from-violet-400 to-purple-600",
  "from-amber-400 to-yellow-500",
];

const PuzzleGame = () => {
  const [phase, setPhase] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [pieces, setPieces] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = () => {
    clearTimer();
    setTimeLeft(TIME_PER_QUESTION);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearTimer(); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearTimer(), []);

  const startGame = useCallback(() => {
    setQuestions(getRandomQuestions(aiQuestions, 15));
    setCurrentIndex(0);
    setScore(0);
    setPieces(0);
    setSelected(null);
    setPhase("playing");
    startTimer();
  }, []);

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    clearTimer();

    const isCorrect = index === questions[currentIndex].correct;
    if (isCorrect) { setScore((s) => s + 1); setPieces((p) => p + 1); }

    setTimeout(() => {
      const np = isCorrect ? pieces + 1 : pieces;
      if (np >= GRID_SIZE) { setPhase("result"); return; }
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        startTimer();
      } else { setPhase("result"); }
    }, 1200);
  };

  useEffect(() => {
    if (timeLeft === 0 && selected === null && phase === "playing") {
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
          startTimer();
        } else { setPhase("result"); }
      }, 500);
    }
  }, [timeLeft, selected, phase]);

  const question = questions[currentIndex];
  const won = pieces >= GRID_SIZE;

  return (
    <Layout>
      <div className="page-transition page-bg game-container">
        {phase === "intro" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-[2rem] p-8 text-white border-4 border-green-300 shadow-xl">
              <div className="text-7xl mb-4">🧩</div>
              <h1 className="text-4xl text-white mb-3">Puzzle Tamamla</h1>
              <p className="text-green-100 text-lg font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Soruları cevapla, parçaları topla!
              </p>
              <div className="bg-white/20 rounded-2xl p-4 mb-6 text-left space-y-2 backdrop-blur-sm">
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>🧩 {GRID_SIZE} parça topla</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>⏱️ Her soru {TIME_PER_QUESTION} saniye</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>✅ Doğru cevap = 1 parça</p>
              </div>
              <button onClick={startGame} className="btn-fun text-2xl">🚀 Başla!</button>
            </div>
          </div>
        )}

        {phase === "playing" && question && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-kid bg-green-100 text-green-600">📝 Soru {currentIndex + 1}</span>
              <span className={`badge-kid ${timeLeft <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-yellow-100 text-yellow-700"}`}>
                ⏱️ {timeLeft}s
              </span>
              <span className="badge-kid bg-purple-100 text-purple-600">🧩 {pieces}/{GRID_SIZE}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="grid grid-cols-3 gap-2 max-w-[280px] mx-auto w-full">
                {Array.from({ length: GRID_SIZE }).map((_, i) => (
                  <div key={i} className={`rounded-2xl flex items-center justify-center text-3xl font-bold transition-all duration-500 aspect-square border-2 ${
                    i < pieces
                      ? `bg-gradient-to-br ${puzzleColors[i]} text-white border-white shadow-lg scale-100`
                      : "bg-white border-gray-200 text-gray-300 scale-90"
                  }`}>
                    {i < pieces ? "🧩" : <span className="text-xl" style={{ fontFamily: "'Bubblegum Sans', cursive" }}>{i + 1}</span>}
                  </div>
                ))}
              </div>

              <div>
                <div className="question-card mb-4">
                  <div className="text-4xl mb-2">{question.emoji}</div>
                  <h3 className="text-xl md:text-2xl text-purple-700">{question.question}</h3>
                </div>
                <div className="space-y-2">
                  {question.answers.map((answer, i) => {
                    let cn = "answer-btn";
                    if (selected !== null) {
                      if (i === question.correct) cn += " correct";
                      else if (i === selected) cn += " wrong";
                    }
                    return (
                      <button key={i} onClick={() => handleAnswer(i)} className={cn} disabled={selected !== null || timeLeft === 0}>
                        {answer}
                        {selected !== null && i === question.correct && " ✅"}
                        {selected === i && i !== question.correct && " ❌"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            {won && <Confetti recycle={false} numberOfPieces={300} />}
            <div className={`rounded-[2rem] p-8 text-white border-4 shadow-xl ${
              won ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-300" : "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-300"
            }`}>
              <div className="text-7xl mb-4">{won ? "🧩" : "💪"}</div>
              <h1 className="text-4xl text-white mb-2">{won ? "Puzzle Tamamlandı!" : "İyi Deneme!"}</h1>
              <p className="text-white/90 text-xl font-bold mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {pieces} parça topladın!
              </p>
              {won && (
                <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mb-6">
                  {Array.from({ length: GRID_SIZE }).map((_, i) => (
                    <div key={i} className={`rounded-xl bg-gradient-to-br ${puzzleColors[i]} text-white h-14 flex items-center justify-center text-xl border-2 border-white/50`}>🧩</div>
                  ))}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={startGame} className="btn-fun">🔄 Tekrar Oyna</button>
                <Link to="/oyunlar" className="btn-outline-kid">🎮 Diğer Oyunlar</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PuzzleGame;
