import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const topics = [
  { emoji: "🤖", title: "Yapay Zeka Nedir?", text: "Bilgisayarların insanlar gibi düşünmesini sağlayan süper bir teknoloji!", bg: "from-purple-400 to-purple-500", border: "border-purple-300" },
  { emoji: "🗣️", title: "Sesli Asistanlar", text: "Siri, Alexa ve Google Asistan seninle konuşabilir!", bg: "from-blue-400 to-blue-500", border: "border-blue-300" },
  { emoji: "🚗", title: "Akıllı Arabalar", text: "Bazı arabalar yapay zeka sayesinde kendi kendine gidebilir!", bg: "from-green-400 to-green-500", border: "border-green-300" },
  { emoji: "🎨", title: "Resim Çizen YZ", text: "Yapay zeka saniyeler içinde harika resimler çizebilir!", bg: "from-pink-400 to-pink-500", border: "border-pink-300" },
  { emoji: "🏥", title: "Doktor Yardımcısı", text: "Doktorlar yapay zeka ile hastalıkları daha hızlı bulabilir!", bg: "from-cyan-400 to-cyan-500", border: "border-cyan-300" },
  { emoji: "🎮", title: "Oyunlardaki YZ", text: "Oyunlardaki rakipler yapay zeka ile sana meydan okur!", bg: "from-orange-400 to-orange-500", border: "border-orange-300" },
];

const About = () => {
  return (
    <Layout>
      <div className="page-transition page-bg">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <div className="text-7xl mb-4 animate-float inline-block">📖</div>
            <h1 className="text-4xl md:text-5xl text-purple-600 mb-2">Yapay Zeka Dünyası</h1>
            <p className="text-gray-500 text-xl font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Yapay zekanın harika dünyasını keşfet!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {topics.map((topic, i) => (
              <div key={i} className={`bg-gradient-to-br ${topic.bg} ${topic.border} rounded-3xl p-6 text-white text-center border-4 shadow-lg hover:-translate-y-2 hover:rotate-1 transition-all duration-300`}>
                <div className="text-5xl mb-3">{topic.emoji}</div>
                <h3 className="text-2xl text-white mb-2">{topic.title}</h3>
                <p className="text-white/90 font-bold text-base" style={{ fontFamily: "'Nunito', sans-serif" }}>{topic.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/oyunlar" className="btn-hero">🎮 Şimdi Oyunlarla Öğren!</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
