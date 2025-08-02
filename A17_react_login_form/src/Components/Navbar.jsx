import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useModal from '../hooks/useModal'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { openModal } = useModal();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        console.log('User logged out');
        navigate('/');
    };

  return (
    <div className='navbar'>
        <h2 className="brand-name">BRAND NAME</h2>
        <div className='nav-links'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About us</NavLink>
        
        {isAuthenticated ? (
            <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <button type='button' onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <>
                <button type='button' onClick={()=>openModal('login')}>Log in</button>
                <button type='button' onClick={()=>openModal('signup')}>Sign up</button>
            </>
        )}
        </div>
    </div>
  )
}

export default Navbar