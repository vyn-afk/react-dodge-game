/**
 * Game.jsx
 * ------------
 * Main game container.
 * Responsible for:
 * - Rendering game board
 * - Containing player and obstacles
 * - Managing overall layout
 */

import Player from "./Player";

function Game() {
  return (
    <div className="relative w-100 h-150 border border-gray-700 overflow-hidden">
      <Player />
    </div>
  );
}

export default Game;