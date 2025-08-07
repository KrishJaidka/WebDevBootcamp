import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/blog/viewBlogs');
                const data = await response.json();
                
                if (data.success) {
                    setBlogs(data.blogs);
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

        fetchBlogs();
    }, []);

    const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`);
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading blogs...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ marginBottom: '30px', color: '#333', fontSize: '2.5rem' }}>Explore All Blogs</h1>
            
            {blogs.length === 0 ? (
                <p>No blogs found</p>
            ) : (
                <div>
                    {blogs.map((blog) => (
                        <div 
                            key={blog._id}
                            onClick={() => handleBlogClick(blog._id)}
                            style={{ 
                                border: '1px solid #e0e0e0', 
                                padding: '20px', 
                                marginBottom: '20px', 
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s ease-in-out'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            {blog.coverImg && (
                                <img 
                                    src={blog.coverImg} 
                                    alt={blog.title}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
                                />
                            )}
                            <h3 style={{ margin: '15px 0 10px 0', color: '#333', fontSize: '1.5rem' }}>{blog.title}</h3>
                            <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>By {blog.author}</p>
                            <p style={{ color: '#555', lineHeight: '1.6' }}>{blog.content.substring(0, 150)}...</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;
