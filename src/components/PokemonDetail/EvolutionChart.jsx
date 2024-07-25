import React from 'react'
import { Link } from 'react-router-dom'

const EvolutionChart = ({error, evolutionChain, t}) => {
  return (
    <section className="flex flex-col justify-between  w-full h-full mt-2 mb-10 items-center">
    <h1 className=" w-full h-auto text-2xl font-bold tracking-tight   text-black  capitalize my-5">
      {t('EvolutionChart')}
    </h1>
    <div className=" flex flex-wrap gap-10">
      {error && <p className="text-red-500">{error}</p>}
        {evolutionChain.map((evolution, index) => (
          <section key={index} className="flex flex-col flex-wrap items-center">
          <Link to={`/pokemon/${evolution.species_name}`}>
          <img
                  src={evolution.image_url}
                  alt={evolution.species_name}
                  className="w-36 h-auto rounded-full bg-slate-300"
                />
          </Link>
          <Link className="active" to={`/pokemon/${evolution.species_name}`}>
          <div className="flex flex-col items-center">
                  <strong>{evolution.species_name}</strong>
                   <p>
                {evolution.min_level !== null
                  ?   "level " + evolution.min_level
                  : evolution.trigger_name}
              </p>
                </div>
          </Link>
                
          </section>
        ))}
    </div>
  </section>
  )
}

export default EvolutionChart
