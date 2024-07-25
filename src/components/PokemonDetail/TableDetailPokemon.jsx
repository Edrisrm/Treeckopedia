import React from "react";
import { typeData } from "../../helpers/typesPokemon";

const TableDetailPokemon = ({
  pokemon,
  category,
  damageRelations,
  t
}) => {
  return (
    <div className="w-full divide-y">
      
      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 flex-shrink-0 w-1/4 min-w-[150px]">
          {t('numDex')}
        </h1>
        <p className="px-6 py-4 flex-grow">
          {String(pokemon.id).padStart(4, "0")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 flex-shrink-0 w-1/4 min-w-[150px]">
        {t('typesPkmn')}
        </h1>
        <p className="px-6 py-4 flex-grow">
          {pokemon?.types?.map((typeInfo, index) => (
            <span
              key={index}
              className="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
              style={{
                backgroundColor: typeData[typeInfo.type.name]?.color || "gray",
              }}
            >
              {t(typeInfo.type.name)}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 flex-shrink-0 w-1/4 min-w-[150px]">
        {t('Species')}
        </h1>
        <p className="px-6 py-4 flex-grow">{category}</p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 flex-shrink-0 w-1/4 min-w-[150px]">
        {t('Weight')}
        </h1>
        <p className="px-6 py-4 flex-grow">
          {pokemon.weight / 10}
          <span> Kg</span>
          <span> ({((pokemon.weight / 10) * 2.20462).toFixed(2)} lbs)</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 flex-shrink-0 w-1/4 min-w-[150px]">
        {t('Height')}
        </h1>
        <p className="px-6 py-4 flex-grow">
          {pokemon.height / 10}
          <span> m</span>
          <span> ({((pokemon.height / 10) * 3.28084).toFixed(2)} ft)</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 flex-shrink-0 w-1/4 min-w-[150px]">
        {t('Abilities')}
        </h1>
        <p className="px-6 py-4 flex-grow">
          {pokemon.abilities?.map((abilityInfo, index) => (
            <span
              key={index}
              className="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 dark:text-black"
            >
              {abilityInfo.ability.name}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 flex-shrink-0 w-1/4 min-w-[150px]">
        {t('Weak')}
        </h1>
        <p className="px-6 py-4 flex flex-wrap gap-2 flex-grow">
          {damageRelations.weak?.map((weakTypes, index) => (
            <span
              key={index}
              className="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
              style={{ backgroundColor: typeData[weakTypes]?.color || "gray" }}
            >
              {t(`${weakTypes}`)}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950  flex-shrink-0 w-1/4 min-w-[150px]">
        {t('Resistant')}
        </h1>
        <p className="px-6 py-4 flex flex-wrap gap-2 flex-grow">
          {damageRelations.resistant?.map((resistantTypes, index) => (
            <span
              key={index}
              className="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
              style={{
                backgroundColor: typeData[resistantTypes]?.color || "gray",
              }}
            >
              {t(`${resistantTypes}`)}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-4">
        <h1 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950 border-b flex-shrink-0 w-1/4 min-w-[150px]">
        {t('Immunities')}
        </h1>
        <p className="px-6 py-4 flex flex-wrap gap-2 flex-grow">
          {damageRelations.immune?.length > 0 ? (
            damageRelations.immune?.map((immuneTypes, index) => (
              <span
                key={index}
                className="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                style={{
                  backgroundColor: typeData[immuneTypes]?.color || "gray",
                }}
              >
                {t(`${immuneTypes}`)}
              </span>
            ))
          ) : (
            <span className="bg-gray-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {t('none')}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TableDetailPokemon;
