import { useState, useEffect, useCallback } from "react";
import { generatePosition } from "../utils/generatePosition";

export const useGameLogic = () => {
  const [points, setPoints] = useState([]);
  const [pointsCount, setPointsCount] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentTarget, setCurrentTarget] = useState(1);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [allCleared, setAllCleared] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [currentPointTimer, setCurrentPointTimer] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  // Initialize game
  const initializeGame = useCallback((count) => {
    if (!count) return;
    const newPoints = [];
    for (let i = 1; i <= count; i++) {
      newPoints.push({
        id: i,
        number: i,
        position: generatePosition(i - 1, count),
        visible: true,
      });
    }
    setPoints(newPoints);
    setCurrentTarget(1);
    setCurrentPointTimer(3.0);
    setTime(0);
    setIsPlaying(true);
    setGameOver(false);
    setAllCleared(false);
  }, []);

  // Auto play logic
  useEffect(() => {
    let autoInterval = null;
    if (isPlaying && autoPlay && !gameOver && !allCleared) {
      autoInterval = setInterval(() => {
        const currentPoint = points.find(
          (p) => p.number === currentTarget && p.visible
        );
        if (currentPoint) {
          handlePointClick(currentPoint);
        } else if (points.every((p) => !p.visible)) {
          setAllCleared(true);
          setIsPlaying(false);
          clearInterval(autoInterval);
        }
      }, 500); // Auto click every 0.5 seconds
    }
    return () => clearInterval(autoInterval);
  }, [isPlaying, autoPlay, gameOver, allCleared, points, currentTarget]);

  // Start timer
  useEffect(() => {
    if (isPlaying && !gameOver && !allCleared) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
        setCurrentPointTimer((prevTimer) => {
          const newTimer = Math.max(0, prevTimer - 0.1);
          if (newTimer <= 0) {
            setGameOver(true);
            setIsPlaying(false);
          }
          return newTimer;
        });
      }, 100);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [isPlaying, gameOver, allCleared]);

  // Handle point click
  const handlePointClick = (clickedPoint) => {
    if (!isPlaying || gameOver || allCleared) return;

    if (clickedPoint.number === currentTarget) {
      setPoints((prevPoints) =>
        prevPoints.map((point) =>
          point.id === clickedPoint.id ? { ...point, visible: false } : point
        )
      );
      const newTarget = currentTarget + 1;
      setCurrentTarget(newTarget);
      if (newTarget > pointsCount) {
        setAllCleared(true);
        setIsPlaying(false);
      } else {
        setCurrentPointTimer(3.0);
      }
    } else {
      setGameOver(true);
      setIsPlaying(false);
    }
  };

  // Reset game
  const resetGame = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setPoints([]);
    setCurrentPointTimer(0);
    setCurrentTarget(1);
    setTime(0);
    setIsPlaying(false);
    setGameOver(false);
    setAllCleared(false);
    setAutoPlay(false); // Reset auto play when resetting
  };

  // Start new game
  const startNewGame = () => {
    const count = parseInt(inputValue);
    if (isNaN(count) || count < 1) {
      alert("Please enter a valid number greater than 0");
      return;
    }
    setPointsCount(count);
    resetGame();
    initializeGame(count);
  };

  const visiblePointsCount = points.filter((point) => point.visible).length;

  return {
    points,
    pointsCount,
    inputValue,
    setInputValue,
    currentTarget,
    time,
    isPlaying,
    gameOver,
    allCleared,
    currentPointTimer,
    visiblePointsCount,
    handlePointClick,
    resetGame,
    startNewGame,
    autoPlay,
    setAutoPlay,
  };
};
