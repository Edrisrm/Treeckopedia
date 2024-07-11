import React from 'react'

const FrontCard = () => {
  return (
    <>
      <div className="w-full h-full absolute rounded-3xl overflow-hidden bg-white border-black">
              <img
                className="w-full h-[65%] bg-green-300"
                src="https://img.pokemondb.net/artwork/large/blissey.jpg"
                alt="treeckopedia"
              />

              <div class="max-w-sm h-[65%] p-6 bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    BLISSEY
                  </h5>
                </h2>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Anyone who takes neven one bite of Blissey's egg be comes
                  unfailingly caring and pleas nant to everyone.
                </p>
              </div>
            </div>
    </>
  )
}

export default FrontCard
