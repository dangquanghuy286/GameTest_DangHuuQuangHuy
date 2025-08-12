import React from "react";

import Header from "../components/Header.jsx";
import Status from "../components/Status.jsx";
import PlayArea from "../components/PlayArea.jsx";

import { useGameLogic } from "../hooks/useGameLogic.js";

const ClearThePointsGame = () => {
  const gameState = useGameLogic();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Header with controls */}
        <Header
          inputValue={gameState.inputValue}
          setInputValue={gameState.setInputValue}
          time={gameState.time}
          isPlaying={gameState.isPlaying}
          startNewGame={gameState.startNewGame}
          resetGame={gameState.resetGame}
          autoPlay={gameState.autoPlay}
          setAutoPlay={gameState.setAutoPlay}
        />

        {/* Game Status Messages */}
        <Status
          gameOver={gameState.gameOver}
          allCleared={gameState.allCleared}
          currentPointTimer={gameState.currentPointTimer}
          currentTarget={gameState.currentTarget}
          time={gameState.time}
          isPlaying={gameState.isPlaying}
          visiblePointsCount={gameState.visiblePointsCount}
        />

        {/* Play Area with points */}
        <PlayArea
          points={gameState.points}
          pointsCount={gameState.pointsCount}
          currentTarget={gameState.currentTarget}
          currentPointTimer={gameState.currentPointTimer}
          handlePointClick={gameState.handlePointClick}
        />
      </div>
    </div>
  );
};

export default ClearThePointsGame;
