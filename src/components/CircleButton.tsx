import React from "react";

interface Circle {
  id: number;
  x: number;
  y: number;
  isClicked: boolean;
  disappearing?: boolean;
  disappearCountdown?: number;
}

type Props = {
  circle: Circle;
  currentTarget: number;
  gameState: "idle" | "playing" | "completed" | "failed";
  isAutoPlay: boolean;
  handleCircleClick: (id: number) => void;
  zIndex: number;
};

const CircleButton: React.FC<Props> = ({
  circle,
  currentTarget,
  gameState,
  isAutoPlay,
  handleCircleClick,
  zIndex,
}) => {
  if (
    circle.disappearing &&
    circle.disappearCountdown !== undefined &&
    circle.disappearCountdown <= 0
  )
    return null;
  // Tính màu và opacity cho trạng thái disappearing
  let bg = "bg-white border-gray-400 text-gray-700 hover:bg-gray-50 shadow-md";
  let border = "border-gray-400";
  let text = "text-gray-700";
  let opacity = 1;
  if (circle.disappearing) {
    if (circle.disappearCountdown && circle.disappearCountdown > 2) {
      bg = "bg-orange-500";
      border = "border-orange-600";
      text = "text-white";
      opacity = 1;
    } else if (circle.disappearCountdown && circle.disappearCountdown > 1) {
      bg = "bg-orange-300";
      border = "border-orange-400";
      text = "text-white";
      opacity = 0.7;
    } else {
      bg = "bg-orange-100";
      border = "border-orange-200";
      text = "text-orange-700";
      opacity = 0.4;
    }
  } else if (circle.id === currentTarget && gameState === "playing") {
    bg =
      "bg-yellow-400 border-yellow-500 text-gray-900 animate-pulse shadow-lg";
    border = "border-yellow-500";
    text = "text-gray-900";
  }
  return (
    <button
      onClick={() => handleCircleClick(circle.id)}
      disabled={circle.isClicked || gameState !== "playing" || isAutoPlay}
      className={`absolute w-12 h-12 rounded-full border-3 font-bold text-sm transition-all duration-300 transform hover:scale-110 ${bg} ${border} ${text}`}
      style={{
        left: `${circle.x - 24}px`,
        top: `${circle.y - 24}px`,
        opacity,
        pointerEvents: circle.disappearing ? "none" : undefined,
        zIndex,
      }}
    >
      {circle.id}
      {circle.disappearing &&
        circle.disappearCountdown &&
        circle.disappearCountdown > 0 && (
          <div className="text-sm font-normal">
            {circle.disappearCountdown.toFixed(1)}s
          </div>
        )}
    </button>
  );
};

export default CircleButton;
