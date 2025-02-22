import React from "react";

interface ListeLiProps {
  text: string;
}

const ListeLi: React.FC<ListeLiProps> = ({ text }) => {
  return (
    <li className="text-body-color mb-4 flex text-base">
      <span className="text-secondary mr-2 rounded-full text-base">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="fill-current"
        >
          <path d="M10 19.625C4.6875 19.625 0.40625 15.3125 0.40625 10C0.40625 4.6875 4.6875 0.40625 10 0.40625C15.3125 0.40625 19.625 4.6875 19.625 10C19.625 15.3125 15.3125 19.625 10 19.625ZM10 1.5C5.3125 1.5 1.5 5.3125 1.5 10C1.5 14.6875 5.3125 18.5312 10 18.5312C14.6875 18.5312 18.5312 14.6875 18.5312 10C18.5312 5.3125 14.6875 1.5 10 1.5Z"></path>
          <path d="M8.9375 12.1875C8.71875 12.1875 8.53125 12.125 8.34375 11.9687L6.28125 9.96875C6.0625 9.75 6.0625 9.40625 6.28125 9.1875C6.5 8.96875 6.84375 8.96875 7.0625 9.1875L8.9375 11.0312L12.9375 7.15625C13.1563 6.9375 13.5 6.9375 13.7188 7.15625C13.9375 7.375 13.9375 7.71875 13.7188 7.9375L9.5625 12C9.34375 12.125 9.125 12.1875 8.9375 12.1875Z"></path>
        </svg>
      </span>
      <a
        href="https://www.google.com"
        className="hover:underline hover:text-[#0070F0] "
      >
        {text}
      </a>
    </li>
  );
};

export default ListeLi;
