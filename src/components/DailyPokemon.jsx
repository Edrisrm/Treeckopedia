import React, { useEffect, useState } from "react";
import {
  fetchPokemonSpecies,
  getAllPokemon,
  getPokemon,
} from "../utils/apiPokemonV2";
import { useTranslation } from "react-i18next";
import { Spinner } from "flowbite-react";
import {
  getColor,
  maxPercentage,
  translateGeneration,
} from "../helpers/constans";
import TableDetailPokemon from "./PokemonDetail/TableDetailPokemon";
import { Link } from "react-router-dom";
import PokeballIcon from "./svg/pokeballIcon";

const DailyPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allPokemon, setAllPokemon] = useState([]);
  const [generation, setGeneration] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const loadAllPokemon = async () => {
      try {
        const allPokemonData = await getAllPokemon();
        setAllPokemon(allPokemonData);
        handleDailyPokemon(allPokemonData);
      } catch (error) {
        console.error("Error loading all Pokémon data:", error);
      }
    };
    loadAllPokemon();
  }, []);

  const handleDailyPokemon = async (allPokemonData) => {
    const { date } = getStoredData();

    if (date !== getTodayDateString()) {
      await getRandomPokemon(allPokemonData);
      localStorage.setItem("lastUpdatedDate", getTodayDateString());
    } else {
      const storedPokemon = JSON.parse(localStorage.getItem("pokemonData"));
      if (storedPokemon) {
        setPokemon(storedPokemon);
        getSpecies(storedPokemon.pokemon.name);
        setIsLoading(false);
      } else {
        await getRandomPokemon(allPokemonData);
      }
    }
  };

  const getRandomPokemon = async (allPokemonData) => {
    const randomIndex = Math.floor(
      Math.random() * allPokemonData.results.length
    );
    const randomPokemon = allPokemonData.results[randomIndex];
    try {
      const result = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`,
        t("pokedexDescription")
      );
      localStorage.setItem("pokemonData", JSON.stringify(result));
      setPokemon(result);
      await getSpecies(randomPokemon.name);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getSpecies = async (pkmName) => {
    try {
      const speciesData = await fetchPokemonSpecies(pkmName);
      console.log("speciesData", speciesData);
      setGeneration(speciesData.generation.name);
    } catch (error) {
      console.error("Error fetching Pokémon species data:", error);
    }
  };
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  const getStoredData = () => {
    const storedDate = localStorage.getItem("lastUpdatedDate");
    return {
      date: storedDate || "",
    };
  };
  const getStatsAttributes = (stats) => {
    if (Array.isArray(stats)) {
      return stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }));
    }
    return [];
  };

  const attributes = getStatsAttributes(pokemon?.stats);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!pokemon) {
    return <div className="text-center">No Pokémon found.</div>;
  }

  return (
    <section className="mb-24 md:mb-20">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center ">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Pokémon destacado del día
        </h1>
        <div className="flex flex-wrap justify-center items-center min-h-screen ">
          <div className="bg-gray-800 shadow-lg lg:rounded-2xl   mt-5 lg:w-[90%] sm:w-full sm:rounded-none">
            <div className="flex flex-wrap justify-center ">
              <section className="flex flex-col justify-center w-[80%] h-full  ">
              <Link to={"/pokemon/" + pokemon.pokemon.name}>
                  <img
                    className="w-[80%] h-auto  mx-auto"
                    src={ pokemon.image}
                    alt={pokemon.pokemon.name}
                  />
                  </Link>

              </section>
              <section className="flex flex-col justify-center items-center w-full md:w-[30%]  ">
                <div className="w-80 pb-28 pt-16 grid place-content-center  dark:text-white ">
                <h1 className="w-full h-auto text-center text-2xl font-bold tracking-tight bg-transparent text-black  dark:text-white  capitalize">
                    <Link to={"/pokemon/" + pokemon.pokemon.name}>
                        {pokemon.pokemon.name} 
                  </Link>
                </h1>
                  <p>Salida: {translateGeneration(generation)}</p>
                  <p className="px-6 py-4 flex-grow ">
                  {t('Weight')}: {pokemon.pokemon.weight / 10}
                    <span> Kg</span>
                    <span>
                      {" "}
                      ({((pokemon.pokemon.weight / 10) * 2.20462).toFixed(
                        2
                      )}{" "}
                      lbs)
                    </span>
                  </p>
                  <p className="px-6 py-4 flex-grow">
                  {t('Height')}: {pokemon.pokemon.height / 10}
                    <span> m</span>
                    <span>
                      {" "}
                      ({((pokemon.pokemon.height / 10) * 3.28084).toFixed(
                        2
                      )}{" "}
                      ft)
                    </span>
                  </p>
                </div>
              </section>
              <section className="flex flex-col justify-center  md:w-[70%] sm:w-[20%] ">
                <h1 className=" w-full h-auto text-2xl font-bold tracking-tight bg-transparent  dark:text-white  capitalize my-5">
                  {t("BaseStats")}
                </h1>
                {attributes.map((attr, index) => {
                  const percentage = (attr.value / maxPercentage) * 100;
                  const colorClass = getColor(attr.value);
                  return (
                    <div key={index} className="mb-4 mr-4 dark:text-white">
                      <div className="flex items-center justify-between space-x-4 ">
                        <span className="lg:text-3xl sm:text-2xl dark:text-white w-1/4 text-left">
                          {attr.name}
                        </span>
                        <div className="w-3/4 flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:text-white">
                            <div
                              className={`${colorClass} h-2.5 rounded-full`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-end w-16">
                            <span className="text-3xl dark:text-white">
                              {attr.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyPokemon;
