import axios from "axios";

export const fetchAllPokemon = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const data = await response.json();
  return data.results;
};
export const fetchPokemon = async (pokemonName) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    const data = await response.json();
    const uri = data.species.url;
    const alternativeFormResponse = await fetch(uri);
    const dataAlternative = await alternativeFormResponse.json();
    return { data, dataAlternative };
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return null;
  }
};

export const fetchPokemonSpecies = async (id) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    // Check if response status is 404
    if (response.status === 404) {
      throw new Error(`Pokémon species with ID ${id} not found`);
    }

    // Check if response.data is null or undefined
    if (!response.data) {
      throw new Error(`No data received for Pokémon species ${id}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon species ${id}:`, error);
    return null;
  }
};
export const fetchPokemonSprite = async (pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Sprite not found');
        }
        const data = await response.json();

        const uri = data.sprites.front_default;
        const alternativeFormResponse = await fetch(uri);
        const dataAlternative = await alternativeFormResponse.json();
        return data.sprites.front_default; // URL del sprite
    } catch (error) {
        console.error('Error fetching Pokemon sprite:', error);
        return null;
    }
};
