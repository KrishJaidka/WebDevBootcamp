import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
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
            const response = await fetch('http://127.0.0.1:3000/api/user/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                login(data.user);
                navigate('/explore');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Signup error:', err);
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
            <h2 style={{ marginBottom: '30px', color: '#333', fontSize: '2rem' }}>Sign Up</h2>
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
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
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

                <div style={{ marginBottom: '20px' }}>
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

                <div style={{ marginBottom: '25px' }}>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: 'white',
                            transition: 'border-color 0.3s ease',
                            outline: 'none',
                            boxSizing: 'border-box',
                            margin: 0,
                            color: formData.role ? '#333' : '#999'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    >
                        <option value="user">User</option>
                        <option value="author">Author</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '15px', 
                        backgroundColor: loading ? '#ccc' : '#28a745', 
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
                            e.target.style.backgroundColor = '#218838';
                            e.target.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.target.style.backgroundColor = '#28a745';
                            e.target.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '25px', color: '#666' }}>
                Already have an account? <Link to="/login" style={{ color: '#007bff', fontWeight: '500', textDecoration: 'none' }}>Login</Link>
            </p>
        </div>
    );
};

export default Signup;
