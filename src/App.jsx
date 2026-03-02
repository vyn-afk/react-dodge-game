/**
 * App.jsx
 * ----------
 * Root application component.
 * Renders the main Game container.
 */

import Game from "./components/Game";

function App() {

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Game />
    </div>
  )
}

export default App
