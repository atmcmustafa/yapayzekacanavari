import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Layout from "../layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/oyunlar");
    } catch {
      setError("Giriş başarısız. E-posta veya şifre hatalı olabilir.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
      navigate("/oyunlar");
    } catch {
      setError("Google ile giriş başarısız.");
    }
  };

  return (
    <Layout>
      <div className="page-transition page-bg max-w-md mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[2rem] p-8 text-white border-4 border-purple-400 shadow-xl">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">👋</div>
            <h1 className="text-3xl text-white">Hoş Geldin!</h1>
            <p className="text-purple-200 text-base font-bold mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Hesabına giriş yap
            </p>
          </div>

          {error && (
            <div className="bg-red-400/30 border-2 border-red-300 p-3 rounded-2xl text-sm font-bold mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-purple-200 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>E-posta</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none font-bold transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }} placeholder="ornek@mail.com" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-purple-200 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Şifre</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none font-bold transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }} placeholder="Şifreni gir" required />
            </div>
            <button type="submit" disabled={loading} className="btn-fun w-full !rounded-2xl text-xl">
              {loading ? "Giriş yapılıyor..." : "🚀 Giriş Yap"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-white/20" /></div>
            <div className="relative flex justify-center">
              <span className="bg-indigo-600 px-3 text-sm text-purple-200 font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>veya</span>
            </div>
          </div>

          <button onClick={handleGoogle} className="btn-outline-kid w-full !rounded-2xl text-lg">
            Google ile Giriş
          </button>

          <p className="text-center text-sm text-purple-200 font-bold mt-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Hesabın yok mu?{" "}
            <Link to="/kayit" className="text-yellow-300 underline hover:text-yellow-200">Kayıt Ol!</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
