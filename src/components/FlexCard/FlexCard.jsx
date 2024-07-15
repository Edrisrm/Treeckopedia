import React from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

const FlexCard = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="w-full pb-52 pt-16 grid place-content-center">
        <div className="w-[350px] h-[150px] bg-red-500 text-white flex items-center justify-center rounded-3xl">
          {!data ? "No has hecho una búsqueda" : "Escribiste mal un nombre"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-52 pt-16 grid place-content-center">
      <div className="w-[350px] h-[590px] bg-transparent cursor-pointer group rounded-3xl perspective-1000">
        <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
          <FrontCard data={data} />
          <BackCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default FlexCard;
