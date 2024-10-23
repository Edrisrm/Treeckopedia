import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTypeSvg, typeData } from "../../helpers/typesPokemon";
import useMobileScreen from "../../hooks/useMobileScreen";
import { generationColors } from "../../helpers/constans";
import TableMovePokemon from "./TableMovePokemon";

const PokemonMoves = ({ pokemonName, t }) => {
  const isMobile = useMobileScreen(); 
  const [moves, setMoves] = useState([]);
  const [generations, setGenerations] = useState({});
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [filteredMoves, setFilteredMoves] = useState({
    levelUp: [],
    machine: [],
    egg: [],
    tutor: [],
  });

  const generationMap = {
    "i": ["red-blue", "yellow"],
    "ii": ["gold-silver", "crystal"],
    "iii": ["firered-leafgreen", "emerald", "ruby", "sapphire"],
    "iv": ["diamond", "pearl", "platinum", "heartgold", "soulsilver"],
    "v": ["black-white", "black-2-white-2"],
    "vi": ["x-y", "omega-ruby", "alpha-sapphire"],
    "vii": ["sun-moon", "ultra-sun-ultra-moon"],
    "viii": ["sword-shield", "arceus"],
    "ix": ["scarlet-violet"],
    "Let's Go": ["lets-go-pikachu-lets-go-eevee"],
    Colosseum: ["colosseum"],
  };

  useEffect(() => {
    const fetchMoves = async () => {
      if (!pokemonName) {
        console.error("Error: pokemonName no está definido");
        return;
      }

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (!response.ok) {
          throw new Error("Pokémon no encontrado");
        }
        const data = await response.json();

        setMoves(data.moves);
        setGenerations(generationMap);
        setSelectedGeneration(Object.keys(generationMap)[0]); // Seleccionar la primera generación por defecto
      } catch (error) {
        console.error("Error fetching Pokémon moves:", error);
      }
    };

    fetchMoves();
  }, [pokemonName]);

  useEffect(() => {
    if (selectedGeneration) {
      const moveCategories = {
        levelUp: new Set(),
        machine: new Set(),
        egg: new Set(),
        tutor: new Set(),
      };

      const fetchMoveDetails = async (move, level) => {
        try {
          const response = await fetch(move.move.url);
          const data = await response.json();

          const language =
            data.names.find((n) => n.language.name === t("pokedexDescription"))
              ?.name || move.move.name;
          const type = data.type.name;

          return {
            name: language,
            category: data.damage_class?.name || "Status",
            power: data.power || "-",
            accuracy: data.accuracy || "-",
            type,
            level: level || "-",
          };
        } catch (error) {
          console.error("Error fetching move details:", error);
          return null;
        }
      };

      const processMoves = async () => {
        const promises = moves.map(async (move) => {
          const promisesDetails = move.version_group_details.map(
            async (detail) => {
              if (
                generations[selectedGeneration].includes(
                  detail.version_group.name
                )
              ) {
                const moveDetails = await fetchMoveDetails(move);
                if (moveDetails) {
                  switch (detail.move_learn_method.name) {
                    case "level-up":
                      const levelLearnedAt = detail.level_learned_at; // Extraer el nivel
                      moveCategories.levelUp.add(
                        JSON.stringify({ ...moveDetails, level: levelLearnedAt })
                      );
                      break;
                    case "machine":
                      moveCategories.machine.add(JSON.stringify(moveDetails));
                      break;
                    case "egg":
                      moveCategories.egg.add(JSON.stringify(moveDetails));
                      break;
                    case "tutor":
                      moveCategories.tutor.add(JSON.stringify(moveDetails));
                      break;
                    default:
                      break;
                  }
                }
              }
            }
          );

          await Promise.all(promisesDetails);
        });

        await Promise.all(promises);
        const levelUpMoves = Array.from(moveCategories.levelUp)
        .map(JSON.parse)
        .sort((a, b) => a.level - b.level); // Ordenar por nivel

        setFilteredMoves({
          levelUp: levelUpMoves,
          machine: Array.from(moveCategories.machine).map(JSON.parse),
          egg: Array.from(moveCategories.egg).map(JSON.parse),
          tutor: Array.from(moveCategories.tutor).map(JSON.parse),
        });
      };

      processMoves();
    }
  }, [selectedGeneration, moves, t, generations]);

  return (
    <div className="flex flex-col justify-between p-4 w-full h-full items-center ">
      <label className="block mb-2 text-lg font-medium text-gray-700">
            Selecciona la Generación:
        </label>
       {isMobile ? (
        <div className="mb-6">
          <select
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
          >
            {Object.keys(generations).map((gen) => (
              <option key={gen} value={gen}>
                {gen.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // Mostrar tabs en pantallas más grandes
        
        <ul className="flex flex-wrap text-sm font-medium text-center text-black border-b border-red-800 ">
          {Object.keys(generations).map((gen) => (
            <li key={gen} className="me-2">
              <button
                onClick={() => setSelectedGeneration(gen)}
                className={`inline-block p-4 rounded-t-lg   dark:hover:bg-green-800  dark:bg-gray-500 dark:text-white  ${
                  selectedGeneration === gen
                    ? `text-white ${generationColors[gen]}` 
                    : ""
                }`}
              >
                {gen.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedGeneration && (
        <div className="min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="min-w-full divide-y divide-gray-300">
            <h3 className="text-xl font-semibold mb-2">Movimientos por Nivel:</h3>
            <TableMovePokemon moves={filteredMoves.levelUp} showLevel={true} />
            <h3 className="text-xl font-semibold mb-2 mt-4">Movimientos por MT/Máquina:</h3>
            <TableMovePokemon moves={filteredMoves.machine} showLevel={false} />

            <h3 className="text-xl font-semibold mb-2 mt-4">Movimientos por Movimiento Huevo:</h3>
            <TableMovePokemon moves={filteredMoves.egg} showLevel={false} />

            <h3 className="text-xl font-semibold mb-2 mt-4">Movimientos por Tutor:</h3>
            <TableMovePokemon moves={filteredMoves.tutor} showLevel={false} />
          </div>
        </div>
      )}
    </div>
  );
};


export default PokemonMoves;
