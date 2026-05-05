import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import Layout from "../../layout/Layout";
import { wordMatchData, shuffleArray } from "../../data/questions";

const MAX_WRONG = 5;

const WordGuessGame = () => {
  const [phase, setPhase] = useState("intro");
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const startGame = useCallback(() => {
    setWords(shuffleArray(wordMatchData).slice(0, 5));
    setWordIndex(0);
    setGuessedLetters([]);
    setWrongCount(0);
    setSolvedCount(0);
    setShowHint(false);
    setPhase("playing");
  }, []);

  const currentWord = words[wordIndex];
  const turkishAlphabet = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split("");

  const getDisplayWord = () => {
    if (!currentWord) return [];
    return currentWord.word.split("").map((letter) => {
      if (letter === " ") return { letter: " ", revealed: true };
      return { letter, revealed: guessedLetters.includes(letter) };
    });
  };

  const isWordComplete = () => {
    if (!currentWord) return false;
    return currentWord.word.split("").filter((l) => l !== " ").every((l) => guessedLetters.includes(l));
  };

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    if (!currentWord.word.includes(letter)) {
      const nw = wrongCount + 1;
      setWrongCount(nw);
      if (nw >= MAX_WRONG) {
        setTimeout(() => {
          if (wordIndex + 1 < words.length) nextWord();
          else setPhase("result");
        }, 1500);
      }
    } else {
      const allRevealed = currentWord.word.split("").filter((l) => l !== " ").every((l) => newGuessed.includes(l));
      if (allRevealed) {
        setSolvedCount((s) => s + 1);
        setTimeout(() => {
          if (wordIndex + 1 < words.length) nextWord();
          else setPhase("result");
        }, 1500);
      }
    }
  };

  const nextWord = () => {
    setWordIndex((i) => i + 1);
    setGuessedLetters([]);
    setWrongCount(0);
    setShowHint(false);
  };

  const displayWord = getDisplayWord();
  const isLost = wrongCount >= MAX_WRONG;
  const isWon = isWordComplete();

  const hearts = Array.from({ length: MAX_WRONG }).map((_, i) => (
    <span key={i} className={`text-3xl transition-all duration-300 inline-block ${i < wrongCount ? "grayscale opacity-30 scale-75" : "animate-float"}`}
      style={{ animationDelay: `${i * 0.3}s` }}>
      ❤️
    </span>
  ));

  return (
    <Layout>
      <div className="page-transition page-bg game-container">
        {phase === "intro" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-[2rem] p-8 text-white border-4 border-pink-300 shadow-xl">
              <div className="text-7xl mb-4">🔤</div>
              <h1 className="text-4xl text-white mb-3">Kelime Tahmin</h1>
              <p className="text-pink-100 text-lg font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Yapay zeka kelimelerini bul!
              </p>
              <div className="bg-white/20 rounded-2xl p-4 mb-6 text-left space-y-2 backdrop-blur-sm">
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>🔤 Harflere tıkla</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>💡 İpucu alabilirsin</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>❤️ {MAX_WRONG} can hakkın var</p>
              </div>
              <button onClick={startGame} className="btn-fun text-2xl">🚀 Başla!</button>
            </div>
          </div>
        )}

        {phase === "playing" && currentWord && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-kid bg-pink-100 text-pink-600">📝 {wordIndex + 1}/{words.length}</span>
              <span className="badge-kid bg-green-100 text-green-600">✅ {solvedCount} Çözüldü</span>
            </div>

            <div className="progress-bar mb-6">
              <div className="progress-bar-fill" style={{ width: `${((wordIndex + (isWon || isLost ? 1 : 0)) / words.length) * 100}%` }} />
            </div>

            <div className="question-card mb-4">
              <div className="text-5xl mb-3">{currentWord.emoji}</div>

              <div className="flex justify-center gap-2 md:gap-3 mb-6 flex-wrap">
                {displayWord.map((item, i) =>
                  item.letter === " " ? (
                    <div key={i} className="w-4" />
                  ) : (
                    <div key={i} className={`w-11 h-14 md:w-14 md:h-16 rounded-2xl border-4 flex items-center justify-center font-bold text-2xl md:text-3xl transition-all duration-300 ${
                      item.revealed
                        ? "bg-purple-100 border-purple-400 text-purple-700"
                        : isLost
                        ? "bg-red-100 border-red-400 text-red-600"
                        : "bg-gray-100 border-gray-300 text-transparent"
                    }`} style={{ fontFamily: "'Bubblegum Sans', cursive" }}>
                      {item.revealed || isLost ? item.letter : "?"}
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-center gap-1 mb-4">{hearts}</div>

              {!showHint && !isWon && !isLost && (
                <button onClick={() => setShowHint(true)} className="text-base text-purple-500 hover:text-purple-700 font-bold underline" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  💡 İpucu Göster
                </button>
              )}
              {showHint && (
                <p className="text-base text-purple-700 bg-purple-50 rounded-2xl p-3 animate-bounce-in border-2 border-purple-200 font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  💡 {currentWord.hint}
                </p>
              )}
              {isWon && (
                <div className="mt-3 p-4 bg-green-100 text-green-700 rounded-2xl font-bold animate-bounce-in border-2 border-green-300 text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  🎉 Harika! Kelimeyi buldun!
                </div>
              )}
              {isLost && (
                <div className="mt-3 p-4 bg-red-100 text-red-700 rounded-2xl font-bold animate-bounce-in border-2 border-red-300 text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Kelime: <strong>{currentWord.word}</strong> — Bir dahaki sefere!
                </div>
              )}
            </div>

            {!isWon && !isLost && (
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                {turkishAlphabet.map((letter) => {
                  const used = guessedLetters.includes(letter);
                  const inWord = currentWord.word.includes(letter);
                  return (
                    <button key={letter} onClick={() => handleGuess(letter)} disabled={used}
                      className={`w-10 h-11 md:w-12 md:h-13 rounded-xl font-bold text-base transition-all duration-200 border-2 ${
                        used
                          ? inWord
                            ? "bg-green-300 border-green-400 text-white"
                            : "bg-gray-200 border-gray-300 text-gray-400"
                          : "bg-white border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-400 hover:scale-110 shadow-sm"
                      }`}
                      style={{ fontFamily: "'Bubblegum Sans', cursive", boxShadow: !used ? '0 3px 0 #C4B5FD' : 'none' }}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {phase === "result" && (
          <div className="max-w-lg mx-auto text-center animate-bounce-in">
            {solvedCount >= 3 && <Confetti recycle={false} numberOfPieces={300} />}
            <div className={`rounded-[2rem] p-8 text-white border-4 shadow-xl ${
              solvedCount >= 3
                ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-300"
                : "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-300"
            }`}>
              <div className="text-7xl mb-4">{solvedCount >= 3 ? "🏆" : "💪"}</div>
              <h1 className="text-4xl text-white mb-2">{solvedCount >= 3 ? "Süpersin!" : "İyi Deneme!"}</h1>
              <p className="text-white/90 text-xl font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {words.length} kelimeden {solvedCount} tanesini buldun!
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

export default WordGuessGame;
