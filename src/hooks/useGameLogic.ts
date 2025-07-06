import { useState, useEffect, useCallback } from "react";

export interface Circle {
  id: number;
  x: number;
  y: number;
  isClicked: boolean;
  disappearing?: boolean;
  disappearCountdown?: number;
}

export type GameState = "idle" | "playing" | "completed" | "failed";

export function useGameLogic() {
  const [points, setPoints] = useState(5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [circles, setCircles] = useState<Circle[]>([]);
  const [currentTarget, setCurrentTarget] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Generate random positions for circles
  const generateCircles = useCallback(() => {
    const newCircles: Circle[] = [];
    const gameArea = { width: 600, height: 400 };
    const circleRadius = 25;
    for (let i = 1; i <= points; i++) {
      let x: number;
      let y: number;
      let attempts = 0;
      do {
        x = Math.random() * (gameArea.width - circleRadius * 2) + circleRadius;
        y = Math.random() * (gameArea.height - circleRadius * 2) + circleRadius;
        attempts++;
      } while (
        attempts < 50 &&
        newCircles.some(
          (circle) =>
            Math.sqrt(Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2)) <
            circleRadius * 2.5
        )
      );
      newCircles.push({ id: i, x, y, isClicked: false });
    }
    setCircles(newCircles);
  }, [points]);

  // Start game
  const startGame = useCallback(() => {
    setGameState("playing");
    setCurrentTarget(1);
    setElapsedTime(0);
    generateCircles();
  }, [generateCircles]);

  // Restart game
  const restartGame = () => {
    setIsAutoPlay(false);
    startGame();
  };

  // Handle circle click
  const handleCircleClick = (circleId: number) => {
    if (gameState !== "playing" || isAutoPlay) return;
    if (circleId === currentTarget) {
      setCircles((prev) =>
        prev.map((circle) =>
          circle.id === circleId
            ? {
                ...circle,
                isClicked: true,
                disappearing: true,
                disappearCountdown: 3.0,
              }
            : circle
        )
      );
      if (circleId !== points) {
        setCurrentTarget((prev) => prev + 1);
      }
    } else {
      setGameState("failed");
    }
  };

  // Auto play
  const toggleAutoPlay = () => {
    if (gameState !== "playing") return;
    setIsAutoPlay((prev) => !prev);
  };

  // Auto play effect
  useEffect(() => {
    if (!isAutoPlay || gameState !== "playing") return;
    if (currentTarget === 1) {
      const targetCircle = circles.find((c) => c.id === currentTarget);
      if (targetCircle && !targetCircle.isClicked) {
        setCircles((prev) =>
          prev.map((circle) =>
            circle.id === currentTarget
              ? {
                  ...circle,
                  isClicked: true,
                  disappearing: true,
                  disappearCountdown: 3.0,
                }
              : circle
          )
        );
        if (currentTarget < points) {
          setCurrentTarget((prev) => prev + 1);
        } else {
          setIsAutoPlay(false);
        }
      }
    } else {
      const prevCircle = circles.find((c) => c.id === currentTarget - 1);
      if (
        prevCircle &&
        prevCircle.disappearing &&
        prevCircle.disappearCountdown !== undefined &&
        prevCircle.disappearCountdown <= 2.0
      ) {
        const targetCircle = circles.find((c) => c.id === currentTarget);
        if (targetCircle && !targetCircle.isClicked) {
          setCircles((prev) =>
            prev.map((circle) =>
              circle.id === currentTarget
                ? {
                    ...circle,
                    isClicked: true,
                    disappearing: true,
                    disappearCountdown: 3.0,
                  }
                : circle
            )
          );
          if (currentTarget < points) {
            setCurrentTarget((prev) => prev + 1);
          } else {
            setIsAutoPlay(false);
          }
        }
      }
    }
  }, [isAutoPlay, gameState, currentTarget, points, circles]);

  // Bấm giờ
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setElapsedTime((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState]);

  // Đếm ngược 3s cho các hình tròn disappearing
  useEffect(() => {
    if (gameState !== "playing") return;
    if (circles.some((c) => c.disappearing)) {
      const timer = setInterval(() => {
        setCircles((prev) =>
          prev
            .map((circle) => {
              if (
                circle.disappearing &&
                circle.disappearCountdown &&
                circle.disappearCountdown > 0
              ) {
                return {
                  ...circle,
                  disappearCountdown: +(
                    circle.disappearCountdown - 0.1
                  ).toFixed(1),
                };
              }
              return circle;
            })
            .filter(
              (circle) =>
                !(
                  circle.disappearing &&
                  circle.disappearCountdown !== undefined &&
                  circle.disappearCountdown <= 0
                )
            )
        );
      }, 100);
      return () => clearInterval(timer);
    }
  }, [circles, gameState]);

  // Khi tất cả hình tròn đã biến mất thì set completed
  useEffect(() => {
    if (gameState === "playing" && circles.length === 0) {
      setGameState("completed");
    }
  }, [circles, gameState]);

  return {
    points,
    setPoints,
    elapsedTime,
    gameState,
    circles,
    currentTarget,
    isAutoPlay,
    startGame,
    restartGame,
    handleCircleClick,
    toggleAutoPlay,
  };
}
