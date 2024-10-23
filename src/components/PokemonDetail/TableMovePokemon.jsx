import React from 'react';
import { getTypeSvg, typeData } from '../../helpers/typesPokemon';

const TableMovePokemon = ({ moves, showLevel }) => {
  return (
    <>
    {moves.length > 0 ? (
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {showLevel && <th className="border px-4 py-2 hidden sm:table-cell">Nivel</th>} {/* Mostrar nivel solo si showLevel es true */}
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Categoría</th>
              <th className="border px-4 py-2">Tipo</th>
              <th className="border px-4 py-2 hidden sm:table-cell">Poder</th>
              <th className="border px-4 py-2 hidden sm:table-cell">Precisión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
            {moves.map((move) => (
              <tr
                key={move.name}
                className="bg-white border-b dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-300"
              >
                {showLevel && <td className="border px-4 py-2 capitalize hidden sm:table-cell">{move.level}</td>} {/* Mostrar nivel solo si showLevel es true */}
                <td className="border px-4 py-2 capitalize">{move.name}</td>
                <td className="border px-4 py-2 capitalize">{move.category}</td>
                <td className="border px-4 py-2 capitalize">
                  <div className="flex items-center">
                    <div
                      className="h-8 w-8 mr-2"
                      style={{
                        backgroundColor: typeData[move.type]?.color || "#000",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <img
                        src={getTypeSvg(move.type)}
                        alt={move.type}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="hidden sm:table-cell">{move.type}</p>
                  </div>
                </td>
                <td className="border px-4 py-2 capitalize hidden sm:table-cell">{move.power}</td>
                <td className="border px-4 py-2 capitalize hidden sm:table-cell">{move.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-black">
        No hay movimientos en esta generacion, quiza el pokemon no fue programado o creado en esta generacion.
      </p>
    )}
  </>
  );

};

export default TableMovePokemon;
