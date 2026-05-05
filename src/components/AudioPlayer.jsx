import { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const AudioPlayer = ({ onAudioEnd, src, goToMain }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(src));

  useEffect(() => {
    audioRef.current.addEventListener("ended", handleAudioEnd);

    return () => {
      audioRef.current.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  const handleAudioEnd = () => {
    setIsPlaying(false);
    onAudioEnd();
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const pauseAuido = () => {
    audioRef.current.pause();
    goToMain();
  };

  return (
    <div className="flex flex-col gap-4 max-w-lg mb-8 md:mb-0">
      <button
        className={`h-14 w-full  rounded-xl font-semibold duration-300 ${
          isPlaying ? "bg-red-600" : "bg-green-600"
        }`}
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <div className="flex text-center justify-center gap-4 items-center">
            <FaPause size={24} /> Robot Sesini Durdur
          </div>
        ) : (
          <div className="flex text-center justify-center gap-4 items-center">
            <FaPlay size={24} />
            Robot Sesini Başlat
          </div>
        )}
      </button>
      <button
        onClick={pauseAuido}
        className="h-14 w-full border-2 border-blue-600 text-black rounded-xl font-semibold flex justify-center items-center gap-4"
      >
        <FaArrowRight size={24} />
        Konu Anlatımına Geç
      </button>
    </div>
  );
};

export default AudioPlayer;
