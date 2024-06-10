import { IoGameControllerOutline } from "react-icons/io5";
import React from "react";
const GameMap = ({
  sections,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className=" max-w-4xl mx-auto">
      <div className="flex  gap-8 justify-center mt-8 md:mt-16 lg:mt-24 w-full">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`h-24 w-24 md:h-36 md:w-36 rounded-full border flex flex-col gap-2 items-center justify-center ${section.bgColor} text-white text-center`}
          >
            {React.createElement(section.icon, { size: 48 })}
            <span className="text-wrap">{section.text}</span>
          </div>
        ))}
      </div>
      <div className="px-4">
        <div className="p-4 rounded bg-orange-600 max-w-xl md:max-w-5xl w-full flex flex-col items-center mt-4  mx-auto ">
          <h2 className="mb-2 text-center text-3xl">{title}</h2>
          <div className="flex flex-col gap-2 text-white text-base md:text-xl">
            {description.map((desc, index) => (
              <span key={index}>{desc}</span>
            ))}
            <button
              onClick={onButtonClick}
              className="mt-4 h-10 w-52 mx-auto bg-green-600 font-semibold rounded flex justify-center items-center gap-4"
            >
              <IoGameControllerOutline size={28} />
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMap;
