import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { fetchPokemonSpecies, getAllPokemon, getPokemon } from '../../utils/apiPokemonV2';
import { useTranslation } from 'react-i18next';
import Question from './Question';
import { Spinner } from 'flowbite-react';

const PokeQuiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [spriteUrl, setSpriteUrl] = useState('');
  const [allPokemon, setAllPokemon] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionType, setQuestionType] = useState('');
  const [initialDescription, setInitialDescription] = useState('');
  const [loading, setLoading] = useState(false); 
  const { t } = useTranslation();

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
    setSelectedAnswer('');
    try {
      const randomIndex = Math.floor(Math.random() * allPokemonData.results.length);
      const randomPokemon = allPokemonData.results[randomIndex];
      const { pokemon, description, image } = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`,
        t("pokedexDescription")
      );
      if (!pokemon) return;

      const correctAnswer = pokemon.name;
      setInitialDescription(description);

      const wrongOptions = await Promise.all(
        Array(3).fill().map(async () => {
          const wrongPokemon = allPokemonData.results[Math.floor(Math.random() * allPokemonData.results.length)];
          const wrongPokemonData = await getPokemon(
            `https://pokeapi.co/api/v2/pokemon/${wrongPokemon.name}`,
            t("pokedexDescription")
          );
          return wrongPokemonData.pokemon.name;
        })
      );

      const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);

      const randomQuestionType = Math.random() < 0.5 ? 'description' : 'sprite';
      setQuestionType(randomQuestionType);
      if (description === 'No description available') {
        setQuestionType('sprite');
        setQuestion('');
        setSpriteUrl(image);
      } else if (randomQuestionType === 'description') {
        setQuestionType('description');
        setQuestion(description);
        setSpriteUrl('');
      } else {
        setQuestionType('sprite');
        setQuestion('');
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
        setScore(prevScore => {
          const newScore = prevScore + 1;
          if (newScore === 10) {
            setTimeout(() => {
              setScore(0);
              loadQuestion(allPokemon);
            }, 1000);
            return newScore;
          }
          return newScore;
        });
        setIsCorrect(true);
      }else {
      setScore(0)
      setIsCorrect(false);
    }
    setTimeout(() => {
      loadQuestion(allPokemon);
    }, 2000); // Cambia de pregunta después de 1 segundo
  };

  return (
<div className="flex flex-col mt-20 items-center bg-white min-h-screen w-full p-4">
  {loading ? (
    <Spinner /> // Muestra el spinner mientras se está cargando
  ) : (
    <div className="w-full max-w-7xl ">
      <Question
        question={initialDescription && questionType === 'description' ? initialDescription : question}
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
  <p className="mt-4 text-xl">Score: {score}</p>
</div>

  
  )
}

export default PokeQuiz;
