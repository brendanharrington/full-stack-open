import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from './App.jsx';
import Home from './components/Home.jsx';
import Blogs from './components/Blogs.jsx';
import Authors from './components/Authors.jsx';
import Blog from './components/Blog.jsx';
import BlogForm from './components/BlogForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import Profile from './components/Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path='authors' element={<Authors />} />
          <Route path="new" element={<BlogForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="blogs/:id" element={<Blog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
