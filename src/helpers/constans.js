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