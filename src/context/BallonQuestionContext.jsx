import React, { createContext, useState, useContext } from "react";

const BalloonQuestionContext = createContext();

const balloonQuestions = [
  {
    question: "Yapay zeka, hangi bilim dalının bir alt dalıdır?",
    answers: ["Bilgisayar bilimleri", "Psikoloji", "Fizik"],
    correct: 0,
  },
  {
    question: "Yapay zeka, bilgisayarların ne yapabilmesini sağlar?",
    answers: [
      "Uyumalarını",
      "Düşünmelerini ve öğrenmelerini",
      "Yemek yapmalarını",
    ],
    correct: 1,
  },
  {
    question: "Yapay zekanın en yaygın kullanıldığı yerlerden biri nedir?",
    answers: ["Sesli asistanlar", "Otomobiller", "El fenerleri"],
    correct: 0,
  },
  {
    question: "Siri ve Alexa ne tür yapay zeka örnekleridir?",
    answers: ["Robot", "Sesli asistan", "Bilgisayar oyunu"],
    correct: 1,
  },
  {
    question: "Bir bilgisayar oyununda yapay zeka ne yapar?",
    answers: [
      "Müzik çalar",
      "Oyun oynar",
      "Rakiplerimizi daha akıllı hale getirir",
    ],
    correct: 2,
  },
  {
    question: "Yapay zeka, doktorlara nasıl yardımcı olabilir?",
    answers: [
      "Hastalıkları teşhis ederek",
      "Ameliyat yaparak",
      "Reçete yazarak",
    ],
    correct: 0,
  },
  {
    question:
      "Öneri sistemleri, izlediğimiz veya dinlediğimiz şeylere göre bize ne yapar?",
    answers: ["Yeni şarkılar ve videolar önerir", "Kahve yapar", "Kitap okur"],
    correct: 0,
  },
  {
    question: "Yapay zeka, bir resimdeki kediyi tanımayı nasıl öğrenir?",
    answers: ["Birçok kedi resmi görerek", "Kitap okuyarak", "Uyuyarak"],
    correct: 0,
  },
  {
    question: "Google Asistan, hangi şirketin sesli asistanıdır?",
    answers: ["Apple", "Google", "Amazon"],
    correct: 1,
  },
  {
    question: "Yapay zeka, hangi cihazlarda bulunabilir?",
    answers: ["Akıllı telefonlar", "El fenerleri", "Çiçek vazoları"],
    correct: 0,
  },
  {
    question:
      "Eğer bir yapay zeka robotuna 'En sevdiğin renk ne?' diye sorarsak, ne yapar?",
    answers: [
      "Cevap vermez",
      "Öğrendiği bilgilere göre cevap verir",
      "Şarkı söyler",
    ],
    correct: 1,
  },
  {
    question: "Yapay zeka robotları nasıl öğrenir?",
    answers: ["Kitap okuyarak ve izleyerek", "Oyun oynayarak", "Uyuyarak"],
    correct: 0,
  },
  {
    question: "Bir resim tanıma oyunu ile yapay zeka ne yapabilir?",
    answers: ["Nesneleri tanıyabilir", "Kitap yazabilir", "Dans edebilir"],
    correct: 0,
  },
  {
    question: "Chatbot nedir?",
    answers: [
      "Yemek pişiren bir robot",
      "Sizinle konuşabilen bir bilgisayar programı",
      "Müzik çalan bir cihaz",
    ],
    correct: 1,
  },
  {
    question: "Yapay zeka gelecekte ne yapabilir?",
    answers: [
      "Ev işlerinde yardımcı olabilir",
      "Uzaya gidebilir",
      "Yemek pişirebilir",
    ],
    correct: 0,
  },
  {
    question: "Yapay zeka ile ilgili hikayeler yazmak neye yardımcı olabilir?",
    answers: ["Hayal gücümüzü geliştirmeye", "Uyumaya", "Koşmaya"],
    correct: 0,
  },
  {
    question: "Netflix, hangi yapay zeka türünü kullanarak önerilerde bulunur?",
    answers: ["Öneri sistemleri", "Sesli asistanlar", "Robotlar"],
    correct: 0,
  },
  {
    question: "Bir yapay zeka öğretmen, öğrencilere nasıl yardımcı olabilir?",
    answers: [
      "Dersleri anlatabilir",
      "Ev ödevlerini yapabilir",
      "Müzik dinletebilir",
    ],
    correct: 0,
  },
  {
    question: "Yapay zeka robotları neyi yapamaz?",
    answers: ["Düşünebilir", "Öğrenebilir", "Yemek yiyebilir"],
    correct: 2,
  },
  {
    question: "Yapay zeka ile ilgili en heyecan verici şey nedir?",
    answers: [
      "İnsanlar gibi düşünüp öğrenebilmesi",
      "Uyuması",
      "Yemek pişirmesi",
    ],
    correct: 0,
  },
];

export const BalloonQuestionProvider = ({ children }) => {
  const [currentQuestions, setCurrentQuestions] = useState(balloonQuestions);

  return (
    <BalloonQuestionContext.Provider value={{ currentQuestions }}>
      {children}
    </BalloonQuestionContext.Provider>
  );
};

export const useBalloonQuestions = () => useContext(BalloonQuestionContext);
