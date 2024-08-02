import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Home from './components/home.jsx';
import Footer from './components/layout/Footer.jsx';
import Pokedex from './components/Pokedex.jsx';
import DetailPokemon from './components/PokemonDetail/DetailPokemon.jsx';
import PokeQuiz from './components/games/PokeQuiz.jsx';
import ErrorPage from './components/layout/ErrorPage.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokemon/:name' element={<DetailPokemon />} />
          <Route path='/minigames' element={<PokeQuiz />} />
          <Route path='*' element={<ErrorPage />} /> {/* Ruta para la página de error */}
        </Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
