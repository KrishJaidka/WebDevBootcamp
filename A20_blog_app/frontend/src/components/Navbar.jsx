import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAuthor } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{ 
            backgroundColor: '#333', 
            color: 'white', 
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
                BlogApp
            </Link>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/explore" style={{ color: 'white', textDecoration: 'none' }}>Explore</Link>
                        {isAuthor && (
                            <Link to="/my-blogs" style={{ color: 'white', textDecoration: 'none' }}>My Blogs</Link>
                        )}
                        <span style={{ fontSize: '14px' }}>Hi, {user.name}</span>
                        <button 
                            onClick={handleLogout}
                            style={{ 
                                backgroundColor: '#dc3545', 
                                color: 'white', 
                                border: 'none', 
                                padding: '8px 16px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#c82333';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#dc3545';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
