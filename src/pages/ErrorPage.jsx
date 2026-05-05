import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const ErrorPage = () => {
  return (
    <Layout>
      <div className="page-transition flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="text-8xl mb-6 animate-float">🤖</div>
        <h1 className="text-4xl font-fun text-primary-400 mb-3">
          Sayfa Bulunamadı!
        </h1>
        <p className="text-gray-500 font-body text-lg mb-8 max-w-md">
          Aradığın sayfa kaybolmuş gibi görünüyor. Robot arkadaşımız bile bulamadı!
        </p>
        <div className="flex gap-4">
          <Link to="/" className="btn-primary">
            Ana Sayfa
          </Link>
          <Link to="/oyunlar" className="btn-outline">
            Oyunlar
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
