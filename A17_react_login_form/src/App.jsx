// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import About from './pages/About';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom';
import useModal from './hooks/useModal';
import { AuthProvider } from './context/AuthContext';

function App() {
    const location = useLocation();
    const { isModal, backgroundLocation } = useModal();
    

  return (
    <AuthProvider>
    <Navbar/>
    <Routes location={isModal ? backgroundLocation : location}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/> 
    </Routes>

    {/* Modal overlay */}
    {isModal && (
        <Routes>
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      )}
    </AuthProvider>
  )
}

export default App
