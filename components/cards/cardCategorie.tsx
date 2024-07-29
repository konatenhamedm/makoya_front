"use client";

import Image from "next/image";
import React from "react";

interface CardMarqueProps {
  onClick: () => void;
  image: string;
  id: number;
  label: string;
  selected?: boolean;
}

const CardCategorie: React.FC<CardMarqueProps> = ({
  image,
  id,
  label,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-300 p-5 cursor-pointer hover:-translate-y-2 transition-all relative h-[180px]" // Hauteur fixe définie ici
    >
      <div className="w-7 h-8 flex items-center justify-center rounded-full  absolute top-0 bg-transparent right-0">
        {/* SVG or any other content */}
      </div>

      <div className="h-[50px] md:h-[100px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-1 mb-1">
        <Image
          width={100}
          height={100}
          src={image}
          alt={label}
          className="h-full w-full object-contain rounded-lg"
        />
      </div>

      <div>
        <div className="categorie-label font-medium text-sm justify-center text-center whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </div>
      </div>
    </div>
  );
};

export default CardCategorie;
