// src/App.jsx
import { useState } from 'react'
import reactLogo from './assets/images/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#242424] text-white/80 p-8 text-center font-sans">
        <div className="mb-60">
          <h1 className="text-8xl font-bold">
            Welcome to Fixsy
          </h1>
        </div>

        <div className="flex">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img 
              src={viteLogo} 
              className="h-24 p-6 transition-all will-change-[filter] hover:drop-shadow-[0_0_2em_#646cffaa] animate-[ping_2s_linear_infinite]" 
              alt="Vite logo" 
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img 
              src={reactLogo} 
              className="h-24 p-6 transition-all will-change-[filter] hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]" 
              alt="React logo" 
            />
          </a>
        </div>

        <h1 className="text-5xl font-bold leading-tight my-4">Vite + React</h1>

        <div className="p-8 flex flex-col items-center">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="rounded-lg border border-transparent px-5 py-2.5 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors hover:border-[#646cff] focus:outline-4 focus:outline-blue-500"
          >
            count is {count}
          </button>
          <p className="my-4">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="text-[#888]">
          Click on the Vite and React logos to learn more
        </p>

      </div>
    </div>
  )
}

export default App