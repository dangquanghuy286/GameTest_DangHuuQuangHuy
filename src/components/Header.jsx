import React from "react";

const Header = ({
  inputValue,
  setInputValue,
  time,
  isPlaying,
  startNewGame,
  resetGame,
  autoPlay,
  setAutoPlay,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold  mb-4">LET'S PLAY</h1>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Points:</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
            min="1"
            disabled={isPlaying}
            placeholder="Any number"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Time:</span>
          <span className="text-sm">{time.toFixed(1)}s</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={startNewGame}
          disabled={isPlaying}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 text-sm ${
            isPlaying ? "hidden" : ""
          }`}
        >
          Start
        </button>
        <button
          onClick={resetGame}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
        >
          Reset
        </button>
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 text-sm"
        >
          Auto Play {autoPlay ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
};

export default Header;
