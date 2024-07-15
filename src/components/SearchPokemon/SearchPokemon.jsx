import React from "react";
import PokeballIcon from "../svg/pokeballIcon.jsx";
import { fetchPokemon, fetchPokemonSpecies } from "../../utils/apiPokemon.js";

const SearchPokemon = ({ onSearch }) => {
  const handleSearch = async (event) => {
    event.preventDefault();
    const pokemonName = event.target.elements.pokemonName.value.trim().toLowerCase();

    if (!pokemonName) {
      // Si el nombre está vacío, no hacer nada
      return;
    }

    const formattedName = pokemonName.split(" ").join("-");
    const pokeSearch = await fetchPokemon(formattedName);

    if (!pokeSearch) {
      // Manejar caso de búsqueda fallida
      return;
    }

    let species;
    let pokedexDescription;

    if (pokeSearch.dataAlternative) {
      species = await fetchPokemonSpecies(pokeSearch.dataAlternative.id);
    } else {
      species = await fetchPokemonSpecies(pokeSearch.data.id);
    }

    pokedexDescription = species?.flavor_text_entries?.find(
      (entry) => entry.language.name === "en"
    );

    const pokedex = pokedexDescription
      ? pokedexDescription.flavor_text
      : "No description available.";

    const pokemonData = {
      ...pokeSearch,
      pokedex,
    };

    onSearch(pokemonData);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex items-center max-w-xl mx-auto">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <PokeballIcon
              text={`text-purple-600`}
              darkMode={`dark:text-purple-500`}
            />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search pokemon..."
            name="pokemonName"
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </>
  );
};

export default SearchPokemon;
