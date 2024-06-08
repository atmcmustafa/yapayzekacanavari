import HeaderIlkogretim from "../components/HeaderIlkogretim";
import Layer from "../components/Layer";
import NewGame from "../components/NewGame";

const BaloonPop = () => {
  return (
    <div className="">
      <HeaderIlkogretim />
      <Layer />
      <div className="flex justify-center mt-8">
        <NewGame />
      </div>
    </div>
  );
};

export default BaloonPop;
