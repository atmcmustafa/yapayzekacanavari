function Question({ question, onAnswer }) {
  return (
    <div className="orange-bg rounded shadow-md  max-w-lg mb-4 lg:h-[400px] lg:w-[600px] p-7 flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4 text-white text-center ">
        {question.question}
      </h2>
      <div className="grid grid-cols-1 gap-4 ">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
