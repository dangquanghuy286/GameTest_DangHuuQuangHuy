export const generatePosition = (index, totalPoints) => {
  // Kích thước khu vực chơi (play area)
  const playArea = { width: 400, height: 400 };

  // Xác định bán kính của điểm
  const pointRadius = totalPoints > 50 ? 15 : totalPoints > 20 ? 20 : 25;

  // Lề an toàn (để điểm không dính sát viền)
  const margin = pointRadius + 5;

  // Số cột (cols) được tính dựa trên căn bậc 2 của số điểm, nhân 1.2 để giãn
  const cols = Math.ceil(Math.sqrt(totalPoints * 1.2));

  // Số hàng (rows) dựa trên tổng điểm chia cho số cột
  const rows = Math.ceil(totalPoints / cols);

  // Kích thước mỗi ô trong lưới
  const gridWidth = (playArea.width - 2 * margin) / cols;
  const gridHeight = (playArea.height - 2 * margin) / rows;

  // Xác định cột và hàng hiện tại của point dựa vào index
  const col = index % cols;
  const row = Math.floor(index / cols);

  // Tính tọa độ gốc (baseX, baseY) đặt điểm vào giữa ô lưới
  const baseX = margin + col * gridWidth + gridWidth / 2;
  const baseY = margin + row * gridHeight + gridHeight / 2;

  // Thêm độ lệch ngẫu nhiên để điểm không xếp thẳng hàng
  const randomOffsetX = (Math.random() - 0.5) * (gridWidth * 0.6);
  const randomOffsetY = (Math.random() - 0.5) * (gridHeight * 0.6);

  // Tọa độ cuối cùng sau khi thêm độ lệch
  const finalX = baseX + randomOffsetX;
  const finalY = baseY + randomOffsetY;

  // Đảm bảo điểm không vượt ra ngoài khu vực chơi
  return {
    x: Math.max(pointRadius, Math.min(playArea.width - pointRadius, finalX)),
    y: Math.max(pointRadius, Math.min(playArea.height - pointRadius, finalY)),
  };
};
