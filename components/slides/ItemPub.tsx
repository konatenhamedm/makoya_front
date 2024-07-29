"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

interface ItemProps {
  image: string;
  titre?: string;
  desc?: string;
  bouton?: string;
  lien?: string;
}

const ItemPub: React.FC<ItemProps> = ({ image, titre, desc, bouton, lien }) => {
  return (
    /*  <div className="w-full flex flex-col h-[255px] overflow-hidden rounded-lg md:h-[255px] cursor-pointer ">
      <div className="z-20 relative text-white container mx-auto">
        
      </div>
      <div className="absolute  h-auto z-10 w-full">
        <Image
          height={100}
          src={image}
          alt=""
          className="w-full object-fit-cover  "
        />
      </div>
    </div> */

    <div className="w-full flex flex-col h-[292px] overflow-hidden rounded-b-lg md:h-[255px] cursor-pointer relative">
      <div className="z-20 relative text-white container">
        {/*  <p className="leading-normal mb-1 mt-5"></p>
        <Button color="primary" variant="ghost">
          <a href={lien ? lien : "#"} className="text-white " target="_blank">
            {bouton ? bouton : "Visiter le lien"}
          </a>
        </Button> */}
      </div>
      <div className="absolute inset-0 z-10 w-full h-full">
        {/*    <Image
  src={image}
  alt=""
  width={292}
  height={292}
  className="w-full h-full object-cover brightness-125"
  style={{ objectFit: "cover" }}
/> */}
        <img
          style={{ objectFit: "cover" }}
          width={292}
          height={292}
          src={image}
          alt=""
          className="w-full h-full object-cover brightness-125"
        />
      </div>
      <div className="z-20 relative text-white container flex flex-col justify-center items-start h-full">
        <p className="leading-normal mb-1"></p>
        {/*       <Button
          className="text-white text-extrabold w-[143px] opacity-75 bg-[#FFA726]"
          
          radius="full"
          size="sm"
        >
          <a
            href={lien ? lien : "#"}
            className="text-white text-extrabold text-xl"
            target="_blank"
          >
            {bouton ? bouton : "Visiter le lien"}
          </a>
        </Button> */}
      </div>
    </div>
  );
};

export default ItemPub;
