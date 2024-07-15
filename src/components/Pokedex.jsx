import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PokeballIcon from './svg/pokeballIcon';
import FlexCard from './FlexCard/FlexCard';
import Cards from './Cards/Card';
import { Pagination } from 'flowbite-react';

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('');
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [total, setTotal] = useState(0);

    useEffect(() =>{
        getPokemons(offset)
        getAllPokemon()
    }, [])

    const getPokemons = async(offset_) =>{
        const listPokemon = `https://pokeapi.co/api/v2/pokemon?${limit}=100000&offset`+offset_;
        axios.get(listPokemon).then(async(response) =>{
            const result = response.data;
            setPokemons(result.results);
            setList(result.results)
        })
    }
    const getAllPokemon = async () =>{
        const list = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
        axios.get(list).then(async (response)=>{
            const result = response.data;
            setAllPokemon(result.results)
        })
    }
    const search = async(e) => {
        
        if (e.keyCode == 13) {
            if (filter.trim() != '') {
                setList([])
                setTimeout(() =>{
                    setList(allPokemon.filter(p => p.name.includes(filter)))
                }, 100)
            }
        }else if(filter.trim() == ''){
            setList([]);
            setTimeout(() => {
                setList(pokemons);
            }, 100)
        }
    }
  return (
    <div >
      <div>
      <div  className="flex items-center max-w-xl mx-auto">
        <div className="relative w-full mt-20">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <PokeballIcon
              text={`text-purple-600`}
              darkMode={`dark:text-purple-500`}
            />
          </div>
          <input
            value={filter}
            onChange={(e) => {setFilter(e.target.value)}}
            onKeyUpCapture={search}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search pokemon..."
            name="pokemonName"
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-20"
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
      </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 md:gap-2'>
        {list.map( (pok, i) =>(
            <Cards poke={pok} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Pokedex
