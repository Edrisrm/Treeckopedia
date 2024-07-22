import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TableDetailPokemon from "../tables/TableDetailPokemon";
import { tableOfTypes } from "../../helpers/tableOfTypes";
import { getPokemon } from "../../utils/apiPokemonV2";
import { getColor, maxPercentage } from "../../helpers/constans";
import DOMPurify from 'dompurify';
const DetailPokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [image, setImage] = useState([]);
  const [typesPkmn, setTypesPkmn] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [category, setCategory] = useState("");
  const [damageRelations, setDamageRelations] = useState({
    weak: [],
    resistant: [],
    immune: [],
  });
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemon();
    };
    fetchData();
  }, [name, t]);

  const fetchPokemon = async () => {
    const pokemonResponse = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const { pokemon, stats, image } = await getPokemon(
      pokemonResponse,
      t("pokedexDescription")
    );
    setPokemon(pokemon);
    setStats(stats);
    setImage(image);
    const response = await axios.get(pokemonResponse);
    const result = response.data;
    calculateDamageRelations(
      result.types.map((typeInfo) => typeInfo.type.name)
    );
    setTypesPkmn(result.types);
    await getPokedex(result.species.name);
  };
  const getPokedex = async (namePokemon) => {
    const pokedexResponse = `https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`;
    const response = await axios.get(pokedexResponse);
    const result = response.data;

    fetchEvolutionChain(pokedexResponse);

    const descriptionEntry = result.flavor_text_entries.find(
      (entry) => entry.language.name === t("pokedexDescription")
    );
    const allDex = result.flavor_text_entries
    .filter((entry) => entry.language.name === t("pokedexDescription"))
    .map((entry) => ({
      flavor_text: DOMPurify.sanitize(entry.flavor_text),
      version: entry.version.name 
    }));
    console.log(allDex)
    setPokedex(allDex); 
    const genusEntry = result.genera.find(
      (genus) => genus.language.name === t("pokedexDescription")
    );
    setCategory(genusEntry ? genusEntry.genus : "Unknown Category");
  };

  const calculateDamageRelations = (types) => {
    const damageRelations = {
      weak: [],
      resistant: [],
      immune: [],
    };

    types.forEach((type) => {
      const typeInfo = tableOfTypes[type];
      if (typeInfo) {
        damageRelations.weak.push(...typeInfo.weak);
        damageRelations.resistant.push(...typeInfo.resistant);
        damageRelations.immune.push(...typeInfo.immune);
      }
    });

    damageRelations.weak = [...new Set(damageRelations.weak)];
    damageRelations.resistant = [...new Set(damageRelations.resistant)];
    damageRelations.immune = [...new Set(damageRelations.immune)];

    damageRelations.weak = damageRelations.weak.filter(
      (type) =>
        !damageRelations.resistant.includes(type) &&
        !damageRelations.immune.includes(type)
    );
    damageRelations.resistant = damageRelations.resistant.filter(
      (type) => !damageRelations.immune.includes(type)
    );

    setDamageRelations(damageRelations);
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

  const fetchEvolutionChain = async (url) => {
    try {
      setError("");
      const speciesResponse = await axios.get(url);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

      const evolutionChainResponse = await axios.get(evolutionChainUrl);

      if (evolutionChainResponse.data.chain.evolves_to.length === 0) {
        setEvolutionChain([]);
        setError("This Pokémon does not have an evolution chain.");
        return;
      }
      const evolutionChain = evolutionChainResponse.data.chain;

      const parseEvolutionChain = async (chain) => {
        const evolutions = [];
        let currentChain = chain;

        do {
          const speciesName = currentChain.species.name;
          const speciesData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${speciesName}`
          );
          const imageUrl =
            speciesData.data.sprites.other["official-artwork"].front_default;

          evolutions.push({
            species_name: speciesName,
            min_level: currentChain.evolution_details.length
              ? currentChain.evolution_details[0].min_level
              : null,
            trigger_name: currentChain.evolution_details.length
              ? currentChain.evolution_details[0].trigger.name
              : null,
            image_url: imageUrl,
          });

          currentChain = currentChain.evolves_to[0];
        } while (currentChain && currentChain.hasOwnProperty("evolves_to"));

        return evolutions;
      };
      const evolutions = await parseEvolutionChain(evolutionChain);
      setEvolutionChain(evolutions);
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
      setError("Failed to fetch evolution chain.");
      setEvolutionChain([]);
    }
  };
  return (
    <>
      <div className="flex flex-wrap justify-center items-center min-h-screen lg:pt-0 sm:pt-10 sm:pb-5 lg:pb-40">
        <div className="bg-gray-50 shadow-lg lg:rounded-2xl px-10 py-32 mt-5 lg:w-[90%] sm:w-full sm:rounded-none">
          <div className="flex flex-wrap justify-center ">
            <section className="flex flex-col justify-center  w-full h-full mt-2 mb-10 ">
              <h1 className=" w-full h-auto text-center text-2xl font-bold tracking-tight bg-transparent  text-black  capitalize">
                {pokemon.name}{" "}
              </h1>
            </section>
            <section className="flex flex-col justify-center items-center w-full md:w-[30%] ">
              <div className="w-80 pb-28 pt-16 grid place-content-center   ">
                <img
                  className="w-[80%] h-auto  mx-auto"
                  src={image}
                  alt={pokemon.name}
                />
              </div>
            </section>

            <section className="flex flex-col sm:flex-row  md:w-[70%] sm:w-[20%] items-center ">
            
              <TableDetailPokemon
                pokemon={pokemon}
                category={category}
                damageRelations={damageRelations}
              />
            </section>

            <section className="flex flex-col justify-center  w-full h-full mt-2 mb-10">
              <h1 className=" w-full h-auto text-2xl font-bold tracking-tight bg-transparent  text-black  capitalize my-5">
                Base Stats
              </h1>
              {attributes.map((attr, index) => {
                const percentage = (attr.value / maxPercentage) * 100;
                const colorClass = getColor(attr.value);
                return (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between space-x-4">
                      <span className="lg:text-3xl sm:text-2xl text-gray-400 w-1/4 text-left">
                        {attr.name}
                      </span>
                      <div className="w-3/4 flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className={`${colorClass} h-2.5 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-end w-16">
                          <span className="text-3xl text-gray-400">
                            {attr.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
            <section className="flex flex-col justify-between  w-full h-full mt-2 mb-10 items-center">
              <h1 className=" w-full h-auto text-2xl font-bold tracking-tight   text-black  capitalize my-5">
                Evolution Chart
              </h1>
              <div className=" flex flex-wrap gap-10">
                {error && <p className="text-red-500">{error}</p>}
                  {evolutionChain.map((evolution, index) => (
                    <section key={index} className="flex flex-col flex-wrap items-center">
                    <Link to={`/pokemon/${evolution.species_name}`}>
                    <img
                            src={evolution.image_url}
                            alt={evolution.species_name}
                            className="w-36 h-auto rounded-full bg-slate-300"
                          />
                    </Link>
                    <Link className="active" to={`/pokemon/${evolution.species_name}`}>
                    <div className="flex flex-col items-center">
                            <strong>{evolution.species_name}</strong>
                            {evolution.min_level && (
                              <>
                                {" "}
                                ( level {evolution.min_level})
                              </>
                            )}
                          </div>
                    </Link>
                          
                    </section>
                  ))}
              </div>
            </section>
            <section className="flex flex-col justify-between  w-full h-full mt-2 mb-10 items-center">
              <h1 className=" w-full h-auto text-2xl font-bold tracking-tight text-black  capitalize my-5">
                Pokedex entries
              </h1>
              <div className="w-full divide-y">
              {pokedex.length === 0 ? (
                <div className="flex flex-col pb-3">
                  <p>No Pokedex entries available.</p>
                </div>
                
              ) : (
                pokedex.map((entry, index) => (
                  <div key={index} className="flex flex-row items-start pb-3">
                    <div className="flex-shrink-0 w-1/4" >
                      <strong>{entry.version}: </strong>
                      
                    </div>
                    <div className="w-3/4 pl-4">
                    <p>{entry.flavor_text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPokemon;
