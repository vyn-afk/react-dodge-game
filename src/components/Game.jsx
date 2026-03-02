/**
 * Game.jsx
 * ------------
 * Main game container.
 * Responsible for:
 * - Rendering game board
 * - Containing player and obstacles
 * - Managing overall layout
 */

import { useState, useEffect } from "react";
import Player from "./Player";

function Game() {
  // Horizontal position of player (in pixels)
  const [playerX, setPlayerX] = useState(176);
  // 400px width - 48px player ≈ center start

  const GAME_WIDTH = 400;
  const PLAYER_WIDTH = 48;
  const MOVE_AMOUNT = 20;

  useEffect(() => {
    /**
    * Handles left/right arrow key movement.
    * Ensures player stays within game boundaries.
    */
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setPlayerX((prev) => Math.max(prev - MOVE_AMOUNT, 0));
      } 
      if (e.key === "ArrowRight") {
        setPlayerX((prev) =>
          Math.min(prev + MOVE_AMOUNT, GAME_WIDTH - PLAYER_WIDTH)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-100 h-150 border border-gray-700 overflow-hidden">
      <Player x={playerX} />
    </div>
  );
}

export default Game;