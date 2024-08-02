import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

axios.defaults.timeout = 4000; 

export const getPokemons = async (limit, offset) => {
  const listPokemon = `${API_BASE_URL}?limit=${limit}&offset=${offset}`;
  try {
    const response = await axios.get(listPokemon);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error(`Error fetching pokemons with limit ${limit} and offset ${offset}:`, error);
    // Puedes optar por lanzar el error para que el componente que llama pueda manejarlo
    throw new Error("Failed to fetch pokemons. Please try again later.");
  }
};

export const getAllPokemon = async () => {
  const list = `${API_BASE_URL}?limit=100000&offset=0`;
  try {
    const response = await axios.get(list);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error(`Error fetching all pokemons:`, error);
    // Puedes optar por lanzar el error para que el componente que llama pueda manejarlo
    throw new Error("Failed to fetch all pokemons. Please try again later.");
  }
};

export const getPokemon = async (url, language) => {
  const response = await axios.get(url);
  const result = response.data;

  const imageLargeUrl = `https://img.pokemondb.net/artwork/large/${result.name}.jpg`;
  const resultPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${result.name}`);
  const data = await resultPokemon.json();

  const uri = data.species.url;
  const statPokemon = data.stats;

  const alternativeFormResponse = await fetch(uri);
  const dataAlternative = await alternativeFormResponse.json();

  const descriptionEntry = dataAlternative.flavor_text_entries.find(
    (entry) => entry.language.name === language
  );
  const description = descriptionEntry ? descriptionEntry.flavor_text : "No description available";

  const officialArtwork = result.sprites.other["official-artwork"].front_default;
  const dreamWorldArtwork = result.sprites.other.dream_world.front_default;
  const image = officialArtwork || dreamWorldArtwork || imageLargeUrl;

  return {
    pokemon: result,
    stats: statPokemon,
    description,
    image,
  };
};

export const fetchPokemonSpecies = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon species ${id}:`, error);
    return null;
  }
};
