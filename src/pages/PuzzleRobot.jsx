import PuzzleApp from "../components/PuzzleApp";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { SiFuturelearn } from "react-icons/si";
import { IoTimerOutline } from "react-icons/io5";
import GameMap from "../components/GameMap";
import Layout from "../layout/Layout";
const PuzzleRobot = () => {
  const [startedGame, setStartedGame] = useState(false);

  const sections = [
    {
      icon: TiTick,
      text: "Kombo Yap",
      bgColor: "bg-sky-600",
    },
    {
      icon: IoTimerOutline,
      text: "Karşı Koy",
      bgColor: "bg-green-600",
    },
    {
      icon: SiFuturelearn,
      text: "Öğren",
      bgColor: "bg-yellow-500",
    },
  ];

  const description = [
    "1. Oyunun amacı 9 adet puzzle parçasını birleştirerek robotu ortaya çıkarmaktır.",
    "2. 15 Adet soru ile karşı karşıya kalacaksın. Eğer 9 adet doğru cevap verebilirsen robot ortaya çıkacak.",
    "3. İstediğin kadar deneme hakkına sahipsin.",
    "4. Daha fazla ne bekliyorsun? Oyunu Başlat butonuna tıkla ve macerayı başlat!",
  ];

  const handleButtonClick = () => {
    setStartedGame((prev) => !prev);
  };

  return (
    <Layout className="container mx-auto">
      <div className="">
        {startedGame ? (
          <div className="flex flex-col items-center justify-center  lg:mt-24">
            <PuzzleApp />
          </div>
        ) : (
          <>
            <GameMap
              sections={sections}
              title="Yol Haritası"
              description={description}
              buttonText="Oyunu Başlat"
              onButtonClick={handleButtonClick}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default PuzzleRobot;
