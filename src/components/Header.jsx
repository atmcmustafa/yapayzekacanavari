import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, signOutUser } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Ana Sayfa", emoji: "🏠" },
    { to: "/oyunlar", label: "Oyunlar", emoji: "🎮" },
    { to: "/hakkinda", label: "Keşfet", emoji: "🔍" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl md:text-4xl group-hover:animate-wiggle inline-block">🤖</span>
          <span className="font-['Bubblegum_Sans'] text-xl md:text-2xl text-white drop-shadow-lg hidden sm:block">
            YZ Canavarı
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-base transition-all duration-200 ${
                isActive(link.to)
                  ? "bg-white text-purple-600 shadow-md scale-105"
                  : "text-white hover:bg-white/20"
              }`}
              style={{ fontFamily: "'Bubblegum Sans', cursive" }}
            >
              <span className="text-lg">{link.emoji}</span>
              {link.label}
            </Link>
          ))}

          <div className="w-px h-8 bg-white/30 mx-2" />

          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profil"
                className="px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 font-bold text-sm border-2 border-yellow-500 hover:bg-yellow-300 transition-all"
                style={{ fontFamily: "'Bubblegum Sans', cursive" }}
              >
                👤 Profil
              </Link>
              <button
                onClick={signOutUser}
                className="px-4 py-2 rounded-full bg-white/20 text-white font-bold text-sm border-2 border-white/30 hover:bg-white/30 transition-all"
                style={{ fontFamily: "'Bubblegum Sans', cursive" }}
              >
                Çıkış
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/giris"
                className="px-4 py-2 rounded-full bg-white/20 text-white font-bold text-sm border-2 border-white/30 hover:bg-white/30 transition-all"
                style={{ fontFamily: "'Bubblegum Sans', cursive" }}
              >
                Giriş
              </Link>
              <Link
                to="/kayit"
                className="px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 font-bold text-sm border-2 border-yellow-500 hover:bg-yellow-300 transition-all"
                style={{ fontFamily: "'Bubblegum Sans', cursive" }}
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-white p-1"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-indigo-600 border-t-2 border-white/20 pb-4 px-4 pt-2 space-y-2 animate-bounce-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-2xl font-bold text-lg transition-all ${
                isActive(link.to)
                  ? "bg-white text-purple-600"
                  : "text-white hover:bg-white/10"
              }`}
              style={{ fontFamily: "'Bubblegum Sans', cursive" }}
            >
              <span className="text-2xl">{link.emoji}</span>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/20 pt-3 space-y-2">
            {currentUser ? (
              <>
                <Link
                  to="/profil"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center p-3 rounded-2xl bg-yellow-400 text-yellow-900 font-bold text-lg"
                  style={{ fontFamily: "'Bubblegum Sans', cursive" }}
                >
                  👤 Profil
                </Link>
                <button
                  onClick={() => { signOutUser(); setMenuOpen(false); }}
                  className="w-full p-3 rounded-2xl bg-white/20 text-white font-bold text-lg"
                  style={{ fontFamily: "'Bubblegum Sans', cursive" }}
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/giris"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center p-3 rounded-2xl bg-white/20 text-white font-bold text-lg"
                  style={{ fontFamily: "'Bubblegum Sans', cursive" }}
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/kayit"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center p-3 rounded-2xl bg-yellow-400 text-yellow-900 font-bold text-lg"
                  style={{ fontFamily: "'Bubblegum Sans', cursive" }}
                >
                  🚀 Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
