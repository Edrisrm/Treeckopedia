import React, { useEffect, useState } from "react";
import axios from "axios";
import PokeballIcon from "../svg/pokeballIcon";
import { getColor, maxPercentage } from "../../helpers/constans";

const Cards = (params) => {
  const [pokemon, setPokemon] = useState({});
  const [pokedex, setPokedex] = useState({ description: "" });
  const [stats, setStats] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const url = params.poke.url;
    try {
      const response = await axios.get(url);
      const result = response.data;
      setPokemon(result);

      const imageLargeUrl = `https://img.pokemondb.net/artwork/large/${result.name}.jpg`;
      const resultPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${result.name}`
      );
      const data = await resultPokemon.json();
      const uri = data.species.url;
      const statPokemon = data.stats;
      setStats(statPokemon);

      const alternativeFormResponse = await fetch(uri);
      const dataAlternative = await alternativeFormResponse.json();

      // Filtra la descripción en inglés
      const descriptionEntry = dataAlternative.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const description = descriptionEntry ? descriptionEntry.flavor_text : "No description available";

      // Establece la descripción de la Pokédex
      setPokedex({ description });

      // Establece la imagen
      const officialArtwork = result.sprites.other["official-artwork"].front_default;
      const dreamWorldArtwork = result.sprites.other.dream_world.front_default;

      if (dreamWorldArtwork) {
        setImage(dreamWorldArtwork);
      } else if (officialArtwork) {
        setImage(officialArtwork);
      } else {
        setImage(imageLargeUrl);
      }

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
    <div className="w-full pb-52 pt-16 grid place-content-center">
      <div className="w-[350px] h-[590px] bg-transparent cursor-pointer group rounded-3xl perspective-1000">
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
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                      {pokemon.name}
                    </h5>
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
            <div className="bottom-0 right-2 absolute flex flex-row text-right">
              {pokemon?.types?.map((typeInfo, index) => (
                <h3 key={index} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {typeInfo.type.name}
                </h3>
              ))}
              <PokeballIcon
                text={`text-red-600`}
                darkMode={`dark:text-red-500`}
                mt={`mt-2`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
