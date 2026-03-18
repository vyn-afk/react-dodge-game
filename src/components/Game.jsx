/**
 * Game.jsx
 * ------------
 * Main game container.
 * Responsible for:
 * - Rendering game board
 * - Containing player and obstacles
 * - Managing overall layout
 * - Continuous movement via animation loop
 * - Obstacle spawning
 * - Obstacle movement
 * - Cleanup of off-screen obstacles
 */

import { useState, useRef, useEffect } from "react";
import Player from "./Player";
import Obstacle from "./Obstacle";

function Game() {
  // Horizontal position of player (in pixels)
  const [playerX, setPlayerX] = useState(176);
  // 400px width - 48px player ≈ center start

  const [obstacles, setObstacles] = useState([]);

  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 600;
  const PLAYER_WIDTH = 48;

  const MOVE_SPEED = 5;
  const OBSTACLE_SPEED = 4;
  
  // Tracks which keys are currently pressed
  const keysPressed = useRef({});
  const obstacleId = useRef(0);

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
    let lastSpawnTime = 0;

    /**
     * Game loop for continuous movement.
     * Runs on every animation frame.
     */
    const gameLoop = (time) => {
      // PLAYER MOVEMENT
      setPlayerX((prev) => {
        let newX = prev;

        if (keysPressed.current["ArrowLeft"]) newX -= MOVE_SPEED;
        if (keysPressed.current["ArrowRight"]) newX += MOVE_SPEED;

        // Boundary enforcement
        newX = Math.max(0, Math.min(newX, GAME_WIDTH - PLAYER_WIDTH));

        return newX;
      });

      // SPAWN OBSTACLES (every ~800ms)
      if (time - lastSpawnTime > 800) {
        lastSpawnTime = time;

        setObstacles((prev) => [
          ...prev,
          {
            id: obstacleId.current++,
            x: Math.random() * (GAME_WIDTH - 40),
            y: 0,
          },
        ]);
      }
      // MOVE OBSTACLES
      setObstacles((prev) =>
        prev.map((obs) => ({
          ...obs,
          y: obs.y + OBSTACLE_SPEED,
        }))
      );

      // REMOVE OFF-SCREEN OBSTACLES
      setObstacles((prev) =>
        prev.filter((obs) => obs.y < GAME_HEIGHT)
      );

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

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

      {obstacles.map((obs) => (
        <Obstacle key={obs.id} x={obs.x} y={obs.y} />
      ))}
    </div>
  );
}

export default Game;