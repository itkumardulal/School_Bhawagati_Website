import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import News from './component/News';
import NewsSection from './pages/News';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path='/contact' element= {<Contact/>} />
        <Route path='/gallery' element= {<Gallery/>} />
        <Route path='/notices' element={<NewsSection/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
