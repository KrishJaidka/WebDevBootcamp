import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true, requireAuthor = false }) => {
    const { isAuthenticated, isAuthor, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '50vh',
                fontSize: '1.125rem',
                color: '#6b7280'
            }}>
                Loading...
            </div>
        );
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If user is authenticated but trying to access auth pages
    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/explore" replace />;
    }

    // If author role is required but user is not an author
    if (requireAuthor && !isAuthor) {
        return <Navigate to="/explore" replace />;
    }

    return children;
};

export default ProtectedRoute;
