import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import Layout from "../../layout/Layout";
import { aiQuestions, getRandomQuestions } from "../../data/questions";

const TOTAL_QUESTIONS = 8;

const balloonStyles = [
  { bg: "bg-red-400", glow: "shadow-red-300" },
  { bg: "bg-blue-400", glow: "shadow-blue-300" },
  { bg: "bg-green-400", glow: "shadow-green-300" },
];

const BalloonGame = () => {
  const [phase, setPhase] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [balloonPositions, setBalloonPositions] = useState([]);
  const [popped, setPopped] = useState([]);
  const animRef = useRef(null);

  const startGame = useCallback(() => {
    setQuestions(getRandomQuestions(aiQuestions, TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setPopped([]);
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing" || !questions[currentIndex]) return;
    const count = questions[currentIndex].answers.length;
    setBalloonPositions(
      questions[currentIndex].answers.map((_, i) => ({
        x: ((i + 1) / (count + 1)) * 100,
        y: 105 + Math.random() * 15,
        speed: 0.12 + Math.random() * 0.08,
        wobble: Math.random() * Math.PI * 2,
      }))
    );
    setPopped([]);
  }, [currentIndex, phase, questions]);

  useEffect(() => {
    if (phase !== "playing") return;
    const animate = () => {
      setBalloonPositions((prev) =>
        prev.map((pos) => ({
          ...pos,
          y: pos.y - pos.speed,
          x: pos.x + Math.sin(pos.wobble + pos.y * 0.02) * 0.08,
          wobble: pos.wobble + 0.008,
        }))
      );
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const allOut = balloonPositions.every((p) => p.y < -30);
    if (allOut && balloonPositions.length > 0 && selected === null) {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else setPhase("result");
    }
  }, [balloonPositions, phase, currentIndex, questions.length, selected]);

  const handleBalloonClick = (index) => {
    if (selected !== null || popped.includes(index)) return;
    const isCorrect = index === questions[currentIndex].correct;
    if (isCorrect) {
      setSelected(index);
      setPopped((p) => [...p, index]);
      setScore((s) => s + 1);
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) { setCurrentIndex((i) => i + 1); setSelected(null); }
        else setPhase("result");
      }, 1200);
    } else {
      setPopped((p) => [...p, index]);
    }
  };

  const question = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const passed = score >= Math.ceil(TOTAL_QUESTIONS * 0.6);

  return (
    <Layout>
      <div className="page-transition page-bg game-container">
        {phase === "intro" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-[2rem] p-8 text-white border-4 border-blue-300 shadow-xl">
              <div className="text-7xl mb-4">🎈</div>
              <h1 className="text-4xl text-white mb-3">Balon Patlatma</h1>
              <p className="text-blue-100 text-lg font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Doğru cevabın balonunu patlat!
              </p>
              <div className="bg-white/20 rounded-2xl p-4 mb-6 text-left space-y-2 backdrop-blur-sm">
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>🎈 Balonlar yukarı uçar</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>👆 Doğru balona tıkla</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>⚡ Kaçmadan yakala!</p>
              </div>
              <button onClick={startGame} className="btn-fun text-2xl">🚀 Başla!</button>
            </div>
          </div>
        )}

        {phase === "playing" && question && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-kid bg-blue-100 text-blue-600">🎈 {currentIndex + 1}/{questions.length}</span>
              <span className="badge-kid bg-green-100 text-green-600">⭐ {score}</span>
            </div>

            <div className="progress-bar mb-4">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="question-card mb-4">
              <div className="text-4xl mb-2">{question.emoji}</div>
              <h2 className="text-xl md:text-2xl text-purple-700">{question.question}</h2>
            </div>

            <div className="relative bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 rounded-3xl h-[350px] md:h-[420px] overflow-hidden border-4 border-sky-300 shadow-inner">
              <div className="absolute top-4 left-6 text-4xl opacity-50">☁️</div>
              <div className="absolute top-8 right-12 text-3xl opacity-40">☁️</div>
              <div className="absolute top-20 left-1/2 text-2xl opacity-30">☁️</div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 text-3xl opacity-40">
                🌿🌳🌸🌿🌻🌿🌳🌿
              </div>

              {question.answers.map((answer, i) => {
                const pos = balloonPositions[i];
                if (!pos || popped.includes(i)) return null;
                const style = balloonStyles[i % balloonStyles.length];
                const isCorrectPop = selected === i && i === question.correct;

                return (
                  <button key={`${currentIndex}-${i}`} onClick={() => handleBalloonClick(i)}
                    className="absolute transition-transform duration-75 group"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <div className={`relative ${isCorrectPop ? "animate-bounce-in scale-125" : ""}`}>
                      <div className={`w-28 h-32 md:w-32 md:h-36 ${style.bg} flex items-center justify-center p-3 group-hover:scale-110 transition-transform cursor-pointer shadow-lg ${style.glow}`}
                        style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", border: "3px solid rgba(255,255,255,0.5)" }}>
                        <span className="text-white font-bold text-sm md:text-base text-center leading-tight drop-shadow" style={{ fontFamily: "'Nunito', sans-serif" }}>
                          {answer}
                        </span>
                      </div>
                      <div className={`w-1 h-10 ${style.bg} mx-auto opacity-50 rounded-full`} />
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto" />
                    </div>
                  </button>
                );
              })}

              {selected !== null && selected === question.correct && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl animate-bounce-in">🎉</span>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            {passed && <Confetti recycle={false} numberOfPieces={300} />}
            <div className={`rounded-[2rem] p-8 text-white border-4 shadow-xl ${
              passed ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-300" : "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-300"
            }`}>
              <div className="text-7xl mb-4">{passed ? "🎈" : "💪"}</div>
              <h1 className="text-4xl text-white mb-2">{passed ? "Harika!" : "İyi Deneme!"}</h1>
              <p className="text-white/90 text-xl font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {TOTAL_QUESTIONS} balondan {score} doğru!
              </p>
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

export default BalloonGame;
