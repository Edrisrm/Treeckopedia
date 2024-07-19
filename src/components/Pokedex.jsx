import React, { useEffect, useState } from "react";
import PokeballIcon from "./svg/pokeballIcon";
import Cards from "./Cards/Card";
import { Pagination } from "flowbite-react";
import pikachuImage from '../assets/cring_pikachu.gif';
import { getPokemons, getAllPokemon } from '../utils/apiPokemonV2';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchPokemons(offset);
    fetchAllPokemon();
  }, []);

  const fetchPokemons = async (o) => {
    try {
      const result = await getPokemons(limit, o);
      setPokemons(result.results);
      setList(result.results);
      setTotal(result.count);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
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
      if (filter.trim().toLowerCase() !== "") {
        setList([]);
        setTimeout(() => {
          setList(allPokemon.filter((p) => p.name.includes(filter.toLowerCase())));
        }, 100);
      }
    } else if (filter.trim().toLowerCase() === "") {
      setList([]);
      setTimeout(() => {
        setList(pokemons);
      }, 100);
    }
  };

  const goPage = async (p) => {
    setList([]);
    await fetchPokemons((p === 1) ? 0 : ((p - 1) * 20));
    setOffset(p);
  };

  const pageCount = Math.ceil(total / limit);

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
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            onKeyUpCapture={search}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search pokemon..."
            name="pokemonName"
          />
        </div>
      </div>
      <div className="flex overflow-x-auto sm:justify-center pt-3">
        <Pagination layout="pagination"
          currentPage={offset}
          totalPages={pageCount}
          onPageChange={page => goPage(page)}
          showIcons 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
        {list.map((pok, i) => (
          <Cards poke={pok} key={i} />
        ))}
        {list.length === 0 ? (
          <div className="flex flex-col justify-center items-center col-span-full mt-20 mb-20">
            <img src={pikachuImage} alt="No match found" className="h-64 w-64" />
          </div>
        ) : '' }
      </div>
      <div className="flex overflow-x-auto sm:justify-center pb-56">
        <Pagination layout="pagination"
          currentPage={offset}
          totalPages={pageCount}
          onPageChange={page => goPage(page)}
          showIcons 
        />
      </div>
    </div>
  );
};

export default Pokedex;
