import GameCard from "../components/GameCard";
import HeaderIlkogretim from "../components/HeaderIlkogretim";
import Layer from "../components/Layer";

const gameListData = [
  {
    id: 1,
    imgLink:
      "https://img.freepik.com/free-photo/3d-delivery-robot-working_23-2151150085.jpg?t=st=1717858995~exp=1717862595~hmac=e75875e436a6c280d7c4f2c332a803a52563626203df7ca5f21915fb7ef9e7a9&w=1380",
    href: "/baloon-pop",
    title: "ROBOT PATLATMA OYUNU",
  },
  {
    id: 2,
    imgLink:
      "https://img.freepik.com/free-photo/anthropomorphic-futuristic-robot-performing-regular-human-job_23-2151043540.jpg?t=st=1717859001~exp=1717862601~hmac=5545858faf6c36e15396717bb139285753518a4afafdce366df31c550509b046&w=1480",
    href: "/robot-puzzle",
    title: "PARÇALARI TAMAMLAMA OYUNU",
  },
  {
    id: 3,
    imgLink:
      "https://img.freepik.com/free-photo/boxing-day-celebration-with-toy_23-2151013801.jpg?t=st=1717859019~exp=1717862619~hmac=d348e571024a0309ceccc1c14b638e9c662a0fd66a17d0846b1baa39ad8d1125&w=1380",
    href: "/prompt-test",
    title: "PROMPT TEST OYUNU",
  },
  {
    id: 4,
    imgLink:
      "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151022006.jpg",
    href: "/gameList",
    title: "DRONE UÇURMA OYUNU",
  },
  {
    id: 5,
    imgLink:
      "https://img.freepik.com/free-photo/3d-robot-hand-background-ai-technology-side-view_53876-129789.jpg?t=st=1718050071~exp=1718053671~hmac=6669c4a4ea9b61e322413944867589c83e9b62272e595531719508617d95d0a0&w=1380",
    href: "/gameList",
    title: "ROBOT BULMA OYUNU",
  },
  {
    id: 6,
    imgLink:
      "https://img.freepik.com/free-photo/3d-delivery-robot-working_23-2151150104.jpg?t=st=1718050118~exp=1718053718~hmac=db9244998d236b56b775ddd43310d8f155f5cb89560f60243be6042f18db22e6&w=1380",
    href: "/gameList",
    title: "KELİME BULMA OYUNU",
  },
  {
    id: 7,
    imgLink:
      "https://img.freepik.com/free-photo/anthropomorphic-futuristic-robot-performing-regular-human-job_23-2151043520.jpg?t=st=1718050134~exp=1718053734~hmac=864dc699e72f65c63131229b94a1833cfc6655d01e1ec1ae6abcd5928c51bba5&w=1380",
    href: "/gameList",
    title: "SAKLI ROBOTU BULMA OYUNU",
  },
  {
    id: 8,
    imgLink:
      "https://img.freepik.com/free-photo/anthropomorphic-robot-performing-regular-human-job-future_23-2151043410.jpg?t=st=1718050154~exp=1718053754~hmac=096704641c7b17b4d3b680d488410cd8e151be4f5fbdabd3f5fbcfa4060305ba&w=1480",
    href: "/gameList",
    title: "YAPAY ZEKA İLE SAKLAMBAÇ",
  },
  {
    id: 9,
    imgLink:
      "https://img.freepik.com/free-photo/anthropomorphic-futuristic-robot-performing-regular-human-job_23-2151043542.jpg?t=st=1718050165~exp=1718053765~hmac=dc47606b03b5113d3eb8076d8b3c92db674b36a13ff9d89755b84fa852b39503&w=1380",
    href: "/gameList",
    title: "ROBOT İLE TEMİZLİK OYUNU",
  },
];

const GamesList = () => {
  return (
    <div>
      <HeaderIlkogretim />
      <Layer />
      <div className="mt-12 container mx-auto grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 flex-wrap place-items-center justify-center items-center gap-8 px-4 sm:px-0 ">
        {gameListData.map((data) => (
          <GameCard
            key={data.id}
            imgLink={data.imgLink}
            link={data.href}
            title={data.title}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
