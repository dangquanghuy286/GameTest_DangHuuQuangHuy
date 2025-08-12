// components/PlayArea.jsx
import React from "react";

const PlayArea = ({
  points,
  pointsCount,
  currentTarget,
  currentPointTimer,
  handlePointClick,
}) => {
  return (
    <div
      className="relative border-2 border-gray-300 bg-gray-50 mx-auto overflow-hidden"
      style={{ width: "400px", height: "400px" }}
    >
      {points.map((point) => {
        const pointSize = pointsCount > 50 ? 30 : pointsCount > 20 ? 40 : 48;
        const fontSize =
          pointsCount > 50
            ? "text-xs"
            : pointsCount > 20
            ? "text-sm"
            : "text-sm";
        const isCurrentTarget = point.number === currentTarget;
        const isExpiring =
          isCurrentTarget && currentPointTimer <= 1.0 && currentPointTimer > 0;

        return (
          point.visible && (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${point.position.x}px`,
                top: `${point.position.y}px`,
              }}
            >
              {/* Point Circle */}
              <div
                onClick={() => handlePointClick(point)}
                className={`rounded-full border-2 flex items-center justify-center cursor-pointer font-bold transition-all duration-200 hover:scale-110 ${fontSize} ${
                  isCurrentTarget
                    ? isExpiring
                      ? "bg-red-300 border-red-500 text-red-800 animate-pulse shadow-lg"
                      : "bg-yellow-300 border-yellow-500 text-black shadow-lg"
                    : "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
                style={{
                  width: `${pointSize}px`,
                  height: `${pointSize}px`,
                }}
              >
                {point.number}
              </div>
              {/* Timer Display - Only for current target */}
              {isCurrentTarget && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`text-xs font-bold px-1 py-0.5 rounded ${
                      currentPointTimer <= 1.0
                        ? "bg-red-500 text-white animate-pulse"
                        : currentPointTimer <= 2.0
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {currentPointTimer.toFixed(1)}s
                  </div>
                </div>
              )}
            </div>
          )
        );
      })}
    </div>
  );
};

export default PlayArea;
