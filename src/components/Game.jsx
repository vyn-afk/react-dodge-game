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
import { isColliding } from "../utils/collision";

function Game() {
  // Horizontal position of player (in pixels)
  const [playerX, setPlayerX] = useState(176);
  // 400px width - 48px player ≈ center start

  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 600;
  const  PLAYER = {
    width: 48,
    height: 48,
    y: 600 - 64, // bottom offset (~bottom-4)
  };

  const OBSTACLE_SIZE = 40;

  const MOVE_SPEED = 5;
  const OBSTACLE_SPEED = 8;
  
  // Tracks which keys are currently pressed
  const keysPressed = useRef({});
  const playerXRef = useRef(playerX);
  // Unique ID generator for obstacles to ensure stable keys in React lists
  const obstacleId = useRef(0);

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  useEffect(() => {
    if (gameOver) return; // stop loop when game ends

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

    // Timestamp of last obstacle spawn to control spawn rate
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
        newX = Math.max(0, Math.min(newX, GAME_WIDTH - PLAYER.width));

        return newX;
      });

      // SPAWN OBSTACLES (every ~500ms)
      if (time - lastSpawnTime > 500) {
        lastSpawnTime = time;

        /* 
         * New obstacle with unique ID and random horizontal position.
         * Starts at y=0 (top of the game area).
        */
        setObstacles((prev) => [
          ...prev,
          {
            id: obstacleId.current++,
            x: Math.random() * (GAME_WIDTH - OBSTACLE_SIZE),
            y: 0,
          },
        ]);
      }

      /* 
       * MOVE OBSTACLES + COLLISION CHECK + CLEANUP
        * Each obstacle's y position is increased by OBSTACLE_SPEED to create falling effect.
      */
      setObstacles((prev) => {
        const updated = [];

        for (let obs of prev) {
          const newY = obs.y + OBSTACLE_SPEED;

          const playerRect = {
            x: playerXRef.current,
            y: PLAYER.y,
            width: PLAYER.width,
            height: PLAYER.height,
          };

          const obstacleRect = {
            x: obs.x,
            y: newY,
            width: OBSTACLE_SIZE,
            height: OBSTACLE_SIZE,
          };

          // COLLSION CHECK
          if (isColliding(playerRect, obstacleRect)) {
            setGameOver(true);
            return prev; // stop updating obstacles on collision
          }

          /* 
           * Only keep obstacles that are still within the game area.
           * This prevents memory bloat from off-screen obstacles.
           * Obstacles are removed once their top edge goes below the bottom of the game area.
           * (i.e., newY < GAME_HEIGHT means the obstacle is still visible).
           * This ensures that obstacles are cleaned up once they fall off-screen, maintaining performance.
           * Obstacles that have moved beyond the bottom edge of the game area are discarded and not rendered.
           * This is crucial for preventing memory leaks and ensuring smooth gameplay as more obstacles are spawned over time.
           * By only keeping active obstacles in the state, we optimize rendering and resource usage.
           * This cleanup mechanism is essential for a game with continuous spawning of entities to maintain performance and prevent slowdowns.
          */
          if (newY < GAME_HEIGHT) {
            updated.push({ ...obs, y: newY });
          } else {
            // Increment score for each obstacle that successfully falls off-screen
            setScore((prev) => prev + 1);
          }
        }

        return updated;
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    // Cleanup listener on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  return (
    <div className="relative w-100 h-150 border border-gray-700 overflow-hidden">
      <Player x={playerX} />

      {obstacles.map((obs) => (
        <Obstacle key={obs.id} x={obs.x} y={obs.y} />
      ))}

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-xl">
          Game Over
        </div>
      )}

      <div className="absolute top-2 left-2 text-sm text-gray-300">
        Score: {score}
      </div> 
    </div>
  );
}

export default Game;