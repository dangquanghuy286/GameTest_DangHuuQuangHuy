export const generatePosition = (index, totalPoints) => {
  const playArea = { width: 400, height: 400 };
  const pointRadius = totalPoints > 50 ? 15 : totalPoints > 20 ? 20 : 25;
  const margin = pointRadius + 5;

  // Dynamic grid sizing based on total points
  const cols = Math.ceil(Math.sqrt(totalPoints * 1.2));
  const rows = Math.ceil(totalPoints / cols);

  const gridWidth = (playArea.width - 2 * margin) / cols;
  const gridHeight = (playArea.height - 2 * margin) / rows;

  const col = index % cols;
  const row = Math.floor(index / cols);

  const baseX = margin + col * gridWidth + gridWidth / 2;
  const baseY = margin + row * gridHeight + gridHeight / 2;

  // Add randomness within the grid cell
  const randomOffsetX = (Math.random() - 0.5) * (gridWidth * 0.6);
  const randomOffsetY = (Math.random() - 0.5) * (gridHeight * 0.6);

  const finalX = baseX + randomOffsetX;
  const finalY = baseY + randomOffsetY;

  return {
    x: Math.max(pointRadius, Math.min(playArea.width - pointRadius, finalX)),
    y: Math.max(pointRadius, Math.min(playArea.height - pointRadius, finalY)),
  };
};
