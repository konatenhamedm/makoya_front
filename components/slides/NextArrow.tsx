import React from "react";
import { BsChevronRight } from "react-icons/bs";

interface PrevArrowProps {
  onClick: () => void;
}
const NextArrow: React.FC<PrevArrowProps> = ({ onClick }) => {
  return (
    <div className="absolute right-0 top-[80px] " onClick={onClick}>
      <div className="bg-[#0076d7]  h-[50px] rounded-full text-white grid place-items-center cursor-pointer">
        <BsChevronRight />
      </div>
    </div>
  );
};
/* function NextArrow({onClick}) {
  return (
    <div className='absolute right-0 top-[80px] ' onClick={onClick}>
        <div className='bg-[#fab1a0]  h-[50px] rounded-full grid place-items-center cursor-pointer'>
         <BsChevronRigth/>
        </div>
    </div>
  )
} */

export default NextArrow;
