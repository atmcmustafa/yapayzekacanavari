import React, { useState } from "react";
import HeaderIlkogretim from "../components/HeaderIlkogretim";
import Game from "../components/Game";
import GPTtest from "../components/GPTtest";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import Layer from "../components/Layer";

const cardsData = [
  {
    id: 1,
    imgLink: "https://freesvg.org/storage/img/thumb/Blue-Robot.png",
    title: "Yapay Zeka Nedir?",
    bgColor: "bg-indigo-500",
    content: [
      "Merhaba çocuklar! Bugün size çok özel bir konudan bahsedeceğim: Yapay Zeka!",
      "Yapay zeka (Y.Z.), bilgisayarların veya robotların insanlar gibi düşünebilmesi, öğrenebilmesi ve problemleri çözebilmesi için yapılan çalışmalardır...",
      "Yapay zeka, bilgisayarların ve robotların insanlar gibi düşünüp, öğrenmelerini sağlayan bir bilim dalıdır. Mesela, telefonunuzdaki veya tabletinizdeki oyunları oynayan, sizinle konuşan ya da sorularınıza cevap veren akıllı yardımcılar gibi düşünebilirsiniz.",
      "Yapay zeka sadece akıllı telefonlarımızda değil, pek çok alanda kullanılır. Sağlıktan oyunlara, eğitimden sanata kadar hayatımızın birçok alanında yapay zekadan faydalanıyoruz. Örneğin, doktorlar hastalıkları teşhis etmek için yapay zeka kullanabilirler.",
      "Eğer bir yapay zeka robotuna 'En sevdiğin renk ne?' diye sorduğunuzu düşünün. Yapay zeka, öğrendiği bilgilere göre 'Mavi' diye cevap verebilir.",
      "Peki, bu bilgiyi nasıl öğreniyor? İşte burada 'öğrenme' devreye giriyor. Yapay zeka, insanların renkleri nasıl sevdiğini öğrenmek için birçok kitap okuyabilir ya da insanların hangi renkleri sevdiğini izleyebilir.",
      "Yapay zeka, insanların renkleri nasıl sevdiklerini öğrenmek için binlerce kitap okuyabilir veya internetteki bilgileri inceleyebilir. Böylece, çeşitli renkler hakkında bilgi sahibi olur ve sizin gibi kullanıcılara cevap verebilir.",
      "Haydi şimdi oyun oynayalım! Pekiştirelim.",
    ],
  },
  {
    id: 2,
    imgLink:
      "https://freesvg.org/storage/img/thumb/happy_robot_remix_monsterbraingames.png",
    title: "Prompt Mühendisliği",
    bgColor: "bg-sky-800",
    content: [
      "Prompt mühendisliği, yapay zekanın en iyi şekilde öğrenebilmesi ve doğru bilgileri elde edebilmesi için ona doğru soruları sormamızı ve açık talimatlar vermemizi gerektiren bir süreçtir.",
      "Bu, bir anlamda yapay zekaya öğretmenlik yapmak gibidir. Doğru sorular ve talimatlar, yapay zekanın doğru bilgilerle çalışmasını sağlar ve daha iyi sonuçlar elde etmesine olanak tanır.",
      "Diyelim ki yapay zekaya bir köpek resmi çizdirmek istiyorsunuz. Eğer yapay zekaya sadece 'Bir köpek çiz 'derseniz, çok basit bir resim elde edebilirsiniz.",
      "Ancak 'Yeşil bir çayırda, güneşli bir günde mutlu bir şekilde koşan bir köpek çiz' diyerek daha fazla detay verirseniz, yapay zeka istediğiniz sahneyi daha iyi hayal edebilir ve çok daha güzel ve ayrıntılı bir resim çizebilir.",
      "Bu teknolojilerle ilgili öğreneceğiniz çok şey var ve yapay zeka dünyası sürekli olarak yeni ve heyecan verici gelişmelere sahne oluyor.",
      "Gelecekte, bu teknolojileri kullanarak kendi projelerinizi yaratabilir, kendi oyunlarınızı geliştirebilir veya belki de kendi yapay zeka robotunuzu programlayabilirsiniz!",
      "Bu, sadece başlangıç; yapay zeka ve prompt mühendisliği ile neler yapılabileceğini keşfetmek için büyük bir potansiyel var!",
      "Haydi şimdi oyun oynayalım! Pekiştirelim.",
    ],
  },
];

const ScreenTablet = () => {
  const [activeCardId, setActiveCardId] = useState(cardsData[0].id);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [startGame, setStartGame] = useState(false);

  const activeCard = cardsData.find((card) => card.id === activeCardId);
  const activeContent = activeCard.content;
  const isLastText = activeTextIndex === activeContent.length - 1;

  const handleNextText = () => {
    if (!isLastText) {
      setActiveTextIndex(activeTextIndex + 1);
    }
  };

  const handlePrevText = () => {
    if (activeTextIndex > 0) {
      setActiveTextIndex(activeTextIndex - 1);
    }
  };

  const handleCardChange = (newCardId) => {
    setActiveCardId(newCardId);
    setActiveTextIndex(0);
    setStartGame(false);
  };
  console.log(activeCardId);
  return (
    <div className="relative h-screen bg-skyWallpaper px-4 sm:px-0">
      <Layer />
      <HeaderIlkogretim />
      <div className="text-white flex flex-col lg:flex-row gap-8 items-center">
        <div className="h-[200px] w-[200px] lg:h-[839px] lg:w-[839px] overflow-x-hidden prompt-gif" />
        <div className="flex gap-4 items-center justify-center w-full h-full relative">
          {!startGame && (
            <button
              disabled={activeTextIndex === 0}
              onClick={handlePrevText}
              className="h-fit my-auto w-12 shadow-none disabled:hidden select-none"
            >
              <img
                src="https://freesvg.org/storage/img/thumb/arrow-left.png"
                alt="Previous"
              />
            </button>
          )}
          <div
            className={`${
              startGame
                ? "w-full relative"
                : "w-[800px]  md:h-[450px] relative flex items-center justify-center md:my-0"
            }`}
          >
            {!startGame && (
              <>
                <div className="h-96 w-full border-2 border-blue-900 rounded-2xl"></div>
                <div className="absolute left-0 top-0 w-full px-10  py-6 md:py-12 h-full">
                  <h2 className="text-center w-full mb-3  select-none text-[#F39200]">
                    {activeCard.title}
                  </h2>
                  <p className="!text-black font-semibold text-base select-none xl:text-lg">
                    {activeContent[activeTextIndex]}
                  </p>
                  <div className="w-full flex justify-center gap-4">
                    {isLastText && (
                      <button
                        className="bg-blue-600 rounded-xl w-[200px] sm:w-[300px] mx-auto h-[50px]"
                        onClick={() => setStartGame(true)}
                      >
                        Haydi Oyun Oynayalım!
                      </button>
                    )}

                    {isLastText && (
                      <button
                        onClick={() =>
                          handleCardChange(activeCardId === 1 ? 2 : 1)
                        }
                        className="h-[50px] rounded-xl w-[200px] sm:w-[300px] border mx-auto text-black"
                      >
                        {activeCardId === 1
                          ? "Diğer Konuya Geç"
                          : "Önceki Konuya Dön"}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {startGame && (
            <div className="z-50 w-full h-full flex flex-col justify-center mr-12 xl:mr-24 2xl:mr-48">
              {activeCardId === 1 ? <Game /> : <GPTtest />}
              <button
                onClick={() => handleCardChange(activeCardId === 1 ? 2 : 1)}
                className="h-[50px] rounded-xl w-[200px] sm:w-[300px] border mx-auto text-black mt-4"
              >
                {activeCardId === 1 ? "Diğer Konuya Geç" : "Önceki Konuya Dön"}
              </button>
            </div>
          )}
          {!startGame && (
            <button
              disabled={isLastText}
              onClick={handleNextText}
              className="h-fit my-auto w-12 shadow-none disabled:hidden select-none"
            >
              <img
                src="https://freesvg.org/storage/img/thumb/arrow-right.png"
                alt="Next"
              />
            </button>
          )}
        </div>
      </div>
      <Footer />
      <Analytics />
    </div>
  );
};

export default ScreenTablet;
