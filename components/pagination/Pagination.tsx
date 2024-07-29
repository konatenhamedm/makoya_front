import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        className="pagination justify-center mt-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page-item"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <a
              onClick={() => paginate(number)}
              href="#"
              className="page-link px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
