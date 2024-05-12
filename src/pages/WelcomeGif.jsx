import codingKid2 from "/coding-kid-2.gif";
import { Analytics } from "@vercel/analytics/react";

const WelcomeGif = () => {
  return (
    <div className="min-h-screen flex items-center text-white justify-center bg-welcomeRobot px-4 sm:px-0">
      <div className="border p-7 rounded-xl max-w-3xl filter backdrop-blur-3xl flex flex-col gap-3 relative">
        <div className="absolute rounded-full right-12 sm:right-0  h-48 w-48 -bottom-44 sm:-bottom-32 ">
          <img src={codingKid2} className="rounded-full " />
        </div>
        <h2>Yapay Zeka Macerasına Hoş Geldiniz!</h2>
        Merhaba ve hoş geldiniz! Yapay Zeka'nın gizemli dünyasına adım atmak
        için doğru yerdesiniz. Burada, bilim kurgu filmlerinden fırlamış gibi
        görünen, ancak gerçek dünyada hayatımızı şekillendiren teknolojiler
        hakkında her şeyi öğreneceksiniz. Siz de bu büyülü dünyaya katılmak ve
        geleceği keşfetmek için hazır mısınız? Öyleyse gelin, yapay zeka
        maceramıza başlayalım!
        <a href="/home">
          <button className="w-32 h-10 bg-sky-600 rounded">Şimdi Başla</button>
        </a>
      </div>
      <Analytics />
    </div>
  );
};

export default WelcomeGif;
