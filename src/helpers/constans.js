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
    if (value <= 50) return "bg-red-600";
    if (value <= 79) return "bg-orange-600";
    if (value <= 100) return "bg-green-300";
    if (value <= 200) return "bg-green-600";
    return "bg-blue-600";
  };