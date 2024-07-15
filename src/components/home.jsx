import React, { useState } from "react";
import FlexCard from "./FlexCard/FlexCard";
import SearchPokemon from "./SearchPokemon/SearchPokemon";
import PokeballIcon from "./svg/pokeballIcon";

const Home = () => {
  const [pokemonData, setPokemonData] = useState(null);

  const handleSearch = (data) => {
    setPokemonData(data);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
              Search any Pokemon
            </h1>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
              Search for any pokemon you want and learn its main data, such as
              abilities, types and its habits
            </p>
            <PokeballIcon text={`text-red-600`} darkMode={`dark:text-red-500`} />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                Pokedex
              </h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                You can see all the pokemon registered in the pokedex from
                number 1 to the last
              </p>
              <PokeballIcon text={`text-blue-600`} darkMode={`dark:text-blue-500`} />
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                Games
              </h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                Play mini-games about the interesting facts about each Pokemon,
                polish your knowledge about all these fantastic creatures
              </p>
              <PokeballIcon text={`text-yellow-600`} darkMode={`dark:text-yellow-500`} />
            </div>
          </div>
        </div>
      </section>
      <SearchPokemon onSearch={handleSearch} />
      <FlexCard data={pokemonData} />
    </>
  );
};

export default Home;
