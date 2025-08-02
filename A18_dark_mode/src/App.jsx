/* eslint-disable no-unused-vars */
import './App.css'
import { useTheme } from './contexts/ThemeContext'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const { darkTheme } = useTheme();
  const darkMode = (darkTheme ? "dark" : "");

  return (
    <>
      <div className={`main ${darkMode}`} >
        <Navbar />
      
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
