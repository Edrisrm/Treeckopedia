import React, { useState } from "react";
import FlexCard from "./FlexCard/FlexCard";
import SearchPokemon from "./SearchPokemon/SearchPokemon";
import PokeballIcon from "./svg/pokeballIcon";
import { useTranslation } from "react-i18next";
import DailyPokemon from "./DailyPokemon";
import { Link } from "react-router-dom";

const Home = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const { i18n, t } = useTranslation();

  const handleSearch = (data) => {
    setPokemonData(data);
  };

  return (
    <>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
          <Link to={"/pokedex"}>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
              {t("bigTitleOne")}
            </h1>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
              {t("firstCardDescription")}
            </p>
            <PokeballIcon
              text={`text-red-600`}
              darkMode={`dark:text-red-500`}
            />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 md:mb-12">
              <Link to={"/pokedex"}>
              <h1 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                Pokedex
              </h1>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                {t("bigTitleTwo")}
              </p>
              <PokeballIcon
                text={`text-blue-600`}
                darkMode={`dark:text-blue-500`}
              />
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 md:mb-12 ">
            <Link to={"/minigames"}>
              <h1 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                {t("Games")}
              </h1>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                {t("thirdCardDescription")}
              </p>
              <PokeballIcon
                text={`text-yellow-600`}
                darkMode={`dark:text-yellow-500`}
              />
              </Link>
            </div>
          </div>
        </div>
        <DailyPokemon/>
      </section>
     
    </>
  );
};

export default Home;
