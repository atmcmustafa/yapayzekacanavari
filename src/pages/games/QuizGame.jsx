import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import Layout from "../../layout/Layout";
import { aiQuestions, getRandomQuestions } from "../../data/questions";

const TOTAL_QUESTIONS = 10;

const QuizGame = () => {
  const [phase, setPhase] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const startGame = useCallback(() => {
    setQuestions(getRandomQuestions(aiQuestions, TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setPhase("playing");
  }, []);

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);

    const isCorrect = index === questions[currentIndex].correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else {
        setPhase("result");
      }
    }, 1200);
  };

  const question = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const passed = score >= Math.ceil(TOTAL_QUESTIONS * 0.6);

  return (
    <Layout>
      <div className="page-transition page-bg game-container">
        {phase === "intro" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-[2rem] p-8 text-white border-4 border-purple-300 shadow-xl">
              <div className="text-7xl mb-4">🧠</div>
              <h1 className="text-4xl text-white mb-3">Bilgi Yarışması</h1>
              <p className="text-purple-100 text-lg font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {TOTAL_QUESTIONS} soru cevaplayacaksın!
                <br />Her doğru cevap 1 puan!
              </p>

              <div className="bg-white/20 rounded-2xl p-4 mb-6 text-left space-y-2 backdrop-blur-sm">
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>🎯 {Math.ceil(TOTAL_QUESTIONS * 0.6)}+ puan ile kazanırsın</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>⏱️ Süre sınırı yok</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>💡 Her sorunun 3 seçeneği var</p>
              </div>

              <button onClick={startGame} className="btn-fun text-2xl">
                🚀 Başla!
              </button>
            </div>
          </div>
        )}

        {phase === "playing" && question && (
          <div className="max-w-2xl mx-auto animate-bounce-in" key={currentIndex}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge-kid bg-purple-100 text-purple-600">
                📝 {currentIndex + 1}/{questions.length}
              </span>
              <span className="badge-kid bg-green-100 text-green-600">
                ⭐ {score} Puan
              </span>
            </div>

            <div className="progress-bar mb-6">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="question-card mb-6">
              <div className="text-5xl mb-3">{question.emoji}</div>
              <h2 className="text-2xl md:text-3xl text-purple-700">
                {question.question}
              </h2>
            </div>

            <div className="space-y-3">
              {question.answers.map((answer, i) => {
                let className = "answer-btn";
                if (selected !== null) {
                  if (i === question.correct) className += " correct";
                  else if (i === selected) className += " wrong";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={className}
                    disabled={selected !== null}
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mr-3 flex-shrink-0"
                      style={{ fontFamily: "'Bubblegum Sans', cursive" }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {answer}
                    {selected !== null && i === question.correct && " ✅"}
                    {selected === i && i !== question.correct && " ❌"}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            {passed && <Confetti recycle={false} numberOfPieces={300} />}

            <div className={`rounded-[2rem] p-8 text-white border-4 shadow-xl ${
              passed
                ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-300"
                : "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-300"
            }`}>
              <div className="text-7xl mb-4">{passed ? "🏆" : "💪"}</div>
              <h1 className="text-4xl text-white mb-2">
                {passed ? "Tebrikler!" : "İyi Deneme!"}
              </h1>
              <p className="text-white/90 text-xl font-bold mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {TOTAL_QUESTIONS} sorudan {score} tanesini bildin!
              </p>

              <div className="w-36 h-36 mx-auto rounded-full bg-white/30 flex items-center justify-center mb-6 border-4 border-white/50">
                <span className="text-5xl font-bold" style={{ fontFamily: "'Bubblegum Sans', cursive" }}>
                  {score}/{TOTAL_QUESTIONS}
                </span>
              </div>

              <div className="text-3xl mb-6 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.ceil(score / 2) ? "" : "opacity-30"}>
                    ⭐
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={startGame} className="btn-fun">
                  🔄 Tekrar Oyna
                </button>
                <Link to="/oyunlar" className="btn-outline-kid">
                  🎮 Diğer Oyunlar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizGame;
