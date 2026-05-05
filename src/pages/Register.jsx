import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Layout from "../layout/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Şifre en az 6 karakter olmalıdır."); return; }
    setLoading(true);
    try {
      await signUp(email, password, name);
      navigate("/oyunlar");
    } catch {
      setError("Kayıt başarısız. Bu e-posta zaten kullanılıyor olabilir.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
      navigate("/oyunlar");
    } catch {
      setError("Google ile kayıt başarısız.");
    }
  };

  return (
    <Layout>
      <div className="page-transition page-bg max-w-md mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-[2rem] p-8 text-white border-4 border-green-300 shadow-xl">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">🚀</div>
            <h1 className="text-3xl text-white">Aramıza Katıl!</h1>
            <p className="text-green-100 text-base font-bold mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Yeni bir hesap oluştur
            </p>
          </div>

          {error && (
            <div className="bg-red-400/30 border-2 border-red-300 p-3 rounded-2xl text-sm font-bold mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-green-100 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>İsim</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none font-bold transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }} placeholder="Adını gir" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-green-100 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>E-posta</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none font-bold transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }} placeholder="ornek@mail.com" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-green-100 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Şifre</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none font-bold transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }} placeholder="En az 6 karakter" required minLength={6} />
            </div>
            <button type="submit" disabled={loading} className="btn-fun w-full !rounded-2xl text-xl">
              {loading ? "Kayıt yapılıyor..." : "🎉 Kayıt Ol"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-white/20" /></div>
            <div className="relative flex justify-center">
              <span className="bg-teal-500 px-3 text-sm text-green-100 font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>veya</span>
            </div>
          </div>

          <button onClick={handleGoogle} className="btn-outline-kid w-full !rounded-2xl text-lg">
            Google ile Kayıt Ol
          </button>

          <p className="text-center text-sm text-green-100 font-bold mt-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Zaten hesabın var mı?{" "}
            <Link to="/giris" className="text-yellow-300 underline hover:text-yellow-200">Giriş Yap!</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
