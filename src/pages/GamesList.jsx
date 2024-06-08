import GameCard from "../components/GameCard";
import HeaderIlkogretim from "../components/HeaderIlkogretim";
import Layer from "../components/Layer";

const GamesList = () => {
  return (
    <div>
      <HeaderIlkogretim />
      <Layer />
      <div className="mt-24 container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-wrap place-items-center justify-center items-center gap-12 px-4 sm:px-0">
        {/* card 1 */}
        <GameCard
          imgLink={
            "https://img.freepik.com/free-photo/3d-delivery-robot-working_23-2151150085.jpg?t=st=1717858995~exp=1717862595~hmac=e75875e436a6c280d7c4f2c332a803a52563626203df7ca5f21915fb7ef9e7a9&w=1380"
          }
          link={"/baloon-pop"}
          title={"ROBOT PATLATMA OYUNU"}
        />
        {/* card 3 */}
        <GameCard
          imgLink={
            "https://img.freepik.com/free-photo/anthropomorphic-futuristic-robot-performing-regular-human-job_23-2151043540.jpg?t=st=1717859001~exp=1717862601~hmac=5545858faf6c36e15396717bb139285753518a4afafdce366df31c550509b046&w=1480"
          }
          link={"/robot-puzzle"}
          title={"PARÇALARI TAMAMLAMA OYUNU"}
        />
        {/* card 3 */}
        <GameCard
          imgLink={
            "https://img.freepik.com/free-photo/boxing-day-celebration-with-toy_23-2151013801.jpg?t=st=1717859019~exp=1717862619~hmac=d348e571024a0309ceccc1c14b638e9c662a0fd66a17d0846b1baa39ad8d1125&w=1380"
          }
          link={"/prompt-test"}
          title={"PROMPT TEST OYUNU"}
        />
      </div>
    </div>
  );
};

export default GamesList;
