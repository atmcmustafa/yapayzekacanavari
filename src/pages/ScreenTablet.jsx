import HeaderIlkogretim from "../components/HeaderIlkogretim";
import tv from "/tv2.png";
import tablet from "/tablet.png";
import phone from "/phone.png";
import { useState } from "react";
import Game from "../components/Game";
import GPTtest from "../components/GPTtest";
import { Analytics } from "@vercel/analytics/react";

const cardsData = [
  {
    id: 1,
    imgLink: "https://freesvg.org/storage/img/thumb/Blue-Robot.png",
    title: "Yapay Zeka Nedir?",
    link: "",
    bgColor: "bg-indigo-500",

    content: [
      {
        text1:
          "Merhaba çocuklar! Bugün size çok özel bir konudan bahsedeceğim: Yapay Zeka!",
        text2:
          "Yapay zeka (Y.Z.), bilgisayarların veya robotların insanlar gibi düşünebilmesi, öğrenebilmesi ve problemleri çözebilmesi için yapılan çalışmalardır... ",
        text3:
          " Yapay zeka, bilgisayarların ve robotların insanlar gibi düşünüp, öğrenmelerini sağlayan bir bilim dalıdır. Mesela, telefonunuzdaki veya tabletinizdeki oyunları oynayan, sizinle konuşan ya da sorularınıza cevap veren akıllı yardımcılar gibi düşünebilirsiniz.",
        text4:
          " Yapay zeka sadece akıllı telefonlarımızda değil, pek çok alanda kullanılır. Sağlıktan oyunlara, eğitimden sanata kadar hayatımızın birçok alanında yapay zekadan faydalanıyoruz. Örneğin, doktorlar hastalıkları teşhis etmek için yapay zeka kullanabilirler. ",
        text5:
          "Eğer bir yapay zeka robotuna 'En sevdiğin renk ne?' diye sorduğunuzu düşünün. Yapay zeka, öğrendiği bilgilere göre 'Mavi' diye cevap verebilir. ",
        text6:
          "Peki, bu bilgiyi nasıl öğreniyor? İşte burada 'öğrenme' devreye giriyor. Yapay zeka, insanların renkleri nasıl sevdiğini öğrenmek için birçok kitap okuyabilir ya da insanların hangi renkleri sevdiğini izleyebilir. ",
        text7:
          "Yapay zeka, insanların renkleri nasıl sevdiklerini öğrenmek için binlerce kitap okuyabilir veya internetteki bilgileri inceleyebilir. Böylece, çeşitli renkler hakkında bilgi sahibi olur ve sizin gibi kullanıcılara cevap verebilir. ",
        text8: "Haydi şimdi oyun oynayalım! Pekiştirelim.  ",
      },
    ],
  },
  {
    id: 2,
    imgLink:
      "	https://freesvg.org/storage/img/thumb/happy_robot_remix_monsterbraingames.png",
    title: "Prompt Mühendisliği",
    link: "",
    bgColor: "bg-sky-800",

    content: [
      {
        text1:
          "Prompt mühendisliği, yapay zekanın en iyi şekilde öğrenebilmesi ve doğru bilgileri elde edebilmesi için ona doğru soruları sormamızı ve açık talimatlar vermemizi gerektiren bir süreçtir. ",
        text2:
          " Bu, bir anlamda yapay zekaya öğretmenlik yapmak gibidir. Doğru sorular ve talimatlar, yapay zekanın doğru bilgilerle çalışmasını sağlar ve daha iyi sonuçlar elde etmesine olanak tanır.",
        text3:
          "Diyelim ki yapay zekaya bir köpek resmi çizdirmek istiyorsunuz. Eğer yapay zekaya sadece 'Bir köpek çiz 'derseniz, çok basit bir resim elde edebilirsiniz. ",
        text4:
          " Ancak 'Yeşil bir çayırda, güneşli bir günde mutlu bir şekilde koşan bir köpek çiz' diyerek daha fazla detay verirseniz, yapay zeka istediğiniz sahneyi daha iyi hayal edebilir ve çok daha güzel ve ayrıntılı bir resim çizebilir.",
        text5:
          "Bu teknolojilerle ilgili öğreneceğiniz çok şey var ve yapay zeka dünyası sürekli olarak yeni ve heyecan verici gelişmelere sahne oluyor.   ",
        text6:
          "Gelecekte, bu teknolojileri kullanarak kendi projelerinizi yaratabilir, kendi oyunlarınızı geliştirebilir veya belki de kendi yapay zeka robotunuzu programlayabilirsiniz!    ",
        text7:
          "Bu, sadece başlangıç; yapay zeka ve prompt mühendisliği ile neler yapılabileceğini keşfetmek için büyük bir potansiyel var!   ",
        text8: "Haydi şimdi oyun oynayalım! Pekiştirelim.  ",
      },
    ],
  },
];
const ScreenTablet = () => {
  const [activeCardId, setActiveCardId] = useState(cardsData[0].id);
  const [activeTextIndex, setActiveTextIndex] = useState(1);
  const activeCard = cardsData.find((card) => card.id === activeCardId);
  const activeContent = activeCard.content;
  const contentKeys = Object.keys(activeContent[0]);
  const lastTextKey = contentKeys[contentKeys.length - 1];
  const [isCompleted, setIsCompleted] = useState(false);

  const [startGame, setStartGame] = useState(false);

  const handleNextText = () => {
    const nextIndex = activeTextIndex + 1;
    if (nextIndex > Object.keys(activeContent[0]).length) {
      setIsCompleted(true);
    } else {
      setActiveTextIndex(nextIndex);
    }
  };

  const handlePrevText = () => {
    if (activeTextIndex > 1) {
      setActiveTextIndex((prevIndex) => prevIndex - 1);
      setIsCompleted(false);
    }
  };

  console.log(startGame);
  return (
    <div className="relative  h-screen bg-skyWallpaper  px-4 sm:px-0">
      <HeaderIlkogretim />

      <div className="text-white flex flex-col  lg:flex-row gap-8 items-center ">
        <div className="h-[200px] w-[200px] lg:h-[839px]  lg:w-[839px] overflow-x-hidden prompt-gif  " />
        <div className="flex gap-4 items-center   justify-center w-full h-full relative">
          <div
            className={`${
              startGame
                ? "w-full relative "
                : "w-[800px] h-[600px] md:h-[450px] relative flex items-center justify-center  md:my-0"
            } `}
          >
            {!startGame && (
              <>
                <img className="hidden xl:block h-full w-full " src={tv} />
                <img
                  className="hidden sm:block xl:hidden h-full w-full  "
                  src={tablet}
                />
                <img
                  className="block sm:hidden xl:hidden h-full w-full object-fill "
                  src={phone}
                />
              </>
            )}

            <div
              className={`${
                startGame
                  ? "top-20 lg:-top-64 absolute left-0  w-full px-10 py-20 md:px-16 md:py-8 h-full"
                  : "absolute left-0 top-0 w-full px-10 py-20 md:px-32 md:py-8 h-full"
              } `}
            >
              {!startGame && (
                <button
                  disabled={activeTextIndex === 1}
                  onClick={handlePrevText}
                  className="h-fit my-auto w-12 absolute left-8 sm:left-16 top-[450px] sm:top-1/2 sm:-translate-y-1/2     shadow-none disabled:hidden"
                >
                  <img src="https://freesvg.org/storage/img/thumb/arrow-left.png" />
                </button>
              )}
              {!startGame && (
                <>
                  <h2 className="text-center w-full mb-3">
                    {activeCard.title}
                  </h2>
                  <p className="text-white ">
                    {activeContent[0][`text${activeTextIndex}`]}
                  </p>
                </>
              )}
              {!startGame && (
                <button
                  disabled={
                    activeTextIndex > Object.keys(activeContent[0]).length ||
                    isCompleted
                  }
                  onClick={handleNextText}
                  className="h-fit my-auto w-12 absolute right-8 sm:right-16 top-[450px] sm:top-1/2 sm:-translate-y-1/2     shadow-none disabled:hidden"
                >
                  <img src="https://freesvg.org/storage/img/thumb/arrow-right.png" />
                </button>
              )}
              <div className="w-full flex justify-center gap-4 ">
                {isCompleted && activeCardId === 1 ? (
                  <div className="flex flex-col mt-4 gap-4 ">
                    {!startGame && (
                      <button
                        className="bg-blue-600 rounded-xl w-[200px] sm:w-[300px] mx-auto h-[50px]"
                        onClick={() => setStartGame(true)}
                      >
                        Haydi Oyun Oynayalım!
                      </button>
                    )}
                    {startGame && (
                      <div className="-mt-24">
                        <Game />
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setActiveCardId(2);
                        setActiveTextIndex(1);
                        setIsCompleted(false);
                        setStartGame(false);
                      }}
                      className=" h-[50px]  rounded-xl w-[200px] sm:w-[300px] border mx-auto "
                    >
                      Diğer Konuya Geç
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="w-full flex  justify-center gap-4 ">
                {isCompleted && activeCardId === 2 ? (
                  <div className="flex flex-col mt-4 gap-4 w-full">
                    {!startGame && (
                      <button
                        className="bg-blue-600 rounded-xl  w-[200px] sm:w-[300px] mx-auto h-[50px]"
                        onClick={() => setStartGame(true)}
                      >
                        Haydi Oyun Oynayalım!
                      </button>
                    )}
                    {startGame && <GPTtest />}
                    <button
                      onClick={() => {
                        setActiveCardId(1);
                        setActiveTextIndex(1);
                        setIsCompleted(false);
                        setStartGame(false);
                      }}
                      className=" h-[50px]  rounded-xl w-[200px] sm:w-[300px] border mx-auto"
                    >
                      Önceki Konuya Dön
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default ScreenTablet;
