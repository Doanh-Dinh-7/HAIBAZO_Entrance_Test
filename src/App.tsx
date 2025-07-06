import { RotateCcw, Play, Pause } from "lucide-react";
import CircleButton from "./components/CircleButton";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const {
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
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold mb-2
              ${
                gameState === "completed"
                  ? "text-green-600"
                  : gameState === "failed"
                  ? "text-red-600"
                  : "text-black"
              }
            `}
          >
            {gameState === "completed"
              ? "ALL CLEARED"
              : gameState === "failed"
              ? "GAME OVER"
              : "LET'S PLAY"}
          </h1>
          <div className="text-lg text-gray-700 space-y-1">
            <div className="flex items-center gap-8 justify-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Points:</span>
                <input
                  type="number"
                  min="5"
                  max="20"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  disabled={gameState === "playing"}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center disabled:bg-gray-100"
                />
              </div>
              <div className="text-xl font-bold text-blue-600">
                Time: {elapsedTime.toFixed(1)}s
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          {gameState === "idle" ? (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Play size={20} />
              Start Game
            </button>
          ) : (
            <>
              <button
                onClick={restartGame}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <RotateCcw size={20} />
                Restart
              </button>
              {gameState === "playing" && (
                <button
                  onClick={toggleAutoPlay}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${
                    isAutoPlay
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
                  {isAutoPlay ? "Stop Auto" : "Auto Play"}
                </button>
              )}
            </>
          )}
        </div>

        {/* Game Area */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <div
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 mx-auto"
            style={{ width: "600px", height: "400px" }}
          >
            {circles.map((circle) => (
              <CircleButton
                key={circle.id}
                circle={circle}
                currentTarget={currentTarget}
                gameState={gameState}
                isAutoPlay={isAutoPlay}
                handleCircleClick={handleCircleClick}
                zIndex={points - circle.id + 1}
              />
            ))}
            {circles.length === 0 && gameState === "idle" && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                Click "Start Game" to begin
              </div>
            )}
          </div>
        </div>

        {/* Game Status */}
        {gameState === "playing" && (
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-indigo-700">
              Next:{" "}
              <span className="text-2xl text-indigo-900">{currentTarget}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
