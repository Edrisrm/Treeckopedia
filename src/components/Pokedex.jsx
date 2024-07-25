import React, { useEffect, useState } from "react";
import PokeballIcon from "./svg/pokeballIcon";
import Cards from "./Cards/Card";
import { Pagination } from "flowbite-react";
import pikachuImage from "../assets/cring_pikachu.gif";
import { getPokemons, getAllPokemon } from "../utils/apiPokemonV2";
import { Spinner } from "reactstrap";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");
  const [offset, setOffset] = useState(0); // Inicializa en 1 para la primera página
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const pageCount = Math.ceil(total / limit);
  useEffect(() => {
    fetchPokemons(offset);
  }, [offset]);

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const fetchPokemons = async (o) => {
    try {
      const result = await getPokemons(limit, o); 
      setPokemons(result.results);
      console.log(pokemons)
      setList(result.results);
      setTotal(result.count);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllPokemon = async () => {
    try {
      const result = await getAllPokemon();
      setAllPokemon(result.results);
    } catch (error) {
      console.error("Error fetching all pokemons:", error);
    }
  };

  const search = async (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (filter.trim().toLowerCase() !== "") {
      setList(allPokemon.filter((p) => p.name.includes(filter.toLowerCase())));
    } else {
      setList(pokemons);
    }
  };

  const goPage = async (page) => {
    const newOffset = (page - 1) * limit;
    setOffset(newOffset);
  };


  return (
    <div>
      <div className="flex items-center max-w-xl mx-auto">
        <div className="relative w-full mt-20">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <PokeballIcon
              text="text-purple-600"
              darkMode="dark:text-purple-500"
            />
          </div>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyUpCapture={search}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search pokemon..."
            name="pokemonName"
          />
        </div>
        <button
          name="search"
          type="button"
          onClick={handleSearch}
          className="mt-20 p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        </button>
      </div>
      <div className="flex overflow-x-auto justify-center pt-3 space-x-2">
      <Pagination
          layout="pagination"
          currentPage={Math.floor(offset / limit) + 1} 
          totalPages={pageCount}
          onPageChange={(page) => goPage(page)}
          showIcons
        />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="flex justify-center items-center col-span-full mt-20 mb-20">
            <Spinner />
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col justify-center items-center col-span-full mt-20 mb-20">
            <img
              src={pikachuImage}
              alt="No match found"
              className="h-64 w-64"
            />
          </div>
        ) : (
          list.map((pok, i) => <Cards poke={pok} key={i} />)
        )}
      </div>
      <div className="flex overflow-x-auto sm:justify-center pb-56">
      <Pagination
          layout="pagination"
          currentPage={Math.floor(offset / limit) + 1}r
          totalPages={pageCount}
          onPageChange={(page) => goPage(page)}
          showIcons
        />

      </div>
    </div>
  );
};

export default Pokedex;
