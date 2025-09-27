import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NewsSection from "./pages/News";
import { ToastContainer } from "react-toastify";
import Notice from "./pages/Notice";
import Blog from "./pages/Blog";
import Clubs from "./pages/Club";
import SingleBlog from "./pages/SingleBlog";
import ErrorBoundary from "./component/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/notices" element={<Notice />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/club" element={<Clubs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
