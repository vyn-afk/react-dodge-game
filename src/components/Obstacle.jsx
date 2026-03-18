/**
 * Obstacle.jsx
 * ----------------
 * Represents a falling obstacle block.
 */

function Obstacle({ x, y }) {
  return (
    <div
      className="absolute w-10 h-10 bg-red-500"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );
}

export default Obstacle;