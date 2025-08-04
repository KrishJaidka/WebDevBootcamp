/* eslint-disable no-unused-vars */
import './App.css'
import { useTheme } from './contexts/ThemeContext'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useState } from 'react';

function App() {
  const { darkTheme } = useTheme();
  const darkMode = (darkTheme ? "dark" : "");

  const [ isCartOpen, setIsCartOpen ] = useState(false)

  const toggleCartDiv = () => setIsCartOpen(cartState => !cartState)

  return (
    <>
      <div className={`main ${darkMode}`} >
        <Navbar toggleCartDiv={toggleCartDiv} />
      <Routes>
        <Route path='/' element={<Home isCartOpen={isCartOpen} toggleCartDiv={toggleCartDiv} />}/>
      </Routes>
      </div>
    </>
  )
}

export default App
