"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { IconType } from "react-icons";
import { Card } from "@nextui-org/react";
import Image from "next/image";

//import { , useState } from 'react';

interface CategoryBoxProps {
  image: string;
  //icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryAllBox: React.FC<CategoryBoxProps> = ({
  image,
  //image: Icon,

  label,

  selected,
}) => {
  /*  ${selected ? "border-b-neutral-800" : "border border-gray-600 ronded-lg"} */
  return (
    <Card
      className={`
    max-w-full w-[540px] h-[180px] items-center  pt-2.5 cursor-pointer 
    transition
    text-black
    border-none
    hover:bg-[#FF6600]  hover:text-white
    ${selected ? "border-b-neutral-800" : "border border-gray-600 ronded-lg"}
     `}
    >
      <div
        className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        h-24
        p-3
         w-full
        hover:bg-[#FF6600]    hover:text-white
        text-black
        `}
      >
        <Image src={image} alt={label} width={26} height={26} />
        {/* <Icon size={26} /> */}
        <div className="categorie-label font-medium text-sm justify-center text-center">
          {label}
        </div>
      </div>
    </Card>
  );
};

export default CategoryAllBox;
