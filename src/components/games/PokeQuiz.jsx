import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  fetchPokemonSpecies,
  getAllPokemon,
  getPokemon,
} from "../../utils/apiPokemonV2";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import { Spinner } from "flowbite-react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PokeQuiz = () => {
  // Inicializar los estados con valores de localStorage si existen
  const initialGameMode = localStorage.getItem("gameMode") || 'warmUp';
  const initialScore = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(initialScore);
  const [spriteUrl, setSpriteUrl] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [gameMode, setGameMode] = useState(initialGameMode);
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    const loadAllPokemon = async () => {
      try {
        const allPokemonData = await getAllPokemon();
        setAllPokemon(allPokemonData);
        loadQuestion(allPokemonData);
      } catch (error) {
        console.error("Error loading all Pokémon data:", error);
      }
    };
    loadAllPokemon();
  }, []);

  const loadQuestion = async (allPokemonData) => {
    setLoading(true);
    setSelectedAnswer("");
    try {
      const randomIndex = Math.floor(
        Math.random() * allPokemonData.results.length
      );
      const randomPokemon = allPokemonData.results[randomIndex];
      const { pokemon, description, image } = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`,
        t("pokedexDescription")
      );
      if (!pokemon) return;

      const correctAnswer = pokemon.name;
      setInitialDescription(description);

      const wrongOptions = await Promise.all(
        Array(3)
          .fill()
          .map(async () => {
            const wrongPokemon =
              allPokemonData.results[
                Math.floor(Math.random() * allPokemonData.results.length)
              ];
            const wrongPokemonData = await getPokemon(
              `https://pokeapi.co/api/v2/pokemon/${wrongPokemon.name}`,
              t("pokedexDescription")
            );
            return wrongPokemonData.pokemon.name;
          })
      );

      const options = [correctAnswer, ...wrongOptions].sort(
        () => Math.random() - 0.5
      );

      const randomQuestionType = Math.random() < 0.5 ? "description" : "sprite";
      setQuestionType(randomQuestionType);
      if (description === "No description available") {
        setQuestionType("sprite");
        setQuestion("");
        setSpriteUrl(image);
      } else if (randomQuestionType === "description") {
        setQuestionType("description");
        setQuestion(description);
        setSpriteUrl("");
      } else {
        setQuestionType("sprite");
        setQuestion("");
        setSpriteUrl(image);
      }
      setOptions(options);
      setCorrectAnswer(correctAnswer);
      setIsCorrect(false);
    } catch (error) {
      console.error("Error loading question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (gameMode === "warmUp" && newScore === 10) {
          setTimeout(() => {
            setScore(0);
            localStorage.setItem("score", 0); // Reset score in localStorage
            loadQuestion(allPokemon);
          }, 1000);
        }
        if (gameMode === "arcade") {
          localStorage.setItem("score", newScore); // Save score in localStorage
        }
        return newScore;
      });
      setIsCorrect(true);
    } else {
      setScore(0);
      localStorage.setItem("score", 0); // Reset score in localStorage
      setIsCorrect(false);
    }
    setTimeout(() => {
      loadQuestion(allPokemon);
    }, 2000);
  };

  const handleGameMode = (mode) => {
    const nameMode = gameMode === 'warmUp' ? 'Warm up' : 'Arcade'
    Swal.fire({
      title: "Are you sure you want to change the game mode?. You will lose all your score..",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No, keep ${nameMode}`
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        setGameMode(mode);
        localStorage.setItem("gameMode", mode); // Save game mode in localStorage
        setScore(0);
        localStorage.setItem("score", 0); // Reset score in localStorage
        loadQuestion(allPokemon);
      } else if (result.isDenied) {
        Swal.fire(`Keep playing in ${nameMode} mode`);
      }
    });
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-4">
      <h1 className="dark:text-white text-gray-900 text-3xl font-extrabold mb-2">
        Select Game Mode
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-green-900 border border-gray-800 dark:border-gray-700 rounded-lg p-8 md:p-12 md:mb-12">
          <h1 className="dark:text-white text-gray-900  text-3xl font-extrabold mb-2">
            Warm Up
          </h1>
          <p className="text-lg font-normal dark:text-white text-gray-900 mb-4">
            Relaxed game mode to practice your skills, with a maximum of 10 questions.
          </p>
          <button
            onClick={() => handleGameMode("warmUp")} type="button" disabled={gameMode === 'warmUp'}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 
            focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 
            dark:focus:ring-green-800">
            Select
          </button>
        </div>
        <div className="bg-gray-50 dark:bg-green-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 md:mb-12">
          <h1 className="dark:text-white text-gray-900 text-3xl font-extrabold mb-2">
            Arcade
          </h1>
          <p className="text-lg font-normal dark:text-white text-gray-900 mb-4">
            Unlimited questions, the true test of your Pokémon knowledge.
          </p>
          <button
            onClick={() => handleGameMode("arcade")} type="button" disabled={gameMode === 'arcade'}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 
            focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 
            dark:focus:ring-green-800">
            Select
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-7xl">
          <Question
            gameMode={gameMode === 'warmUp' ? 'Warm up' : 'Arcade'}
            question={
              initialDescription && questionType === "description"
                ? initialDescription
                : question
            }
            spriteUrl={spriteUrl}
            options={options}
            handleAnswer={handleAnswer}
            isCorrect={isCorrect}
            questionType={questionType}
            correctAnswer={correctAnswer}
            selectedAnswer={selectedAnswer}
          />
        </div>
      )}
      <p className="mt-4 text-xl dark:text-white text-gray-900">Score: {score}</p>
    </div>
  );
};

export default PokeQuiz;
