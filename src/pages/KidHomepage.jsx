import HeaderIlkogretim from "../components/HeaderIlkogretim";
import softbg from "/soft-bg.svg";
import happyrobot from "/happy-robot.png";
import kaykayrobot from "/kaykay-robot.png";
import audioFile from "/audio.m4a";
import { useState, useRef, useEffect } from "react";
import NewGame from "../components/NewGame";
import { BiInfoCircle } from "react-icons/bi";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";

const KidHomepage = () => {
  const [showEnter, setShowEnter] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const audioRef = useRef(null);

  const handleAudioToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnd = () => {
      setShowGame(true);
    };
    audio.addEventListener("ended", handleAudioEnd);
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute w-full">
        <HeaderIlkogretim />
      </div>
      <div className="min-h-screen">
        <img className="h-screen w-full object-cover" src={softbg} />
      </div>
      {showEnter && (
        <>
          <div className="absolute left-48 top-1/2 -translate-y-1/2 h-24 lg:h-64">
            <img className="object-cover h-full" src={happyrobot} />
          </div>
          <div className="absolute right-48 top-1/2 -translate-y-1/2 h-24 lg:h-64">
            <img className="object-cover h-full" src={kaykayrobot} />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="p-4 rounded backdrop-blur-3xl bg-black/50 max-w-2xl">
              <h2 className="text-center mb-4">
                <span className="text-[#FFA500]">Yapay Zeka Canavarı </span>
                eğitim portalına hoşgeldin!
              </h2>
              <p className="text-lg text-white text-center">
                Bu eğitim portalında oyunlar oynayarak yapay zekanın
                hayatımızdaki önemini kavrayacaksın ve rakiplerinden bir adım
                öne geçeceksin. Daha ne bekliyorsun? <br />
              </p>

              <button
                onClick={() => setShowEnter(false)}
                className="bg-[#FFA500] text-white text-xl w-full h-12 rounded mt-4 flex justify-center items-center"
              >
                <span>Maceraya Atıl !</span>
              </button>
            </div>
          </div>
        </>
      )}

      {!showEnter && !showGame && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full px-8 lg:w-auto lg:px-0">
          <div className="bg-[#FFA500] max-w-2xl w-full rounded p-4 mb-4 mt-8 text-center text-white">
            <h3 className=" font-semibold flex items-center gap-2">
              <span className="text-lg">
                Robotlarımızın yapay zeka hakkında sohbetini dinlemek için
                'Dinlemeye Başla' tuşuna basman yeterli.
              </span>
            </h3>
          </div>
          <div className="p-6 border bg-blue-500 border-blue-400 max-w-2xl mb-4 rounded">
            <p className="text-white text-sm md:text-base">
              <span className="flex gap-2 items-center">
                <BiInfoCircle size={36} />
                Ses dosyası bittiğinde oyuna otomatik olarak yönlendirileceksin.
              </span>
            </p>
          </div>
          <button
            onClick={handleAudioToggle}
            className={`${
              isPlaying
                ? "bg-red-700 duration-300 "
                : "bg-green-700 duration-300"
            } rounded max-w-2xl w-full text-white mx-auto h-[50px] mb-8`}
          >
            <span className="flex gap-4 items-center justify-center">
              {isPlaying ? (
                <div className="flex items-center gap-4">
                  <CiPause1 size={24} /> Durdur
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <CiPlay1 size={24} /> Dinlemeye Başla
                </div>
              )}
            </span>
          </button>

          <div className="flex gap-24 mx-auto justify-center">
            <div className="h-32 lg:h-96">
              <img className="object-cover h-full" src={happyrobot} />
            </div>
            <div className="h-32 lg:h-96">
              <img className="object-cover h-full" src={kaykayrobot} />
            </div>
          </div>
        </div>
      )}

      {showGame && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <NewGame />
        </div>
      )}

      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default KidHomepage;
