export const maxPercentage = 255;

export const statNames = {
    hp: "Vida",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defensa Especial",
    speed: "Velocidad"
  };

  export const getColor = (value) => {
    if (value <= 30) return "bg-red-600";
    if (value <= 59) return "bg-orange-500";
    if (value <= 89) return "bg-yellow-400";
    if (value <= 119) return "bg-green-400";
    if (value <= 149) return "bg-green-500";
    return "bg-cyan-600";
  };
  const generationMap = {
    "i": "Primera Generación",
    "ii": "Segunda Generación",
    "iii": "Tercera Generación",
    "iv": "Cuarta Generación",
    "v": "Quinta Generación",
    "vi": "Sexta Generación",
    "vii": "Séptima Generación",
    "viii": "Octava Generación",
    "ix": "Novena Generación",
  };
  export const generationColors ={
    "i": "bg-gradient-to-r from-red-600 to-blue-600",
    "ii": "bg-gradient-to-r from-zinc-600 to-yellow-600",
    "iii": "bg-gradient-to-r from-red-700 via-blue-600 to-green-500",
    "iv": "bg-gradient-to-r from-cyan-500 to-pink-400",
    "v": "bg-gradient-to-r from-white to-black",
    "vi": "bg-gradient-to-r from-red-700 to-blue-700",
    "vii": "bg-gradient-to-r from-purple-600 to-yellow-400",
    "viii": "bg-gradient-to-r from-sky-400 to-red-300",
    "ix": "bg-gradient-to-r from-red-600 to-purple-700",
    "Let's Go": "bg-gradient-to-r from-yellow-400 to-amber-950",
    "Colosseum": "bg-gradient-to-r from-blue-400 to-blue-800",
  }
  
  export const translateGeneration = (generationName) => {
    return generationMap[generationName] || generationName;
  };