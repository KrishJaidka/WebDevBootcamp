import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/blog/getBlog?id=${id}`);
                const data = await response.json();
                
                if (data.success) {
                    setBlog(data.blog);
                } else {
                    setError(data.message || 'Blog not found');
                }
            } catch (err) {
                setError('Network error. Please try again.');
                console.error('Fetch blog error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading blog...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <button 
                onClick={() => navigate('/explore')}
                style={{ 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 15px',
                    marginBottom: '20px',
                    cursor: 'pointer'
                }}
            >
                ← Back to Explore
            </button>
            
            <article>
                <h1>{blog.title}</h1>
                <p style={{ color: '#666', marginBottom: '20px' }}>By {blog.author}</p>

                {blog.coverImg && (
                    <img 
                        src={blog.coverImg} 
                        alt={blog.title}
                        style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '20px' }}
                    />
                )}

                <div style={{ lineHeight: '1.6' }}>
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: '15px' }}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
