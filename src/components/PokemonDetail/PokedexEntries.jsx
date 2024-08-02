import React from 'react'

const PokedexEntries = ({pokedex, t}) => {
  return (
    <section className="flex flex-col justify-between  w-full h-full mt-2 mb-10 items-center">
    <h1 className=" w-full h-auto text-2xl font-bold tracking-tight text-black  capitalize my-5">
      {t('PokedexEntries')}
    </h1>
    <div className="w-full divide-y divide-gray-400 text-black">
    {pokedex.length === 0 ? (
      <div className="flex flex-col pb-3">
        <p>No Pokedex entries available.</p>
      </div>
      
    ) : (
      pokedex.map((entry, index) => (
        <div key={index} className="flex flex-row items-start pb-3">
          <div className="flex-shrink-0 w-1/4" >
            <strong>{entry.version}: </strong>
            
          </div>
          <div className="w-3/4 pl-4">
          <p>{entry.flavor_text}</p>
          </div>
        </div>
      ))
    )}
  </div>
  </section>
  )
}

export default PokedexEntries
