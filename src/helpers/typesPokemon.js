
import bug from "../assets/Icons-type/bug.svg";
import dark from "../assets/Icons-type/dark.svg";
import dragon from "../assets/Icons-type/dragon.svg";
import electric from "../assets/Icons-type/electric.svg";
import fairy from "../assets/Icons-type/fairy.svg";
import fighting from "../assets/Icons-type/fighting.svg";
import fire from "../assets/Icons-type/fire.svg";
import flying from "../assets/Icons-type/flying.svg";
import ghost from "../assets/Icons-type/ghost.svg";
import grass from "../assets/Icons-type/grass.svg";
import ground from "../assets/Icons-type/ground.svg";
import ice from "../assets/Icons-type/ice.svg";
import normal from "../assets/Icons-type/normal.svg";
import poison from "../assets/Icons-type/poison.svg";
import psychic from "../assets/Icons-type/psychic.svg";
import rock from "../assets/Icons-type/rock.svg";
import steel from "../assets/Icons-type/steel.svg";
import water from "../assets/Icons-type/water.svg";


const typeToSvgMap = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water
};

export const getTypeSvg = (type) => typeToSvgMap[type] || null;

export  const typeData = {
  normal: {  color: '#404040' },
  fire: { color: '#991b1b' },
  water: { color: '#1e3a8a' },
  electric: {  color: '#eab308' },
  grass: {  color: '#14532d' },
  ice: {  color: '#0369a1' },
  fighting: {  color: '#C03028' },
  poison: {  color: '#A040A0' },
  ground: {  color: '#713f12' },
  flying: {  color: '#00BFFF' },
  psychic: {  color: '#F85888' },
  bug: {  color: '#4d7c0f' },
  rock: {  color: '#A0522D' },
  ghost: {  color: '#705898' },
  dark: {  color: '#705848' },
  steel: {  color: '#C0C0C0' },
  dragon: {  color: '#1e1b4b ' },
  fairy: {  color: '#D685AD' }
};
