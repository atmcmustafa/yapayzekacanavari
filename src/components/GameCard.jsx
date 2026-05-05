const GameCard = ({ imgLink, title, link }) => {
  return (
    <div className="rounded-lg text-center px-4 max-w-96 md:max-w-full w-full h-[120px] sm:h-[180px] md:h-[200px]  lg:h-[230px] relative group">
      <img
        src={imgLink}
        className="absolute inset-0 object-cover rounded-lg h-full w-full"
        alt="robot"
      />
      <div className="absolute bg-black/40 z-40 inset-0 opacity-0 invisible group-hover:visible duration-300 hover:cursor-pointer group-hover:opacity-100 rounded-lg"></div>
      <div className="z-50 text-white relative flex items-center justify-center h-full opacity-0 invisible group-hover:visible duration-300 hover:cursor-pointer group-hover:opacity-100 flex-col">
        <span className="text-sm md:text-xl">{title}</span>
        <a href={link}>
          <button className="w-full lg:w-64 py-1 px-0.5 lg:h-12 border border-blue-600 lg:mt-3 rounded bg-blue-600">
            Oyuna Başla
          </button>
        </a>
      </div>
    </div>
  );
};

export default GameCard;
