/**
 * Game.jsx
 * ------------
 * Main game container.
 * Responsible for:
 * - Rendering game board
 * - Containing player and obstacles
 * - Managing overall layout
 * - Continuous movement via animation loop
 */

import { useState, useRef, useEffect } from "react";
import Player from "./Player";

function Game() {
  // Horizontal position of player (in pixels)
  const [playerX, setPlayerX] = useState(176);
  // 400px width - 48px player ≈ center start

  const GAME_WIDTH = 400;
  const PLAYER_WIDTH = 48;
  const MOVE_SPEED = 5;
  
  // Tracks which keys are currently pressed
  const keysPressed = useRef({});

  useEffect(() => {
    /**
    * Handles left/right arrow key movement.
    * Ensures player stays within game boundaries.
    */
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let animationFrameId;

    /**
     * Game loop for continuous movement.
     * Runs on every animation frame.
     */
    const gameLoop = () => {
      setPlayerX((prev) => {
        let newX = prev;

        if (keysPressed.current["ArrowLeft"]) {
          newX -= MOVE_SPEED;
        }

        if (keysPressed.current["ArrowRight"]) {
          newX += MOVE_SPEED;
        }

        // Boundary enforcement
        newX = Math.max(0, Math.min(newX, GAME_WIDTH - PLAYER_WIDTH));

        return newX;
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    // Cleanup listener on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="relative w-100 h-150 border border-gray-700 overflow-hidden">
      <Player x={playerX} />
    </div>
  );
}

export default Game;