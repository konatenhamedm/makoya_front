import { useCallback, useState } from "react";
import styles from "../app/Spinner.module.css";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize); // 100/10
    const [isLoading, setIsLoading] = useState(false);
   
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const pages_2 = Array.from({ length: pagesCount }, (_, i) => i - 1);
   
     return (



<div className="flex flex-col items-center">
{isLoading == true && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
 {/*  <a href="#" onClick={() => onPageChange(currentPage-1)} disabled className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg
   hover:bg-gray-100 hover:text-gray-700
    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
     dark:hover:bg-gray-700 dark:hover:text-white disabled">
    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </a>
  <a href="#" onClick={() => onPageChange(currentPage+1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Next
    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </a>
 */}
  <div className="inline-flex mt-2 xs:mt-0">
  
    <button onClick={() => onPageChange(currentPage-1)}
     disabled={currentPage == 1} 
     className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        Précedent
    </button>
    <button  onClick={() => onPageChange(currentPage+1)}
     disabled={currentPage == pagesCount}  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Suivant
        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  
</div>
{/*   <div>
        <ul className={styles.pagination}>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? styles.pageItemActive : styles.pageItem
              }
            >
              <a className={styles.pageLink} onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
        
      </div> */}
</div>
   );
   };
   
   export default Pagination;