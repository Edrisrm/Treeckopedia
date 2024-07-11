import React from 'react'
import PokeballIcon from '../svg/pokeballIcon';

const BackCard = () => {
    const maxPercentage = 255;

  const attributes = [
    { name: "Vida", value: 255 },
    { name: "Ataque", value: 10 },
    { name: "Defensa", value: 10 },
    { name: "Ataque Especial", value: 75 },
    { name: "Defensa Especial", value: 135 },
    { name: "Velocidad", value: 55 },
  ];

  const getColor = (value) => {
    if (value <= 50) return "bg-red-600";
    if (value <= 79) return "bg-orange-600";
    if (value <= 100) return "bg-green-300";
    if (value <= 200) return "bg-green-600";
    return "bg-blue-600";
  };
  return (
    <>
      <div className="absolute rotate-y-180 w-full h-full bg-[#0F1823] bg-opacity-95 rounded-3xl overflow-hidden p-10 text-neutral-300 space-y-5 backface-hidden">
              <div className="flex flex-col space-y-2">
                <h1 className="text-left text-2xl font-bold mb-4">Atributos</h1>
                {attributes.map((attr, index) => {
                  const percentage = (attr.value / maxPercentage) * 100;
                  const colorClass = getColor(attr.value);
                  return (
                    <div key={index} className="mb-4">
                      <h2 className="text-left text-xl font-semibold">
                        {attr.name}
                      </h2>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`${colorClass} h-2.5 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bottom-0 right-2 absolute flex flex-row  text-right ">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white  ">
                  grass
                </h3>
                <PokeballIcon text={`text-red-600`} darkMode={`dark:text-red-500`} mt={`mt-2`} />
              </div>
            </div>
    </>
  )
}

export default BackCard
