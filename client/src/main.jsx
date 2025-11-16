import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from './App.jsx';
import Home from './components/Home.jsx';
import Blogs from './components/Blogs.jsx';
import Blog from './components/Blog.jsx';
import BlogForm from './components/BlogForm.jsx';
import LoginForm from './components/LoginForm.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="new" element={<BlogForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="blogs/:id" element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
