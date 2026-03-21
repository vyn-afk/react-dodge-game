/**
 * collision.js
 * ----------------
 * Checks if two rectangles overlap in 2D space.
 *
 * Mental Model (How to think about collision):
 * -------------------------------------------
 * Instead of thinking "did they touch?",
 * we break the problem into two axes:
 *
 * 1. X-axis (horizontal overlap)
 * 2. Y-axis (vertical overlap)
 *
 * Each rectangle can be represented as:
 * - left   = x
 * - right  = x + width
 * - top    = y
 * - bottom = y + height
 *
 * Collision happens ONLY when:
 * - Their X ranges overlap (same horizontal space)
 * - Their Y ranges overlap (same vertical space)
 *
 * Important:
 * - We use < and > (not <= or >=)
 *   → This means rectangles must overlap slightly
 *   → Just touching edges is NOT considered a collision
 *
 * Intuition:
 * - X overlap → "Are they in the same column region?"
 * - Y overlap → "Are they at the same height?"
 * - Both true → actual collision
 */

export function isColliding(a, b) {
  return (
    // X-axis overlap check
    // A's left is before B's right AND A's right is after B's left
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&

    // Y-axis overlap check
    // A's top is above B's bottom AND A's bottom is below B's top
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}