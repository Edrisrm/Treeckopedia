import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTypeSvg } from "../../helpers/typesPokemon";
import TableDetailPokemon from "../tables/TableDetailPokemon";
import { tableOfTypes } from "../../helpers/tableOfTypes";

const DetailPokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [image, setImage] = useState([]);
  const [typesPkmn, setTypesPkmn] = useState([]);
  const [species, setSpecies] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [habitad, setHabitad] = useState([]);
  const [category, setCategory] = useState(""); 
  const [damageRelations, setDamageRelations] = useState({
    weak: [],
    resistant: [],
    immune: []
  });
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      await getPokemon();
    };
    fetchData();
  }, [name, t]);

  const getPokemon = async () => {
    const pokemonResponse = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(pokemonResponse);
    const result = response.data;
    calculateDamageRelations(result.types.map(typeInfo => typeInfo.type.name));
    setPokemon(result);
    setTypesPkmn(result.types);
    if (result.sprites.other["official-artwork"].front_default) {
      setImage(result.sprites.other["official-artwork"].front_default);
    } else {
      setImage(result.sprites.other.dream_world.front_default);
    }
    await getPokedex(result.species.name);
  };

  const getPokedex = async (namePokemon) => {
    const pokedexResponse = `https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`;
    const response = await axios.get(pokedexResponse);
    const result = response.data;

    const descriptionEntry = result.flavor_text_entries.find(
      (entry) => entry.language.name === t("pokedexDescription")
    );
    setSpecies(result);
    console.log(species);
    if (result.habitat != null) {
      await getHabitat(result.habitat.url);
    }
    setPokedex(
      descriptionEntry
        ? descriptionEntry.flavor_text
        : "No description available."
    );
    const genusEntry = result.genera.find(
      (genus) => genus.language.name === t("pokedexDescription")
    );
    setCategory(genusEntry ? genusEntry.genus : "Unknown Category");
  };
  const getHabitat = async (hab) => {
    axios.get(hab).then(async (response) => {
      setHabitad(response.data.names[1].name);
    });
  };
  const calculateDamageRelations = (types) => {
    const damageRelations = {
      weak: [],
      resistant: [],
      immune: []
    };

    types.forEach(type => {
      const typeInfo = tableOfTypes[type];
      if (typeInfo) {
        damageRelations.weak.push(...typeInfo.weak);
        damageRelations.resistant.push(...typeInfo.resistant);
        damageRelations.immune.push(...typeInfo.immune);
      }
    });

    // Remove duplicates
    damageRelations.weak = [...new Set(damageRelations.weak)];
    damageRelations.resistant = [...new Set(damageRelations.resistant)];
    damageRelations.immune = [...new Set(damageRelations.immune)];

    // Remove conflicts (e.g., a type that is both weak and resistant)
    damageRelations.weak = damageRelations.weak.filter(type => !damageRelations.resistant.includes(type) && !damageRelations.immune.includes(type));
    damageRelations.resistant = damageRelations.resistant.filter(type => !damageRelations.immune.includes(type));

    setDamageRelations(damageRelations);
    console.log(damageRelations)
  };
  return (
    <>
      <div className="flex flex-wrap justify-center items-center min-h-screen lg:pt-0 sm:pt-10 sm:pb-5 lg:pb-40">
        <div className="bg-gray-50 shadow-lg lg:rounded-2xl px-10 py-32 mt-5 lg:w-[90%] sm:w-full sm:rounded-none">
          <div className="flex flex-wrap justify-center ">
            <section className="flex flex-col justify-center  w-full h-full mt-2 mb-10">
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

            <section className="flex-initial w-full md:w-[70%] ">
             <TableDetailPokemon pokedex={pokedex} pokemon={pokemon} category={category} damageRelations={damageRelations} />
            </section>

            <section className="flex flex-col justify-center  w-full h-full mt-2 mb-10">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPokemon;
