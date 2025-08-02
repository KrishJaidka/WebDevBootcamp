import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = (userData) => {
        const user = {
            name: userData.name,
            email: userData.email,
            authType: 'login'
        };
        setUser(user);
    };
    
    const logout = () => {
        setUser(null);
    };
    
    const signup = (userData) => {
        const user = {
            name: userData.name,
            email: userData.email,
            authType: 'signup'
        };
        
        setUser(user);
    };
    
    const value = {
        user,
        login,
        logout,
        signup,
        isAuthenticated: !!user
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider , useAuth };