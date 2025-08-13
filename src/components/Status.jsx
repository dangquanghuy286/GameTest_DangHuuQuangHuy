import React from "react";

const Status = ({
  gameOver,
  allCleared,
  currentPointTimer,
  currentTarget,
  time,
  isPlaying,
  visiblePointsCount,
}) => {
  return (
    <>
      {/* Game Over Status */}
      {gameOver && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          <strong>GAME OVER!</strong>
          <br />
          {currentPointTimer <= 0
            ? `Time's up for point ${currentTarget}!`
            : `Click the next number in sequence: ${currentTarget}`}
        </div>
      )}

      {/* All Cleared Status */}
      {allCleared && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          <strong>ALL CLEARED!</strong>
          <br />
          Time: {time.toFixed(1)}s
        </div>
      )}

      {/* Playing Status */}
      {isPlaying && !gameOver && !allCleared && (
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500">
            Points remaining: {visiblePointsCount}
          </p>
        </div>
      )}
    </>
  );
};

export default Status;
