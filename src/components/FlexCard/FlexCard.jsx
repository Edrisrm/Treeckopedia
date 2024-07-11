import React from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

const FlexCard = () => {
  return (
    <>
      <div className="w-full pb-52 pt-16 grid place-content-center ">
        <div className="w-[350px] h-[590px] bg-transparent cursor-pointer group rounded-3xl perspective-1000">
          <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
            <FrontCard/>
            <BackCard/>            
          </div>
        </div>
      </div>
    </>
  );
};

export default FlexCard;
