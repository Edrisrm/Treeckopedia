import React from 'react'
import { typeData } from '../../helpers/typesPokemon'

const TableDetailPokemon = ({ pokemon, pokedex, category, damageRelations }) => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                National №
              </td>
              <td className="px-6 py-4">
                {String(pokemon.id).padStart(4, "0")}
              </td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Types
              </td>
              <td className="px-6 py-4">
                {pokemon?.types?.map((typeInfo, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                    style={{ backgroundColor: typeData[typeInfo.type.name]?.color || 'gray' }}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Species
              </td>
              <td className="px-6 py-4">{category}</td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Weight
              </td>
              <td className="px-6 py-4">
                {(pokemon.weight / 10)}<span>Kg</span>
                <span>({(pokemon.weight / 10 * 2.20462).toFixed(2)} lbs)</span>
              </td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Height
              </td>
              <td className="px-6 py-4">
                {(pokemon.height / 10)}<span>m</span>
                <span>({(pokemon.height / 10 * 3.28084).toFixed(2)}ft)</span>
              </td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Abilities
              </td>
              <td className="px-6 py-4">
                {pokemon.abilities?.map((abilityInfo, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 dark:text-black"
                  >
                    {abilityInfo.ability.name}{" "}
                  </span>
                ))}
              </td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Weak
              </td>
              <td className="px-6 py-4">{damageRelations.weak?.map((weakTypes, index) =>(
                <span
                key={index}
                className="bg-blue-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                style={{ backgroundColor: typeData[weakTypes]?.color || 'gray' }}
                >
                    {weakTypes}
                </span>
              ))}</td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Resistant
              </td>
              <td className="px-6 py-4">{damageRelations.resistant?.map((resistantTypes, index) =>(
                <span
                key={index}
                className="bg-blue-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                style={{ backgroundColor: typeData[resistantTypes]?.color || 'gray' }}
                >
                    {resistantTypes}
                </span>
              ))}</td>
            </tr>
            <tr className="dark:text-gray-950 border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950"
              >
                Inmunities
              </td>
              <td className="px-6 py-4">{damageRelations.immune?.map((inmuneTypes, index) =>(
                <span
                key={index}
                className="bg-blue-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                style={{ backgroundColor: typeData[inmuneTypes]?.color || 'gray' }}
                >
                    {inmuneTypes}
                </span>
              ))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableDetailPokemon
