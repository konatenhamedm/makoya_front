"use client";
import { useRouter } from "next/navigation";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import React, { useCallback } from "react";

interface CategoryBoxProps {
  image: string;
  id: number;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ image, id, label }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    alert("Sous-catégorie non implémentée"); // Optionnel : Message d'alerte
    router.push(`/sous_categorie/${id}`);
  }, [router, id]);

  return (
    <Card
      onClick={handleClick}
      className={`
        max-w-full w-[540px] h-[100px] items-center pt-2.5 cursor-pointer 
        transition text-black border-none
        hover:bg-[#FF6600] hover:text-white
      `}
    >
      <div
        className={`
        flex items-center justify-center gap-2 h-24 p-3 flex-col w-full
        hover:bg-[#FF6600] hover:text-white text-black
      `}
      >
        <Image src={image} alt={label} width={26} height={26} />
        <div className="categorie-label font-medium text-sm justify-center text-center">
          {label}
        </div>
      </div>
    </Card>
  );
};

export default CategoryBox;
