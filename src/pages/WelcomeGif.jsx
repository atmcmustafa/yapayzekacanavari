import { useState, useEffect } from "react";
import codingKid2 from "/coding-kid-2.gif";
import { Analytics } from "@vercel/analytics/react";
import balonGif from "/konusma-balon.gif";

const WelcomeGif = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 4000);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 8000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center text-white justify-center bg-welcomeRobot px-4 sm:px-0 relative">
      <div className="absolute left-12 sm:left-48 md:left-72 xl:left-80 2xl:left-[800px] top-8 z-40 h-64">
        <div className="w-48 absolute left-12 top-20 z-40 text-black">
          {showMessage && (
            <div>
              <h6 className="text-black font-bold text-lg text-nowrap">
                Yapay Zeka Macerası
              </h6>
              <span className="block text-4xl text-black">Başlıyor!</span>
            </div>
          )}
        </div>
        <img src={balonGif} alt="Balon GIF" className="h-full" />
      </div>
      {showButton && (
        <div className="animated-button">
          <a href="/home">
            <button className="w-64 h-20 bg-sky-600 rounded">
              Şimdi Başla
            </button>
          </a>
        </div>
      )}
      <Analytics />
    </div>
  );
};

export default WelcomeGif;
