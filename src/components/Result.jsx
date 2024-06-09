import { IoGameControllerOutline } from "react-icons/io5";

function Result({ score, onRestart }) {
  return (
    <div className="try-again p-8 rounded shadow-md w-full max-w-lg text-center flex flex-col gap-4 ">
      <h2
        className={`text-2xl font-bold  ${
          score >= 9 ? "text-green-400" : "text-red-600"
        }`}
      >
        {score >= 9
          ? "Tebrikler! Başarılı oldunuz ve robotun parçalarını tamamladınız! "
          : "Maalesef, tekrar deneyiniz."}
      </h2>
      <span className="text-xl font-bold text-white">
        Doğru cevap sayısı : {score}
      </span>
      <button
        onClick={onRestart}
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-4"
      >
        <IoGameControllerOutline size={24} />
        Yeniden Başla
      </button>
    </div>
  );
}

export default Result;
