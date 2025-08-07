import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Explore from './components/Explore';
import BlogDetail from './components/BlogDetail';
import MyBlogs from './components/MyBlogs';
import CreateBlog from './components/CreateBlog';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Signup />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/explore" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <Explore />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/blog/:id" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <BlogDetail />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/my-blogs" 
              element={
                <ProtectedRoute requireAuth={true} requireAuthor={true}>
                  <MyBlogs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-blog" 
              element={
                <ProtectedRoute requireAuth={true} requireAuthor={true}>
                  <CreateBlog />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
