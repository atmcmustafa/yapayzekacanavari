import axios from "axios";
import { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import tekrarDeneyinImage from "/tekrar-deneyin-2.png";
import landscapeCertificateTemplate from "/sablon1.png";
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import "../assets/Brusher-normal";
import { jsPDF } from "jspdf";
import { db } from "../firebase-config";
import { useAuth } from "../context/Auth";
import { FaCircleInfo } from "react-icons/fa6";
import toast from "react-hot-toast";
import loadingBar from "/loading.gif";
import { FaQuestionCircle } from "react-icons/fa";
import GameMap from "./GameMap";
import { TiTick } from "react-icons/ti";
import { SiFuturelearn } from "react-icons/si";
import { IoTimerOutline } from "react-icons/io5";
import { PiGpsFixBold } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa";

const GPTtest = () => {
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [showErrorImage, setShowErrorImage] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const { width, height } = useWindowSize();
  const { currentUser } = useAuth();
  const [correctCount, setCorrectCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => {
        setConfetti(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  useEffect(() => {
    if (showErrorImage) {
      const timer = setTimeout(() => {
        setShowErrorImage(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showErrorImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://server-prompt.vercel.app/api/analyze-prompt",
        { input: prompt }
      );

      setFeedback(response.data.response);
      setFeedbackColor(
        response.data.isValid ? "text-green-600" : "text-red-600"
      );
      setConfetti(response.data.isValid);
      setShowErrorImage(!response.data.isValid);
      setError("");

      if (currentUser) {
        await recordAnswer(currentUser.uid, response.data.isValid);
      } else {
        toast.error("Lütfen cevapları kaydetmek için giriş yapın.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Sunucu tarafında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  async function recordAnswer(userId, isCorrect) {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      answers: arrayUnion({ prompt: prompt, correct: isCorrect }),
      correctCount: isCorrect ? increment(1) : increment(0),
    });

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const newCorrectCount = userDoc.data().correctCount;
      setCorrectCount(newCorrectCount);

      if (newCorrectCount >= 10) {
        setShowDownload(true);
      } else {
        toast.success(`Sertifika almaya ${10 - newCorrectCount} cevap kaldı!`);
      }
    }
  }

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setCorrectCount(docSnap.data().correctCount || 0);
        }
      });
    }
  }, [currentUser]);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const img = new Image();
    img.src = landscapeCertificateTemplate;
    img.onload = () => {
      doc.addImage(img, "PNG", 0, 0, 297, 210);

      // Çocuk adı ekleme
      doc.setFont("Brusher", "normal");
      doc.setFontSize(48);
      doc.setTextColor(255, 255, 255);
      doc.text(currentUser.displayName || "Sevgili Ogrenci  ", 148.5, 70, {
        align: "center",
      });
      // Tarih ekleme
      const today = new Date();
      const date = `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;
      doc.setFontSize(24);
      doc.text("Verilis Tarihi:" + date, 100, 140); // Tarihi 'DATE' alanının yanına yerleştirin

      // İmza ekleme
      // doc.setFontSize(14);
      // doc.text("Ogretmen", 245, 195); // İmza metnini 'NAPE' alanının yanına yerleştirin
      // PDF'i indirme"
      doc.save("sertifika.pdf");
    };
  };
  const sections = [
    {
      icon: TiTick,
      text: "Kombo Yap",
      bgColor: "bg-sky-600",
    },
    {
      icon: PiGpsFixBold,
      text: "Teknik Öğren",
      bgColor: "bg-green-600",
    },
    {
      icon: FaQuestion,
      text: "Doğru Sorular Sor",
      bgColor: "bg-yellow-500",
    },
  ];

  const description = [
    "1. Oyunun amacı prompt mühendisliği konusunda öğrendiğin konuları pekiştirmektir.",
    "2. Öğrendiğin teknikler ile sorular sor.",
    "3. Eğer 10 adet doğru sorar isen sana özel tasarladığımız sertifikaya sahip olacaksın.",
    "4. Sertifikaya ulaşmak istiyorsan giriş yap butonundan giriş yapmayı unutma.",
    "5. İstediğin kadar deneme hakkına sahipsin.",
    "6. Daha fazla ne bekliyorsun? Oyunu Başlat butonuna tıkla ve macerayı başlat!",
  ];

  const handleButtonClick = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="w-full">
        <GameMap
          sections={sections}
          title="Yol Haritası"
          description={description}
          buttonText="Oyunu Başlat"
          onButtonClick={handleButtonClick}
        />
      </div>
      // <div className="w-full flex items-center justify-center ">
      //   <button
      //     onClick={() => setGameStarted(true)}
      //     className=" glow-on-hover w-full flex-1"
      //   >
      //     <a
      //       href="#gpt-test"
      //       className="h-full w-full flex items-center justify-center"
      //     >
      //       Oyunu Başlat
      //     </a>
      //   </button>
      // </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full">
      <div
        id="gpt-test"
        className="gpt-test container mx-auto px-4 md:px-0 text-white max-w-5xl xl:max-w-7xl w-full lg:w-[600px] xl:w-[800px] "
      >
        <h3 className="rounded mb-2 p-2 border font-semibold text-white bg-blue-800  flex items-center gap-2">
          <FaQuestionCircle size={36} />
          Prompt mühendisliği eğitiminden edindiğin bilgiler ışığında sorular
          sor.
        </h3>
        <h3 className=" rounded my-2 p-2 border font-semibold text-blue-800 border-blue-800 flex items-center gap-2">
          <FaCircleInfo size={36} />
          10 adet doğru soru sor ve sertifikayı kap!
        </h3>
        <form
          className="flex flex-col  w-full gap-4 mb-4 overflow-hidden h-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <textarea
              className="rounded bg-slate-900 p-4 w-full text-white resize-none outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Buraya yazın..."
            />
            <div className="flex items-start">
              <button
                className=" bg-green-600 !opacity-100 !text-white w-full !h-10 !rounded  duration-300 disabled:bg-opacity-50 hover:scale-100 hover:bg-green-700 "
                type="submit"
                disabled={prompt.length < 1 || loading}
              >
                {loading ? "Değerlendiriliyor..." : "Gönder"}
              </button>
              {loading && (
                <img
                  className="w-48 h-48 xl:w-64  xl:h-64 z-20 opacity-100 absolute top-0"
                  src={loadingBar}
                />
              )}
            </div>
          </div>

          {feedback && (
            <div
              className={`rounded p-4 bg-slate-900 w-full flex items-center justify-between gap-4 ${feedbackColor}`}
            >
              {feedback}
              {feedbackColor === "text-green-600" ? (
                <>
                  <TiTickOutline className="text-green-500 text-7xl" />
                  {confetti && <Confetti width={width} height={height} />}
                </>
              ) : (
                <>
                  <FaTimes className="text-red-500 text-7xl" />
                  {showErrorImage && (
                    <img
                      src={tekrarDeneyinImage}
                      className="w-72 h-72 absolute top-0 object-contain z-50"
                      alt="Try Again"
                    />
                  )}
                </>
              )}
            </div>
          )}

          {error && (
            <div className="text-4xl bg-red-500 rounded p-4">{error}</div>
          )}
          {showDownload && (
            <button
              className="bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded "
              onClick={handleGeneratePdf}
            >
              Sertifika İndir
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GPTtest;
