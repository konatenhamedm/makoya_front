import React from "react";
import { BsChevronLeft } from "react-icons/bs";

interface PrevArrowProps {
  onClick: () => void;
}

const PrevArrow: React.FC<PrevArrowProps> = ({ onClick }) => {
  return (
    <div className="absolute right-0 top-[80px] " onClick={onClick}>
      <div className="bg-[#0076d7]  h-[50px] rounded-full text-white grid place-items-center cursor-pointer">
        <BsChevronLeft />
      </div>
    </div>
  );
};
/* function PrevArrow: React.FC<PrevArrowProps> = ({onClick})=> {
  return (
    <div className='absolute right-0 top-[80px] ' onClick={onClick}>
        <div className='bg-[#fab1a0]  h-[50px] rounded-full grid place-items-center cursor-pointer'>
         <BsChevronLeft/>
        </div>
    </div>
  )
} */

export default PrevArrow;
