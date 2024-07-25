import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Home from './components/home.jsx';
import Footer from './components/layout/Footer.jsx';
import Pokedex from './components/Pokedex.jsx';
import DetailPokemon from './components/PokemonDetail/DetailPokemon.jsx';
import PokeQuiz from './components/games/PokeQuiz.jsx';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] min-h-screen '>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='/pokemon/:name' element={<DetailPokemon />} />
            <Route path='/minigames' element={<PokeQuiz />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
