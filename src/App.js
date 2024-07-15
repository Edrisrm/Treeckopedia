import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Home from './components/home.jsx';
import Footer from './components/layout/Footer.jsx';
import Pokedex from './components/Pokedex.jsx';


function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <div className='bg-gray-900  min-h-screen'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/pokedex' element={<Pokedex />} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
