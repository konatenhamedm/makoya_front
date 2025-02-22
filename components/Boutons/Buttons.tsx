"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  //  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  // onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      // onClick={onClick}
      className={`
        relative
        rounded-lg
        hover:opacity-80
        transition
        w-full
        cursor-pointer 
        ${outline ? "bg-indigo-500" : "bg-indigo-500"}
        ${outline ? "border-white" : "border-white"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
