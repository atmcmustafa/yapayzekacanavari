import { useEffect, useState } from "react";

const Balloon = ({ text, onAnswer, left, isPopped, onEscape, resetBottom }) => {
  const [bottom, setBottom] = useState(-100);

  useEffect(() => {
    if (resetBottom) {
      setBottom(0);
    }
  }, [resetBottom]);

  useEffect(() => {
    if (isPopped) return;

    const interval = setInterval(() => {
      setBottom((prev) => {
        const newBottom = prev + 2;
        if (newBottom > 600) {
          clearInterval(interval);
          onEscape();
        }
        return newBottom;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isPopped, onEscape]);

  if (isPopped) {
    return null;
  }
  // bg-blue-400 w-24 h-24 rounded-full flex flex-wrap items-center justify-center text-white cursor-pointer
  return (
    <div
      className="balloon "
      style={{ left: `${left}px`, bottom: `${bottom}px`, position: "absolute" }}
      onClick={onAnswer}
    >
      {text}
      
    </div>
  );
};

export default Balloon;
