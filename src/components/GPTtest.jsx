import axios from "axios";
import { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import tekrarDeneyinImage from "../../public/tekrar-deneyin-2.png";
import kutlama from "../../public/party.jpg";
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { jsPDF } from "jspdf";
import { db } from "../firebase-config";
import { useAuth } from "../context/Auth";
import { FaCircleInfo } from "react-icons/fa6";
import toast from "react-hot-toast";
import loadingBar from "../../public/loading.gif";
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

      if (newCorrectCount >= 5) {
        setShowDownload(true);
      } else {
        toast.success(`Sertifika almaya ${5 - newCorrectCount} cevap kaldı!`);
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
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Sertifika başlığı
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(6, 69, 173); // Parlak mavi renk
    doc.text("Sertifika", 105, 20, null, null, "center"); // Metni sayfa ortasına al

    // Alt başlık
    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(
      `Tebrikler ${currentUser.displayName || "Sevgili Ogrenci"}!`,
      105,
      40,
      null,
      null,
      "center"
    );

    // Sertifika İçeriği
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "10 dogru cevap ile bu basari sertifikasini kazandiniz.",
      105,
      60,
      null,
      null,
      "center"
    );

    // Özel Not
    doc.setTextColor(150, 0, 150); // Pembe renk
    doc.setFontSize(12);
    doc.text("Devam et ve daha fazla ogren!", 105, 80, null, null, "center");

    // Alt kısım süslemesi
    doc.setDrawColor(0, 255, 0); // Yeşil
    doc.setLineWidth(1.5);
    doc.line(20, 90, 190, 90); // Yatay çizgi

    // Resim ekleyebileceğiniz yer (Varsayılan bir URL'den yüklenir)
    const imageUrl = kutlama;
    const imageWidth = 180; // mm
    const imageHeight = 120; // mm
    const imageX = (210 - imageWidth) / 2; // 210mm sayfanın genişliği, resmi ortala
    const imageY = 100; // Resmi metinlerden sonra yerleştir

    doc.addImage(imageUrl, "JPEG", imageX, imageY, imageWidth, imageHeight);

    // PDF'i blob olarak çıkar ve indir
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "sertifika.pdf";
    link.click();
  };

  if (!gameStarted) {
    return (
      <div className="w-full flex items-center justify-center ">
        <button
          onClick={() => setGameStarted(true)}
          className=" glow-on-hover !w-[300px]"
        >
          <a
            href="#gpt-test"
            className="h-full w-full flex items-center justify-center"
          >
            Oyunu Başlat
          </a>
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full">
      <div
        id="gpt-test"
        className="gpt-test container mx-auto px-4 md:px-0 text-white max-w-5xl xl:max-w-7xl w-full lg:w-[600px] xl:w-[800px] "
      >
        <h2 className="mb-4 ml-2 w-full">
          Birkaç prompt girişi yap ve geçerliliğini test et!
        </h2>
        <h3 className=" rounded my-2 p-2 bg-blue-800 !text-white flex items-center gap-2">
          <FaCircleInfo />
          10 adet doğru cevap ver ve sertifikayı kap!
        </h3>
        <form
          className="flex flex-col  w-full gap-4 mb-4 overflow-hidden h-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <textarea
              className="rounded-xl bg-slate-900 p-4 w-full text-white resize-none outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Buraya yazın..."
            />
            <div className="flex items-start">
              <button
                className="btn w-fit hover:opacity-80 duration-300 disabled:opacity-50 hover:scale-100"
                type="submit"
                disabled={prompt.length < 1 || loading}
              >
                {loading ? "Değerlendiriliyor..." : "Prompt'u Değerlendir"}
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
              className={`rounded-xl p-4 bg-slate-900 w-full flex items-center justify-between gap-4 ${feedbackColor}`}
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
