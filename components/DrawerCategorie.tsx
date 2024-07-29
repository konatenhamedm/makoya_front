"use client";
import React from "react";
import { useEffect, useState } from "react";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import { categorie } from "@/modeles/Categorie";
import { useRouter } from "next/navigation";
import Image from "next/image";

function DrawerCategorie() {
  const [categories, setCategories] = useState<categorie[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const searchFilter = (array: categorie[]) => {
    return array.filter((el) => el.libelle.toLowerCase().includes(query));
  };

  const filteredCategories = searchFilter(categories);

  //Handling the input on our search bar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
      setLoading(false);
    } else {
      axiosAuthapi
        .get("/categorie")
        .then((res) => {
          setCategories(res.data.data);
          localStorage.setItem("categories", JSON.stringify(res.data.data));
          setLoading(false);
        })
        .catch((err) => {
          //setError(err.message);
        });
    }
  }, []);

  return (
    <div
      id="drawer-right-example"
      className="fixed 
      top-0
       right-0 
       z-50 
       h-screen
      p-4 
      overflow-x-hidden 
      outline-none 
      focus:outline-none
     
      transition-transform 
      translate-x-full
       bg-white w-2/3
        dark:bg-gray-800"
      aria-labelledby="drawer-right-label"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <button
            type="button"
            data-drawer-hide="drawer-right-example"
            aria-controls="drawer-right-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 left-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            //onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div>
          {" "}
          <h5
            id="drawer-right-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            Toutes les Catégories
          </h5>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Rechercher...
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onChange={handleChange}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10"
              placeholder="Recherche..."
            />
          </div>
        </form>
      </div>
      {isLoading == true ? (
        <div className="items-center justify-center h-[400px]">
          <div className="mt-7 ">
            <div className=" flex-col justify-center items-center grid grid-cols-2 sm:grid-cols-4 ">
              <div></div>
              <div></div>
              <div>
                <div
                  id="loadingTE"
                  className="w-full justify-center items-center"
                >
                  <div
                    data-te-loading-icon-ref
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] justify-center items-center"
                    role="status"
                  ></div>
                  <br />
                  <span data-te-loading-text-ref>Chargement...</span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7">
          <ul className=" flex-col w-full  dark:divide-gray-700 grid grid-cols-4 gap-2">
            {filteredCategories &&
              filteredCategories.map((categorie, index) => (
                <li
                  key={index}
                  onClick={() => router.push(`/sous_categorie/${categorie.id}`)}
                >
                  <a
                    onClick={() =>
                      router.push(`/sous_categorie/${categorie.id}`)
                    }
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <Image
                      width={50}
                      height={50}
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      src={`${BASE_SITE}` + categorie.imageLaUne.fileNamePath}
                      alt={categorie.libelle}
                    />

                    <span className="ml-3">{categorie.libelle}</span>
                  </a>
                </li>
              ))}
          </ul>
          {filteredCategories.length === 0 && (
            <div className="flex flex-col justify-center items-center">
              <Image
                width={200}
                height={200}
                src="/assets/search_notfound.svg"
                alt="Empty illustration"
              />
              <h1 className="text-2xl font-bold">Aucun résultat</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DrawerCategorie;
