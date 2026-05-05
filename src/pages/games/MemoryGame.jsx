import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import Layout from "../../layout/Layout";
import { memoryCardPairs, shuffleArray } from "../../data/questions";

const MemoryGame = () => {
  const [phase, setPhase] = useState("intro");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const cardBgs = [
    "from-purple-400 to-purple-600",
    "from-pink-400 to-rose-500",
    "from-cyan-400 to-teal-500",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-emerald-500",
    "from-blue-400 to-indigo-500",
    "from-red-400 to-rose-600",
    "from-violet-400 to-purple-600",
  ];

  const initGame = useCallback(() => {
    const selected = shuffleArray(memoryCardPairs).slice(0, 6);
    const deck = shuffleArray([
      ...selected.map((p) => ({ ...p, type: "term", pairId: p.id })),
      ...selected.map((p) => ({ ...p, text: p.match, type: "match", pairId: p.id })),
    ]).map((card, i) => ({ ...card, cardId: i }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
    setPhase("playing");
  }, []);

  const handleFlip = (cardId) => {
    if (disabled || flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map((id) => cards.find((c) => c.cardId === id));

      if (first.pairId === second.pairId && first.type !== second.type) {
        setTimeout(() => {
          setMatched((prev) => [...prev, first.cardId, second.cardId]);
          setFlipped([]);
          setDisabled(false);
        }, 600);
      } else {
        setTimeout(() => { setFlipped([]); setDisabled(false); }, 1000);
      }
    }
  };

  const isComplete = matched.length === cards.length && cards.length > 0;

  useEffect(() => {
    if (isComplete && phase === "playing") setTimeout(() => setPhase("result"), 500);
  }, [isComplete, phase]);

  const getStars = () => {
    const pairCount = cards.length / 2;
    if (moves <= pairCount + 2) return 3;
    if (moves <= pairCount * 2) return 2;
    return 1;
  };

  return (
    <Layout>
      <div className="page-transition page-bg game-container">
        {phase === "intro" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            <div className="bg-gradient-to-br from-cyan-400 to-teal-500 rounded-[2rem] p-8 text-white border-4 border-cyan-300 shadow-xl">
              <div className="text-7xl mb-4">🃏</div>
              <h1 className="text-4xl text-white mb-3">Hafıza Oyunu</h1>
              <p className="text-cyan-100 text-lg font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Yapay zeka terimlerini eşleştir!
              </p>
              <div className="bg-white/20 rounded-2xl p-4 mb-6 text-left space-y-2 backdrop-blur-sm">
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>🃏 İki kart çevir</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>🧠 Eşleşiyorsa açık kalır</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>⭐ Az hamlede bitir = çok yıldız!</p>
              </div>
              <button onClick={initGame} className="btn-fun text-2xl">🚀 Başla!</button>
            </div>
          </div>
        )}

        {phase === "playing" && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-kid bg-cyan-100 text-cyan-600">🔄 {moves} Hamle</span>
              <span className="badge-kid bg-green-100 text-green-600">✅ {matched.length / 2}/{cards.length / 2}</span>
            </div>

            <div className="progress-bar mb-6">
              <div className="progress-bar-fill" style={{ width: `${(matched.length / cards.length) * 100}%` }} />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {cards.map((card) => {
                const isFlipped = flipped.includes(card.cardId);
                const isMatched = matched.includes(card.cardId);
                const colorIdx = (card.pairId - 1) % cardBgs.length;

                return (
                  <button
                    key={card.cardId}
                    onClick={() => handleFlip(card.cardId)}
                    disabled={isFlipped || isMatched || disabled}
                    className={`aspect-square rounded-2xl font-bold text-sm transition-all duration-300 select-none border-4 ${
                      isFlipped || isMatched
                        ? `bg-gradient-to-br ${cardBgs[colorIdx]} text-white border-white shadow-lg scale-95`
                        : "bg-white hover:scale-105 text-gray-300 border-purple-200 hover:border-purple-400 shadow-md"
                    } ${isMatched ? "opacity-50 scale-90" : ""}`}
                  >
                    {isFlipped || isMatched ? (
                      <div className="flex flex-col items-center justify-center h-full p-2 gap-1">
                        <span className="text-2xl md:text-3xl">{card.emoji}</span>
                        <span className="text-[11px] md:text-xs leading-tight text-center font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                          {card.type === "term" ? card.term : card.match}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-4xl">❓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            <Confetti recycle={false} numberOfPieces={300} />
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-[2rem] p-8 text-white border-4 border-green-300 shadow-xl">
              <div className="text-7xl mb-4">🎉</div>
              <h1 className="text-4xl text-white mb-2">Tebrikler!</h1>
              <p className="text-green-100 text-xl font-bold mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {moves} hamlede tamamladın!
              </p>
              <div className="text-5xl mb-6 space-x-2">
                {[1, 2, 3].map((s) => (
                  <span key={s} className={s <= getStars() ? "inline-block animate-wiggle" : "opacity-30 inline-block"} style={{ animationDelay: `${s * 0.2}s` }}>⭐</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={initGame} className="btn-fun">🔄 Tekrar Oyna</button>
                <Link to="/oyunlar" className="btn-outline-kid">🎮 Diğer Oyunlar</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MemoryGame;
