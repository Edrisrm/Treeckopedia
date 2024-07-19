// src/helpers/getTypeSvg.js
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
  normal: {  color: '#A8A878' },
  fire: { color: '#F08030' },
  water: { color: '#6890F0' },
  electric: {  color: '#F8D030' },
  grass: {  color: '#78C850' },
  ice: {  color: '#98D8D8' },
  fighting: {  color: '#C03028' },
  poison: {  color: '#A040A0' },
  ground: {  color: '#E0C068' },
  flying: {  color: '#A890F0' },
  psychic: {  color: '#F85888' },
  bug: {  color: '#A8B820' },
  rock: {  color: '#B8A038' },
  ghost: {  color: '#705898' },
  dark: {  color: '#705848' },
  steel: {  color: '#B8B8D0' },
  dragon: {  color: '#EE99AC' },
  fairy: {  color: '#D685AD' }
};
