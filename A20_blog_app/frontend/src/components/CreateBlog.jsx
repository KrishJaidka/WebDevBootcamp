import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        coverImg: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'coverImg') {
            setFormData({
                ...formData,
                coverImg: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('author', user.name);
            
            if (formData.coverImg) {
                formDataToSend.append('coverImg', formData.coverImg);
            }

            const response = await fetch('http://127.0.0.1:3000/api/blog/add', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                navigate('/my-blogs');
            } else {
                setError(data.message || 'Failed to create blog');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Create blog error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            maxWidth: '600px', 
            margin: '20px auto', 
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
            <div style={{ marginBottom: '25px' }}>
                <button 
                    onClick={() => navigate('/my-blogs')}
                    style={{ 
                        backgroundColor: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#5a6268';
                        e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#6c757d';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    ← Back to My Blogs
                </button>
            </div>

            <h2 style={{ marginBottom: '20px', color: '#333' }}>Create New Blog</h2>
            
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{ 
                        color: '#dc3545', 
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        border: '1px solid #f5c6cb'
                    }}>
                        {error}
                    </div>
                )}
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Blog Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter your blog title"
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Cover Image (Optional):
                    </label>
                    <input
                        type="file"
                        name="coverImg"
                        onChange={handleChange}
                        accept="image/*"
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    <small style={{ color: '#666' }}>Supported formats: JPG, JPEG, PNG</small>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Blog Content:
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        placeholder="Write your blog content here..."
                        rows="15"
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            resize: 'vertical',
                            transition: 'border-color 0.3s ease',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            flex: 1,
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
                        {loading ? 'Creating Blog...' : 'Create Blog'}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/my-blogs')}
                        style={{ 
                            padding: '15px 25px', 
                            backgroundColor: '#6c757d', 
                            color: 'white', 
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#5a6268';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#6c757d';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
