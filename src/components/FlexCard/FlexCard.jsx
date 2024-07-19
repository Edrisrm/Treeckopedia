import React from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import pikachuImage  from '../../assets/cring_pikachu.gif'

const FlexCard = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
        <div className="flex flex-col justify-center items-center col-span-full mt-20 mb-20">
          <img src={pikachuImage} alt="No match found" className="h-72 w-72" />
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
