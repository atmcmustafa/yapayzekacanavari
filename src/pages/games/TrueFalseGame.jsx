import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import Layout from "../../layout/Layout";
import { trueFalseQuestions, shuffleArray } from "../../data/questions";

const TOTAL = 8;

const TrueFalseGame = () => {
  const [phase, setPhase] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const startGame = useCallback(() => {
    setQuestions(shuffleArray(trueFalseQuestions).slice(0, TOTAL));
    setCurrentIndex(0);
    setScore(0);
    setAnswered(null);
    setStreak(0);
    setBestStreak(0);
    setPhase("playing");
  }, []);

  const handleAnswer = (answer) => {
    if (answered !== null) return;
    const isCorrect = answer === questions[currentIndex].answer;
    setAnswered(answer);

    if (isCorrect) {
      setScore((s) => s + 1);
      const ns = streak + 1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setAnswered(null);
      } else {
        setPhase("result");
      }
    }, 1800);
  };

  const q = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const passed = score >= Math.ceil(TOTAL * 0.6);

  return (
    <Layout>
      <div className="page-transition page-bg game-container">
        {phase === "intro" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[2rem] p-8 text-white border-4 border-yellow-300 shadow-xl">
              <div className="text-7xl mb-4">✅</div>
              <h1 className="text-4xl text-white mb-3">Doğru mu Yanlış mı?</h1>
              <p className="text-yellow-100 text-lg font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Cümleleri oku ve karar ver!
              </p>
              <div className="bg-white/20 rounded-2xl p-4 mb-6 text-left space-y-2 backdrop-blur-sm">
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>📝 {TOTAL} cümle okuyacaksın</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>✅ Doğru veya ❌ Yanlış seç</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>🔥 Arka arkaya doğru = seri!</p>
              </div>
              <button onClick={startGame} className="btn-purple text-2xl">🚀 Başla!</button>
            </div>
          </div>
        )}

        {phase === "playing" && q && (
          <div className="max-w-2xl mx-auto animate-bounce-in" key={currentIndex}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge-kid bg-orange-100 text-orange-600">📝 {currentIndex + 1}/{questions.length}</span>
              <div className="flex gap-2">
                {streak > 1 && (
                  <span className="badge-kid bg-red-100 text-red-500 animate-bounce-in">🔥 {streak} Seri!</span>
                )}
                <span className="badge-kid bg-green-100 text-green-600">⭐ {score}</span>
              </div>
            </div>

            <div className="progress-bar mb-6">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="question-card mb-6">
              <div className="text-5xl mb-4">{q.emoji}</div>
              <h2 className="text-2xl md:text-3xl text-purple-700 mb-2">
                "{q.statement}"
              </h2>
              {answered !== null && (
                <div className={`mt-4 p-4 rounded-2xl font-bold animate-bounce-in border-2 ${
                  answered === q.answer
                    ? "bg-green-50 text-green-700 border-green-300"
                    : "bg-red-50 text-red-700 border-red-300"
                }`} style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {answered === q.answer ? "✅ Doğru! " : "❌ Yanlış! "}
                  {q.explanation}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                disabled={answered !== null}
                className={`py-8 rounded-3xl text-2xl font-bold transition-all duration-200 border-4 ${
                  answered !== null && q.answer === true
                    ? "bg-green-400 border-green-500 text-white scale-105 shadow-lg"
                    : answered === true && q.answer !== true
                    ? "bg-red-400 border-red-500 text-white"
                    : "bg-white border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 hover:scale-105 shadow-md"
                }`}
                style={{ fontFamily: "'Bubblegum Sans', cursive", boxShadow: answered === null ? '0 6px 0 #86EFAC' : undefined }}
              >
                ✅ Doğru
              </button>
              <button
                onClick={() => handleAnswer(false)}
                disabled={answered !== null}
                className={`py-8 rounded-3xl text-2xl font-bold transition-all duration-200 border-4 ${
                  answered !== null && q.answer === false
                    ? "bg-green-400 border-green-500 text-white scale-105 shadow-lg"
                    : answered === false && q.answer !== false
                    ? "bg-red-400 border-red-500 text-white"
                    : "bg-white border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 hover:scale-105 shadow-md"
                }`}
                style={{ fontFamily: "'Bubblegum Sans', cursive", boxShadow: answered === null ? '0 6px 0 #FCA5A5' : undefined }}
              >
                ❌ Yanlış
              </button>
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
              <div className="text-7xl mb-4">{passed ? "🌟" : "💪"}</div>
              <h1 className="text-4xl text-white mb-2">{passed ? "Harikasın!" : "İyi Deneme!"}</h1>
              <p className="text-white/90 text-xl font-bold mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {TOTAL} sorudan {score} doğru!
              </p>
              <div className="flex justify-center gap-6 mb-6">
                <div className="bg-white/20 rounded-2xl p-4 text-center border-2 border-white/30">
                  <div className="text-3xl mb-1">⭐</div>
                  <div className="text-2xl font-bold">{score}/{TOTAL}</div>
                  <div className="text-xs text-white/70" style={{ fontFamily: "'Nunito', sans-serif" }}>Puan</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 text-center border-2 border-white/30">
                  <div className="text-3xl mb-1">🔥</div>
                  <div className="text-2xl font-bold">{bestStreak}</div>
                  <div className="text-xs text-white/70" style={{ fontFamily: "'Nunito', sans-serif" }}>En İyi Seri</div>
                </div>
              </div>
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

export default TrueFalseGame;
