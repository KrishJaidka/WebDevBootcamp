import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/blog/viewBlogs');
                const data = await response.json();
                
                if (data.success) {
                    const myBlogs = data.blogs.filter(blog => blog.author === user.name);
                    setBlogs(myBlogs);
                } else {
                    setError(data.message || 'Failed to fetch blogs');
                }
            } catch (err) {
                setError('Network error. Please try again.');
                console.error('Fetch blogs error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMyBlogs();
        }
    }, [user]);

    const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`);
    };

    const handleDeleteBlog = async (blogId, e) => {
        e.stopPropagation();
        
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/blog/remove?id=${blogId}`, {
                    method: 'DELETE'
                });
                
                const data = await response.json();
                
                if (data.success) {
                    setBlogs(blogs.filter(blog => blog._id !== blogId));
                } else {
                    alert(data.message || 'Failed to delete blog');
                }
            } catch (err) {
                alert('Network error. Please try again.');
                console.error('Delete blog error:', err);
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading your blogs...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: '#333', fontSize: '2.5rem' }}>My Blogs</h1>
                <button 
                    onClick={() => navigate('/create-blog')}
                    style={{ 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        padding: '12px 24px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    + Create New Blog
                </button>
            </div>
            
            {blogs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <p>You haven't created any blogs yet</p>
                    <button 
                        onClick={() => navigate('/create-blog')}
                        style={{ 
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            padding: '15px 30px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#218838';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#28a745';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Create Your First Blog
                    </button>
                </div>
            ) : (
                <div>
                    {blogs.map((blog) => (
                        <div 
                            key={blog._id}
                            style={{ 
                                border: '1px solid #e0e0e0', 
                                padding: '20px', 
                                marginBottom: '15px', 
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s ease-in-out',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={(e) => handleDeleteBlog(blog._id, e)}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    zIndex: 1
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#c82333';
                                    e.target.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#dc3545';
                                    e.target.style.transform = 'scale(1)';
                                }}
                                title="Delete blog"
                            >
                                ×
                            </button>
                            
                            <div 
                                onClick={() => handleBlogClick(blog._id)}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={(e) => e.currentTarget.parentElement.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.parentElement.style.transform = 'translateY(0)'}
                            >
                                {blog.coverImg && (
                                    <img 
                                        src={blog.coverImg} 
                                        alt={blog.title}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
                                    />
                                )}
                                <h3 style={{ margin: '15px 0 10px 0', color: '#333', fontSize: '1.5rem', paddingRight: '40px' }}>{blog.title}</h3>
                                <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>By {blog.author}</p>
                                <p style={{ color: '#555', lineHeight: '1.6' }}>{blog.content.substring(0, 150)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBlogs;
