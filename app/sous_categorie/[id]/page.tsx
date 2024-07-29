"use client";

import Banner from "@/components/Banner";
import PubCategorie from "@/components/slides/PubCategorie";
import PubSousCategorie from "@/components/slides/PubSousCategorie";
import { axiosAuthapi } from "@/lib/axios";
import { SousCategorie } from "@/modeles/SousCategorie";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import NewsLetter from "@/components/newsLetter";

function page({ params }: { params: { id: string; libelle: string } }) {
  const [sousCategories, setSousCategories] = useState<SousCategorie[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null); // Changed Error to error for consistency
  const router = useRouter();

  const searchFilter = (array: SousCategorie[]) => {
    const result = array
      ? array.filter((el) => el.libelle.toLowerCase().includes(query))
      : [];
    return result;
  };

  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        //const storedSousCategories = localStorage.getItem("sousCategories");

        /* if (storedSousCategories) {
          setSousCategories(JSON.parse(storedSousCategories));
          setLoading(false);
        } else { */
        const response = await axiosAuthapi.get(
          `/sousCategorie/sous_categories/${params.id}`
        );
        setSousCategories(response.data.data);
        /*   localStorage.setItem(
            "sousCategories",
            JSON.stringify(response.data.data)
          ); */
        setLoading(false);
        /* } */
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSousCategories();
  }, [params.id]);

  const handleClick = useCallback(
    (id_categorie: number, libelle: string) => {
      router.push(`/details/sous_categorie/${id_categorie}`);
    },
    [router]
  );

  const filteredsousCategories = searchFilter(sousCategories);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="mt-12 mb-20 px-0 md:px-0 lg:px-0">
      <div className="mb-10 py-3"></div>
      <PubCategorie id={parseInt(params.id)} />
      <br />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pr-4">
        <div className="md:col-span-3">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 w-full"
            shadow="sm"
          >
            <CardHeader className="w-full">
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
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <div className="flex items-center justify-center h-[491px]">
                  <div className="mt-7 flex justify-center">
                    <div
                      id="loadingTE"
                      className="w-full flex justify-center items-center"
                    >
                      <div
                        data-te-loading-icon-ref
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      ></div>
                      <br />
                      <span data-te-loading-text-ref>Chargement...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[491px]">
                  <div className="mt-[-275px] w-full">
                    <ul className=" flex-col w-full dark:divide-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      {filteredsousCategories.map((souscategorie, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleClick(souscategorie.id, souscategorie.libelle)
                          }
                        >
                          <a
                            onClick={() =>
                              handleClick(
                                souscategorie.id,
                                souscategorie.libelle
                              )
                            }
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <Image
                              width={20}
                              height={20}
                              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                              src="/assets/icon.webp"
                              alt={souscategorie.libelle}
                            />
                            <span className="ml-3">
                              {souscategorie.libelle}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    {filteredsousCategories.length === 0 && (
                      <div className="flex flex-col justify-center items-center">
                        <img
                          src="/assets/search_notfound.svg"
                          alt="Empty illustration"
                        />
                        <h1 className="text-2xl font-bold">Aucun résultat</h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-4">
          <NewsLetter />
          <hr className="seperator" />
          <div className="h-[255px] bg-gradient-to-r from-purple-600 to-blue-600 font-sans p-6 flex flex-col items-center justify-center">
            <h3 className="text-white text-3xl font-bold mb-4">Annoncer</h3>
            <h3 className="text-white text-3xl font-bold mb-4">
              gratuitement ici
            </h3>
            <Button
              className="text-white w-full mt-10"
              color="warning"
              radius="full"
              size="lg"
            >
              Créer un compte gratuitement
            </Button>
          </div>
          {/*  <div className="h-[250px] bg-gradient-to-r from-purple-600 to-blue-600 font-sans p-6 flex flex-col items-center justify-center">
            <h3 className="text-white text-3xl font-bold mb-4">Annoncer</h3>
            <h3 className="text-white text-3xl font-bold mb-4">
              gratuitement ici
            </h3>
            <Button
              className="text-white w-full mt-10"
              color="warning"
              radius="full"
              size="lg"
            >
              Créer un compte gratuitement
            </Button>
          </div> */}
        </div>
      </div>
      <Banner />
    </div>
  );
}

export default page;
