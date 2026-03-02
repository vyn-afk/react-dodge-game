/**
 * Player.jsx
 * ---------------
 * Represents the controllable player block.
 * Receives horizontal position as prop.
 */

function Player({ x }) {
  return (
    <div
      className="absolute bottom-4 w-12 h-12 bg-white"
      style={{ left: `${x}px` }}
    />
  );
}

export default Player;