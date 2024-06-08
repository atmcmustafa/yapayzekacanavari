import GPTtest from "../components/GPTtest";
import HeaderIlkogretim from "../components/HeaderIlkogretim";
import Layer from "../components/Layer";
const PromptTest = () => {
  return (
    <div>
      <HeaderIlkogretim />
      <Layer />
      <div className="mt-24">
        <GPTtest />
      </div>
    </div>
  );
};

export default PromptTest;
