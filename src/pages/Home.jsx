import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const FloatingEmoji = ({ emoji, className }) => (
  <span className={`absolute text-4xl md:text-5xl pointer-events-none select-none opacity-60 ${className}`}>
    {emoji}
  </span>
);

const Home = () => {
  return (
    <Layout>
      <div className="page-transition page-bg">
        {/* HERO */}
        <section className="relative overflow-hidden py-12 md:py-20 px-4">
          <FloatingEmoji emoji="⭐" className="top-8 left-[10%] animate-float" />
          <FloatingEmoji emoji="🌟" className="top-16 right-[15%] animate-float" style={{ animationDelay: "1s" }} />
          <FloatingEmoji emoji="✨" className="bottom-8 left-[20%] animate-float" style={{ animationDelay: "0.5s" }} />
          <FloatingEmoji emoji="💫" className="bottom-16 right-[10%] animate-float" style={{ animationDelay: "1.5s" }} />
          <FloatingEmoji emoji="🎈" className="top-24 left-[5%] animate-float hidden md:block" style={{ animationDelay: "2s" }} />
          <FloatingEmoji emoji="🚀" className="top-4 right-[5%] animate-float hidden md:block" style={{ animationDelay: "0.8s" }} />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="relative inline-block mb-6">
              <span className="text-8xl md:text-[140px] inline-block animate-float">🤖</span>
              <span className="absolute -top-2 -right-4 text-3xl animate-spin-slow">⚙️</span>
            </div>

            <h1 className="text-5xl md:text-7xl text-purple-600 mb-4 drop-shadow-md">
              Yapay Zeka Canavarı
            </h1>

            <div className="bg-white rounded-3xl p-4 md:p-6 max-w-2xl mx-auto mb-8 border-4 border-purple-200 shadow-lg">
              <p className="text-xl md:text-2xl text-gray-600 font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Merhaba küçük kaşif! 👋
                <br />
                Oyunlar oynayarak yapay zekanın{" "}
                <span className="text-purple-500">harika dünyasını</span> keşfetmeye hazır mısın?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/oyunlar" className="btn-hero">
                🎮 Hadi Oynayalım!
              </Link>
              <Link to="/hakkinda" className="btn-outline-kid text-xl">
                📖 YZ Nedir?
              </Link>
            </div>
          </div>
        </section>

        {/* WHAT IS AI - COLORFUL BOXES */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-3xl md:text-4xl text-center text-purple-600 mb-8">
            🌈 Neler Öğreneceksin?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl p-6 text-white text-center border-4 border-pink-300 shadow-lg transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
              <div className="text-5xl mb-3">🎮</div>
              <h3 className="text-2xl text-white mb-2">6 Eğlenceli Oyun</h3>
              <p className="text-pink-100 font-bold text-base" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Bilgi yarışması, hafıza oyunu, kelime tahmin ve dahası!
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl p-6 text-white text-center border-4 border-blue-300 shadow-lg transform hover:-translate-y-2 hover:-rotate-1 transition-all duration-300">
              <div className="text-5xl mb-3">🧠</div>
              <h3 className="text-2xl text-white mb-2">Yapay Zekayı Tanı</h3>
              <p className="text-blue-100 font-bold text-base" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Robot, chatbot, sesli asistan... Hepsini öğren!
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-3xl p-6 text-white text-center border-4 border-green-300 shadow-lg transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
              <div className="text-5xl mb-3">🏆</div>
              <h3 className="text-2xl text-white mb-2">Skor Topla</h3>
              <p className="text-green-100 font-bold text-base" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Her oyunda puanını artır ve en yüksek skoru hedefle!
              </p>
            </div>
          </div>
        </section>

        {/* FUN FACTS STRIP */}
        <section className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center text-orange-800 mb-6">
              🤩 Biliyor muydun?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { emoji: "🤖", fact: "İlk robot kelimesi 1920 yılında bir tiyatro oyununda kullanıldı!" },
                { emoji: "🎮", fact: "Yapay zeka satranç oyununda dünya şampiyonunu yenebilir!" },
                { emoji: "🎨", fact: "Yapay zeka saniyeler içinde resim çizebilir!" },
                { emoji: "🗣️", fact: "Sesli asistanlar 100'den fazla dili anlayabilir!" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur rounded-2xl p-4 flex items-center gap-4 border-2 border-white shadow-md hover:scale-[1.02] transition-transform"
                >
                  <span className="text-4xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-gray-700 font-bold text-base" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {item.fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[2rem] p-8 md:p-12 text-white border-4 border-purple-400 shadow-2xl relative overflow-hidden">
            <span className="absolute top-4 left-6 text-4xl opacity-30 animate-float">⭐</span>
            <span className="absolute bottom-6 right-8 text-5xl opacity-30 animate-float" style={{ animationDelay: "1s" }}>🌟</span>

            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl md:text-4xl text-white mb-3">
              Maceraya Hazır Mısın?
            </h2>
            <p className="text-purple-100 text-lg md:text-xl font-bold mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
              6 farklı oyun seni bekliyor! Hadi başlayalım!
            </p>
            <Link to="/oyunlar" className="btn-fun text-2xl">
              🎮 Oyunlara Git!
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
