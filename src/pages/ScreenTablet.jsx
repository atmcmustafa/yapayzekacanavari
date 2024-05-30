import { useState } from "react";
import HeaderIlkogretim from "../components/HeaderIlkogretim";
import Game from "../components/Game";
import GPTtest from "../components/GPTtest";
import { Analytics } from "@vercel/analytics/react";
import Layer from "../components/Layer";

const cardsData = [
  {
    id: 1,
    imgLink: "https://freesvg.org/storage/img/thumb/Blue-Robot.png",
    title: "Yapay Zeka Nedir?",
    bgColor: "bg-indigo-500",
    content: [
      "Merhaba çocuklar! Bugün sizlere çok özel ve eğlenceli bir konudan bahsedeceğim: Yapay Zeka!",
      "Yapay zeka (YZ), bilgisayarların ve robotların insanlar gibi düşünebilmesi, öğrenebilmesi ve problemleri çözebilmesi için yapılan çalışmalardır...",
      "YZ, bilgisayarların ve robotların insanlar gibi düşünüp, öğrenmelerini sağlayan bir bilim dalıdır. Mesela, telefonunuzdaki veya tabletinizdeki oyunları oynayan, sizinle konuşan ya da sorularınıza cevap veren akıllı yardımcılar gibi düşünebilirsiniz.",
      "YZ sadece akıllı telefonlarımızda değil, pek çok alanda kullanılır. Sağlıktan oyunlara, eğitimden sanata kadar hayatımızın birçok alanında YZ'den faydalanıyoruz. Örneğin, doktorlar hastalıkları teşhis etmek için YZ kullanabilirler.",
      "Eğer bir YZ robotuna 'En sevdiğin renk ne?' diye sorduğunuzu düşünün. YZ, öğrendiği bilgilere göre 'Mavi' diye cevap verebilir.",
      "Peki, bu bilgiyi nasıl öğreniyor? İşte burada 'öğrenme' devreye giriyor. YZ, insanların renkleri nasıl sevdiğini öğrenmek için birçok kitap okuyabilir ya da insanların hangi renkleri sevdiğini izleyebilir.",
      "YZ, insanların renkleri nasıl sevdiklerini öğrenmek için binlerce kitap okuyabilir veya internetteki bilgileri inceleyebilir. Böylece, çeşitli renkler hakkında bilgi sahibi olur ve sizin gibi kullanıcılara cevap verebilir.",
      "Sesli Asistanlar: Siri veya Alexa gibi sesli asistanlar, söylediklerinizi anlayarak size yardımcı olabilirler. Örneğin, hava durumunu sorabilirsiniz.",
      "Oyunlar: Bilgisayar oyunlarında karşınıza çıkan rakipler YZ ile çalışır. Bu yüzden çok akıllı oynayabilirler.",
      "Öneri Sistemleri: YouTube veya Netflix’te izlediğiniz videolara göre size yeni videolar öneren sistemler YZ kullanır.",
      "Resim Tanıma Oyunu: Bir bilgisayar programı ile farklı resimleri tanımasını sağlayabilirsiniz. Örneğin, bilgisayara kedi ve köpek resimlerini göstererek bunları tanımasını öğretebilirsiniz.",
      "Chatbot Yapma: Bir chatbot, sizinle konuşabilen bir bilgisayar programıdır. Örneğin, “Merhaba!” dediğinizde size “Merhaba, nasılsın?” diyebilir.",
      "Gelecekte YZ, hayatımızı daha da kolaylaştıracak. Belki de ileride robotlar ev işlerinde bize yardım edecek, doktorlar hastaları tedavi ederken YZ'den yararlanacak ve hatta okullarda bize ders anlatan YZ öğretmenlerimiz olacak.",
      "YZ, hem eğlenceli hem de öğretici bir konu. Bilgisayarların nasıl öğrendiğini ve zekiymiş gibi nasıl davrandığını öğrenmek çok heyecan verici. Sizler de YZ dünyasında birer kaşif olabilir ve bu teknolojinin gelişmesine katkıda bulunabilirsiniz.",
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
      "Merhaba çocuklar! Bugün sizlere çok özel ve eğlenceli bir konudan bahsedeceğim: Prompt Mühendisliği!",
      "Prompt mühendisliği, bilgisayarlara veya yapay zekalara ne yapmalarını istediğimizi söylemek için kullandığımız talimatlar yazma sanatıdır.",
      "Bu terim belki biraz karmaşık gelebilir, ama aslında oldukça basit ve eğlenceli bir konu. Tıpkı bir sihirli değnek gibi, doğru kelimeleri kullanarak bilgisayarın istediğimiz şekilde çalışmasını sağlayabiliriz.",
      "Prompt mühendisliğini daha iyi anlamak için bazı basit şeyleri bilmemiz gerekiyor:",
      "Prompt: Bu, bilgisayara veya yapay zekaya ne yapmasını istediğimizi anlatan cümledir. Örneğin, 'Bana bir kedi resmi göster' gibi.",
      "Doğru Kelimeleri Kullanma: Bilgisayara tam olarak ne yapmasını istediğimizi doğru kelimelerle anlatmalıyız. Ne kadar açık ve net olursak, bilgisayar da o kadar iyi anlar.",
      "Prompt mühendisliği birçok yerde kullanılır. İşte bazı örnekler:",
      "Sesli Asistanlar: Siri veya Alexa gibi sesli asistanlara doğru sorular sorarak istediğimiz bilgiyi alabiliriz.",
      "Chatbotlar: İnternette sizinle konuşan botlara sorular sorarak bilgi alabilirsiniz.",
      "Oyunlar: Bazı oyunlarda bilgisayara ne yapmasını istediğinizi söyleyerek oyunu yönlendirebilirsiniz.",
      "Sesli asistanlar, konuşarak onlarla iletişim kurabileceğiniz yardımcı programlardır. İşte bazı örnekler:",
      "Siri: Apple cihazlarında bulunan sesli asistandır. Siri'ye 'Hava durumu nasıl?' diye sorabilirsiniz.",
      "Alexa: Amazon'un sesli asistanıdır. Alexa'ya 'Müzik çalar mısın?' diyebilirsiniz.",
      "Google Asistan: Google'ın sesli asistanıdır. Google Asistan'a 'Bana bir fıkra anlat' diyebilirsiniz.",
      "Bilgisayar oyunlarında prompt mühendisliği kullanarak eğlenceli şeyler yapabilirsiniz. İşte bazı örnekler:",
      "Minecraft: Minecraft'ta komutlar yazarak dünyanızı değiştirebilirsiniz. Örneğin, 'time set day' yazarak günü başlatabilirsiniz.",
      "Roblox: Roblox'ta komutlar kullanarak oyunu yönetebilirsiniz. Örneğin, '/e dance' yazarak karakterinizi dans ettirebilirsiniz.",
      "Chatbotlar, sizinle konuşabilen bilgisayar programlarıdır. Doğru soruları sorarak onlardan bilgi alabilirsiniz. Örneğin, 'Bugün hava nasıl?' diye sorarak hava durumu bilgisini alabilirsiniz.",
      "Hadi, prompt mühendisliği ile eğlenceli birkaç şey yapalım:",
      "Resim İsteme: Bir yapay zekadan 'Bana bir unicorn resmi göster' gibi bir prompt yazarak resim isteyin.",
      "Bilgi Alma: 'Mars hakkında bana bilgi ver' gibi bir prompt yazarak yapay zekadan bilgi alın.",
      "Resim isteme oyunu ile yapay zekadan istediğiniz resimleri alabilirsiniz. İşte nasıl yapabileceğiniz:",
      "Prompt Yazma: 'Bana bir kedi resmi göster' gibi bir cümle yazın.",
      "Resmi Görme: Yapay zeka bu cümleyi anlayacak ve size bir kedi resmi gösterecektir.",
      "Deneme: Farklı resimler isteyerek yapay zekanın neler yapabileceğini görün.",
      "Bilgi alma oyunu ile yapay zekadan ilginç bilgiler alabilirsiniz. İşte nasıl yapabileceğiniz:",
      "Prompt Yazma: 'Dünyanın en yüksek dağı nedir?' gibi bir cümle yazın.",
      "Bilgiyi Görme: Yapay zeka bu cümleyi anlayacak ve size doğru cevabı verecektir.",
      "Deneme: Farklı sorular sorarak yapay zekanın ne kadar bilgi sahibi olduğunu keşfedin.",
      "Prompt mühendisliğini daha iyi anlamak için aşağıdaki etkinlikleri yapabilirsiniz:",
      "Prompt Hikayeleri Yazma: Yapay zekaya vereceğiniz komutlarla küçük hikayeler yazabilirsiniz. Örneğin, 'Bir prenses ve ejderha hakkında hikaye anlat' gibi.",
      "Prompt Listeleri Oluşturma: Farklı komutları listeleyip hangi komutların en iyi sonuç verdiğini görebilirsiniz.",
      "Promptlarla hikayeler yazarak yaratıcılığınızı kullanabilirsiniz. İşte nasıl yapabileceğiniz:",
      "Hikaye Konusu: 'Bir uzay macerası' gibi bir konu seçin.",
      "Prompt Yazma: 'Bir uzay gemisi ve astronotlar hakkında hikaye anlat' gibi bir cümle yazın.",
      "Hikayeyi Görme: Yapay zeka, bu prompta göre size bir hikaye anlatacaktır.",
      "Gelecekte prompt mühendisliği ile daha birçok şey yapabileceğiz. Örneğin:",
      "Akıllı Evler: Evinizdeki cihazlara 'Işıkları aç' gibi komutlar vererek evinizi yönetebilirsiniz.",
      "Eğitim: Okullarda ders anlatan yapay zeka öğretmenler olabilir ve onlara sorular sorarak ders çalışabilirsiniz.",
      "Prompt mühendisliği, hem eğlenceli hem de öğretici bir konu. Bilgisayarların ve yapay zekaların nasıl çalıştığını ve onlara nasıl komut verebileceğinizi öğrenmek çok heyecan verici. Sizler de bu dünyada birer kaşif olabilir ve teknolojiyi daha iyi kullanabilirsiniz.",
      "Hadi, şimdi prompt mühendisliğini keşfetmeye başlayın ve bu büyülü dünyada yeni şeyler öğrenmenin keyfini çıkarın!",
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
    <div className="relative min-dvh-screen bg-skyWallpaper px-4 sm:px-0">
      <Layer />
      <HeaderIlkogretim />
      <div className="text-white flex flex-col lg:flex-row gap-8 items-center">
        <div className="h-[200px] w-[200px] lg:h-[600px] xl:h-[750px] 2xl:h-[700px] lg:w-2/3 overflow-x-hidden prompt-gif -mt-24 md:-mt-12" />
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full relative">
          <div
            className={`${
              startGame
                ? "w-full relative"
                : "w-full sm:w-[600px] md:w-[700px] xl:w-[1000px]  md:h-[450px] relative flex items-center justify-center md:my-0 "
            }`}
          >
            {!startGame && (
              <button
                disabled={activeTextIndex === 0}
                onClick={handlePrevText}
                className=" my-auto w-12 md:w-16 lg:w-20 xl:w-24 shadow-none  select-none lg:mb-32"
              >
                <img
                  src="https://freesvg.org/storage/img/thumb/arrow-left.png"
                  alt="Previous"
                />
              </button>
            )}
            {!startGame && (
              <>
                <div className="h-96 md:h-[450px] lg:mt-32  border-2 border-blue-900 rounded-2xl w-full sm:w-[600px] md:w-[700px] xl:w-[1000px]"></div>

                <div className="absolute left-1/2 lg:mt-16 -translate-x-1/2 top-0   py-6 md:py-12 h-full w-2/3">
                  <h5 className="text-center w-full mb-3  select-none text-[#F39200]">
                    {activeCard.title}
                  </h5>
                  <p className="!text-black font-semibold  select-none tracking-wider text-xl  xl:text-2xl md:!leading-10 xl:!leading-[50px]">
                    {activeContent[activeTextIndex]}
                  </p>
                  <div className="w-full flex flex-col items-center mt-8 justify-center gap-4">
                    {isLastText && (
                      <button
                        className="bg-blue-600 rounded-xl w-full mx-auto h-[50px] "
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
                        className="h-[50px] rounded-xl w-full border mx-auto text-black"
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
            {!startGame && (
              <button
                disabled={isLastText}
                onClick={handleNextText}
                className=" my-auto w-12 md:w-16 lg:w-20 xl:w-24 shadow-none  select-none lg:mb-32  "
              >
                <img
                  src="https://freesvg.org/storage/img/thumb/arrow-right.png"
                  alt="Next"
                />
              </button>
            )}
          </div>
          {startGame && (
            <div className="">
              {/* z-50 w-full h-full flex flex-col items-center justify-center mr-12 xl:mr-24 2xl:mr-48  */}
              {activeCardId === 1 ? <Game /> : <GPTtest />}
              <button
                onClick={() => handleCardChange(activeCardId === 1 ? 2 : 1)}
                className="h-[50px] rounded-xl w-full border mx-auto text-black mt-4"
              >
                {activeCardId === 1 ? "Diğer Konuya Geç" : "Önceki Konuya Dön"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default ScreenTablet;
