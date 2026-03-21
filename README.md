# 🎮 Dodge Game (React + Vite)

## 🧩 Overview

A minimal dodge game built using **React**, focusing on real-time game loop logic, collision detection, and state management.

The player controls a block that moves horizontally to avoid falling obstacles. The game tracks score based on successfully dodged obstacles.

---

## ✨ Features

* Continuous player movement using `requestAnimationFrame`
* Obstacle spawning system with controlled intervals
* Collision detection using axis-based rectangle overlap (AABB)
* Score system based on dodged obstacles
* Restart functionality
* Clean and modular component structure

---

## 🛠 Tech Stack

* React (Vite)
* TailwindCSS
* JavaScript (ES2023+)

---

## 🧠 Architecture

### Game Loop

* Implemented using `requestAnimationFrame`
* Runs continuously (~60 FPS)
* Handles:

  * Player movement
  * Obstacle spawning
  * Obstacle updates
  * Collision detection

### State Management

* `useState` → manages reactive game state (player position, obstacles, score, game over)
* `useRef` → stores mutable values that persist across frames (key presses, loop control, IDs)

### Collision Detection

* Uses **Axis-Aligned Bounding Box (AABB)** technique
* Checks overlap on both X and Y axes

---

## 🎯 Game Mechanics

* Player moves left/right using arrow keys
* Obstacles spawn from the top and fall downward
* Collision ends the game
* Score increases when obstacles are successfully dodged

---

## 📚 Learning Highlights

* Understanding real-time systems inside React
* Managing continuous updates with `requestAnimationFrame`
* Handling React Strict Mode double execution
* Avoiding state update pitfalls in loops
* Using `useRef` for persistent mutable values
* Separating simulation logic from rendering

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

## 📁 Project Structure

```
src/
 ├── components/
 │    ├── Game.jsx
 │    ├── Player.jsx
 │    ├── Obstacle.jsx
 │
 ├── utils/
 │    ├── collision.js
 │
 ├── App.jsx
 └── main.jsx
```

---

## 🔀 Git Workflow

* `main` → production-ready code
* `develop` → integration branch
* `feat/*` → feature branches
* `chore/*` → cleanup and documentation

Workflow:

1. Create feature branch from `develop`
2. Implement feature
3. Open Pull Request → `develop`
4. Merge after review
5. Final merge → `main`

---

## 🧪 Future Improvements

* Add difficulty scaling (increase speed over time)
* Add sound effects
* Add mobile controls
* Refactor game loop into custom hook

---

## 🙌 Acknowledgment

This project was built as part of a structured learning approach focusing on mastering both **React internals** and **professional development workflows**.
