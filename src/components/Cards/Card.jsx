import React, { useEffect, useState } from "react";
import PokeballIcon from "../svg/pokeballIcon";
import { getColor, maxPercentage } from "../../helpers/constans";
import { getPokemon } from "../../utils/apiPokemonV2";
import { useTranslation } from "react-i18next";
import { getTypeSvg } from "../../helpers/typesPokemon";
import { Link } from "react-router-dom";

const Cards = (params) => {
  const [pokemon, setPokemon] = useState({});
  const [pokedex, setPokedex] = useState({ description: "" });
  const [stats, setStats] = useState([]);
  const [image, setImage] = useState("");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    fetchPokemon();
  }, [params.poke.url, t]);

  const fetchPokemon = async () => {
    const url = params.poke.url;
    try {
      const { pokemon, stats, description, image } = await getPokemon(url, t('pokedexDescription'));
      setPokemon(pokemon);
      setStats(stats);
      setPokedex({ description });
      setImage(image);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
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

  const attributes = getStatsAttributes(stats);

  return (
    <div className="w-full pb-28 pt-16 grid place-content-center">
      <div className="xl:w-[320px] xl:h-[590px]  lg:w-[300px] lg:h-[550px]  w-[290px] h-[550px]  bg-transparent cursor-pointer group rounded-3xl perspective-1000">
        <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
          <div className="w-full h-full absolute rounded-3xl overflow-hidden bg-white border-black">
            {Object.keys(pokemon).length !== 0 ? (
              <>
                <img
                  className="w-full h-[65%]"
                  src={image}
                  alt={`${pokemon.name}`}
                />
                <div className="max-w-sm h-[35%] p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                  <h2>
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                      {pokemon.name}
                    </h3>
                  </h2>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {pokedex.description || "No description available"}
                  </p>
                </div>
              </>
            ) : (
              <p>No Pokémon data</p>
            )}
          </div>
          <div className="absolute rotate-y-180 w-full h-full bg-[#0F1823] bg-opacity-95 rounded-3xl overflow-hidden p-10 text-neutral-300 space-y-5 backface-hidden">
            <div className="flex flex-col space-y-2">
              <h1 className="text-left text-2xl font-bold mb-4">Atributos</h1>
              {attributes.map((attr, index) => {
                const percentage = (attr.value / maxPercentage) * 100;
                const colorClass = getColor(attr.value);
                return (
                  <div key={index} className="mb-4">
                    <h2 className="text-left text-xl font-semibold">{attr.name}</h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-[75%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`${colorClass} h-2.5 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{attr.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bottom-0 right-2 absolute flex flex-row text-right gap-4">
              {pokemon?.types?.map((typeInfo, index) => (
                <div key={index} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                   <img src={getTypeSvg(typeInfo.type.name)} alt={typeInfo.type.name} className="h-8 w-8 inline-block" />
                </div>
              ))}
              <Link  to={'/pokemon/'+pokemon.name}>
              <button type="button" className=" flex flex-row gap-1 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Detail<span>
                    <PokeballIcon
                    text={`text-red-600`}
                    darkMode={`dark:text-red-500`}
                  />
                </span>
                </button>
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
