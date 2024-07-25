import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Home from './components/home.jsx';
import Footer from './components/layout/Footer.jsx';
import Pokedex from './components/Pokedex.jsx';
import DetailPokemon from './components/PokemonDetail/DetailPokemon.jsx';
import PokeQuiz from './components/games/PokeQuiz.jsx';

function App() {
  useEffect(() => {
    document.title = "Treeckopedia";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Search for any Pokémon you want and know its main data, such as Skills, types and their habits.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Search for any Pokémon you want and know its main data, such as Skills, types and their habits.";
      document.head.appendChild(meta);
    }
  }, []);

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
