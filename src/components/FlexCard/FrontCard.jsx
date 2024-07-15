import React, {useState, useEffect} from "react";

const FrontCard = ({ data }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    
    const imageLargeUrl = `https://img.pokemondb.net/artwork/large/${data.data.name}.jpg`;

    
    const img = new Image();
    img.onload = () => setImage(imageLargeUrl); 
    img.onerror = () => setImage(data.data.sprites.other['official-artwork'].front_default); 
    img.src = imageLargeUrl;
  }, [data]);
  return (
    <>
      <div className="w-full h-full absolute rounded-3xl overflow-hidden bg-white border-black">
        {data ? (
          <>
            <img
              className="w-full h-[65%] "
              src={image}
              alt={`${data.data.name}`}
            />
            <div class="max-w-sm h-[65%] p-6 bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
              <h2 href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                  {data.data.name}
                </h5>
              </h2>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {data.pokedex}
              </p>
            </div>
          </>
        ) : (
          <p>No Pokémon data</p>
        )}
      </div>
    </>
  );
};

export default FrontCard;
