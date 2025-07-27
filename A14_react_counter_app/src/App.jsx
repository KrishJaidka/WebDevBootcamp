import { useState } from 'react'
import './App.css'
import Display from './components/Display.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>React Counter App</h1>
        <Display count={count} />
        <div className='btn-div'>
        <button onClick={() => setCount((count) => count + 1)}>
          +
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          -
        </button>
        </div>
    </>
  )
}

export default App
