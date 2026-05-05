import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const games = [
  {
    id: "quiz",
    title: "Bilgi Yarışması",
    desc: "Soruları cevapla, puanını artır!",
    emoji: "🧠",
    bg: "from-purple-400 to-purple-600",
    border: "border-purple-300",
    path: "/oyun/quiz",
    badge: "Popüler",
    badgeBg: "bg-red-500",
  },
  {
    id: "memory",
    title: "Hafıza Oyunu",
    desc: "Kartları eşleştir!",
    emoji: "🃏",
    bg: "from-cyan-400 to-teal-500",
    border: "border-cyan-300",
    path: "/oyun/hafiza",
    badge: "Yeni",
    badgeBg: "bg-green-500",
  },
  {
    id: "truefalse",
    title: "Doğru mu Yanlış mı?",
    desc: "Cümleleri değerlendir!",
    emoji: "✅",
    bg: "from-yellow-400 to-orange-500",
    border: "border-yellow-300",
    path: "/oyun/dogru-yanlis",
    badge: "Yeni",
    badgeBg: "bg-green-500",
  },
  {
    id: "wordguess",
    title: "Kelime Tahmin",
    desc: "İpuçlarından kelimeleri bul!",
    emoji: "🔤",
    bg: "from-pink-400 to-rose-500",
    border: "border-pink-300",
    path: "/oyun/kelime-tahmin",
    badge: "Yeni",
    badgeBg: "bg-green-500",
  },
  {
    id: "puzzle",
    title: "Puzzle Tamamla",
    desc: "Parçaları topla!",
    emoji: "🧩",
    bg: "from-green-400 to-emerald-500",
    border: "border-green-300",
    path: "/oyun/puzzle",
    badge: null,
    badgeBg: "",
  },
  {
    id: "balloon",
    title: "Balon Patlatma",
    desc: "Doğru balonu patlat!",
    emoji: "🎈",
    bg: "from-blue-400 to-indigo-500",
    border: "border-blue-300",
    path: "/oyun/balon",
    badge: null,
    badgeBg: "",
  },
];

const GamesList = () => {
  return (
    <Layout>
      <div className="page-transition page-bg">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <div className="text-6xl mb-3 animate-float inline-block">🎮</div>
            <h1 className="text-4xl md:text-5xl text-purple-600 mb-2">
              Oyun Zamanı!
            </h1>
            <p className="text-gray-500 text-xl font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Bir oyun seç ve maceraya başla!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, i) => (
              <Link key={game.id} to={game.path} className="group block">
                <div
                  className={`game-card bg-gradient-to-br ${game.bg} ${game.border} relative h-full min-h-[200px] flex flex-col items-center justify-center text-center text-white`}
                >
                  {game.badge && (
                    <span
                      className={`absolute top-3 right-3 ${game.badgeBg} text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-md`}
                      style={{ fontFamily: "'Bubblegum Sans', cursive" }}
                    >
                      {game.badge}
                    </span>
                  )}

                  <div className="text-6xl mb-3 group-hover:animate-wiggle transition-transform drop-shadow-lg">
                    {game.emoji}
                  </div>

                  <h3
                    className="text-2xl text-white mb-1 drop-shadow"
                    style={{ fontFamily: "'Bubblegum Sans', cursive" }}
                  >
                    {game.title}
                  </h3>

                  <p className="text-white/80 font-bold text-base mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {game.desc}
                  </p>

                  <div className="bg-white/30 backdrop-blur-sm rounded-full px-5 py-2 font-bold text-sm border-2 border-white/40 group-hover:bg-white/50 transition-all"
                    style={{ fontFamily: "'Bubblegum Sans', cursive" }}>
                    ▶ Oyna!
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesList;
