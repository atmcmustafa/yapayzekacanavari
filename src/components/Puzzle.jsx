function Puzzle({ completedPieces }) {
  const totalPieces = 9;
  const pieces = Array.from({ length: totalPieces }, (_, index) => ({
    id: index + 1,
    completed: index < completedPieces,
  }));

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`w-12 h-12 sm:w-16 sm:h-16 md:w-24  md:h-24 m-1 border-2 ${
            piece.completed ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default Puzzle;
