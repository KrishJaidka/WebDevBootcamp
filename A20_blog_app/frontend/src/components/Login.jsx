import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = new URL('http://127.0.0.1:3000/api/user/validation');
            url.searchParams.append('email', formData.email);
            url.searchParams.append('password', formData.password);

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                login(data.user);
                navigate('/explore');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '50px auto', 
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
        }}>
            <h2 style={{ marginBottom: '30px', color: '#333', fontSize: '2rem' }}>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{ 
                        color: '#dc3545', 
                        backgroundColor: '#f8d7da',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid #f5c6cb'
                    }}>
                        {error}
                    </div>
                )}
                
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none',
                            boxSizing: 'border-box',
                            margin: 0
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none',
                            boxSizing: 'border-box',
                            margin: 0
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '15px', 
                        backgroundColor: loading ? '#ccc' : '#007bff', 
                        color: 'white', 
                        border: 'none',
                        borderRadius: '8px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.target.style.backgroundColor = '#0056b3';
                            e.target.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '25px', color: '#666' }}>
                Don't have an account? <Link to="/signup" style={{ color: '#007bff', fontWeight: '500', textDecoration: 'none' }}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
