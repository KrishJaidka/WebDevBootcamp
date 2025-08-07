import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div style={{ textAlign: 'center', padding: '50px 20px', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>Welcome to BlogApp</h1>
            <p style={{ marginBottom: '40px', fontSize: '1.2rem', color: '#666' }}>A simple platform to read and write blogs</p>
            
            {!isAuthenticated ? (
                <div>
                    <Link 
                        to="/signup" 
                        style={{ 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            padding: '15px 30px', 
                            textDecoration: 'none',
                            marginRight: '15px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'inline-block',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Get Started
                    </Link>
                    <Link 
                        to="/login" 
                        style={{ 
                            backgroundColor: '#6c757d', 
                            color: 'white', 
                            padding: '15px 30px', 
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'inline-block',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Login
                    </Link>
                </div>
            ) : (
                <div>
                    <Link 
                        to="/explore" 
                        style={{ 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            padding: '15px 30px', 
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'inline-block',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Explore Blogs
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
