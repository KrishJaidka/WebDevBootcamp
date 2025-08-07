import React from 'react';
import './BlogCard.css';

const BlogCard = ({ blog, onClick }) => {
    const defaultImage = 'https://via.placeholder.com/400x200/667eea/ffffff?text=Blog+Image';
    
    // Function to truncate content
    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="blog-card" onClick={onClick}>
            <div className="blog-card-image">
                <img 
                    src={blog.coverImg || defaultImage} 
                    alt={blog.title}
                    onError={(e) => {
                        e.target.src = defaultImage;
                    }}
                />
            </div>
            
            <div className="blog-card-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-author">By {blog.author}</p>
                <p className="blog-excerpt">
                    {truncateText(blog.content)}
                </p>
                <div className="blog-card-footer">
                    <span className="read-more">Read More →</span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
