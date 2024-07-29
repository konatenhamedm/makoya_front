"use client";

import React, { useEffect, useState } from "react";
import { Rating, initTE, Ripple } from "tw-elements";
import Noter from "./reseaux/Noter";
import { useRouter } from "next/navigation";
import ListeLi from "./ListeLi";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import { Details } from "@/modeles/Details";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import GrandTitre from "./GrandTitre";
import Pagination from "@/components/Pagination";
import { Paginate } from "@/components/Paginate";
import CardBlocServiceDetails from "./CardBlocServiceDetails";
import Image from "next/image";
import PubCategorie from "./slides/PubCategorie";
import { categorie } from "@/modeles/Categorie";

interface ServiceDetailsProps {
  categorie: any;
  ville: any;
  search: string;
  position?: any;
}
const ServiceDetailsSearch: React.FC<ServiceDetailsProps> = ({
  categorie,
  ville,
  search,
  position,
}) => {
  const [services, setServices] = useState<Details[]>([]);
  const [sousCategories, setSousCategories] = useState();
  const [liked, setLiked] = React.useState(false);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [Error, setError] = useState();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [noteFilter, setNoteFilter] = useState<number | null>(null);
  const [quartierFilter, setQuartierFilter] = useState<string | null>(null);
  const [villes, setVilles] = useState<categorie[]>([]);

  const onLike = 1;
  const onUnlike = 2;
  const note = 5;

  useEffect(() => {
    /* const use = async () => {
      (await import("tw-elements")).default;
    };
    use(); */

    axiosAuthapi
      .get("/general/services/search/" + categorie + "/" + ville + "/" + search)
      .then((res) => {
        setServices(res.data.data.services);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [categorie]);

  const handleLike = (id: number) => {
    setLiked(true);
  };

  useEffect(() => {
    const storedVilles = localStorage.getItem("villes");
    if (storedVilles) {
      const parsedVilles = JSON.parse(storedVilles);

      setVilles(parsedVilles);

      /* setInitialValues({
        categorie: parsedCategories.length > 0 ? parsedCategories[0].id : "",
        search: "",
        ville: parsedVilles.length > 0 ? parsedVilles[0].id : "",
      }); */
    } else {
      axiosAuthapi
        .get("/general")
        .then((res) => {
          const villesData = res.data.data.villes;
          setVilles(villesData);
          localStorage.setItem("villes", JSON.stringify(villesData));
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    axiosAuthapi
      .get("/sousCategorie/getOne/" + categorie)
      .then((res) => {
        setSousCategories(res.data.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [categorie]);

  const handleUnlike = (id: number) => {
    setLiked(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusFilter(value === "" ? null : value);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setNoteFilter(Number.isNaN(value) ? null : value);
  };

  const handleQuartierChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuartierFilter(event.target.value);
  };

  const filteredServices = services.filter((service) => {
    return (
      (statusFilter === null || service.prestataire.statut === statusFilter) &&
      (noteFilter === null || service.note === noteFilter) &&
      (quartierFilter === null || service.prestataire.ville === quartierFilter)
    );
  });

  const paginatedPosts = Paginate(filteredServices, currentPage, pageSize);

  return (
    <>
      <PubCategorie id={categorie} />
      <br />
      <GrandTitre
        lien="detail"
        titre={"Resultats de la recherche"}
        color="black"
      />
      <div className="flex gap-4 mb-1 pl-1 pr-5  ">
        <select
          onChange={handleStatusChange}
          value={statusFilter || ""}
          className="w-1/3 border-1 border-gray-400 rounded-md p-1"
        >
          <option value="">Tous</option>
          <option value="Oui">Certifié</option>
          <option value="Non">Non Certifié</option>
        </select>
        <select
          onChange={handleNoteChange}
          value={noteFilter || ""}
          className="w-1/3 border-1 border-gray-400 rounded-md p-1"
        >
          <option value="">Toutes les notes</option>
          {[0, 1, 2, 3, 4, 5].map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>
        <select
          onChange={handleQuartierChange}
          value={quartierFilter || ""}
          className="w-2/5 border-1 border-gray-400 rounded-md p-1"
        >
          <option value="">Tous les quartiers</option>
          {villes.map((ville) => (
            <option key={ville.id} value={ville.libelle}>
              {ville.libelle}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 pt-5 lg:mb-0 md:mb-16 px-0 bg-white">
        <div className="flex flex-col lg:w-9/12 w-full rounded-2xl gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="mt-7 flex flex-col justify-center items-center">
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
            <>
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((service: Details) => (
                  <CardBlocServiceDetails key={service.id} service={service} />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <Image
                    width={500}
                    height={500}
                    src="/assets/search_notfound.svg"
                    alt="Empty illustration"
                  />
                  <h1 className="text-2xl font-bold">Aucun service trouvé.</h1>
                </div>
              )}

              {paginatedPosts.length > 0 && (
                <Pagination
                  items={filteredServices.length}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                />
              )}
            </>
          )}
        </div>

        <div className="flex flex-col lg:w-3/12 w-full bg-white rounded-2xl dark:text-white overflow-hidden">
          <div className="bg-white rounded-2xl border shadow-x1 p-10 mb-4">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                NewsLetters
              </h1>
              <p className="text-sm text-gray-500 text-center w-5/6">
                Inscrivez-vous à notre newsletter pour être toujours bien
                informé !
              </p>
              <input
                type="text"
                placeholder="Nom"
                className="border-2 rounded-lg w-full h-12 px-4"
              />
              <input
                type="text"
                placeholder="Email"
                className="border-2 rounded-lg w-full h-12 px-4"
              />
              <button className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full">
                JE M&apos;INSCRIS
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border shadow-x1 p-4 mb-4">
            <span className="font-bold text-xl">
              Les services les plus visités
            </span>
            <div className="flex flex-col items-center space-y-4 pt-4">
              <div className="w-full">
                <ul>
                  <ListeLi text="It is a long established fact reader" />
                  <ListeLi text="It is a long established fact reader" />
                  <ListeLi text="The point of using Lorem Ipsum" />
                  <ListeLi text="There are many variations of passages" />
                  <ListeLi text="If you are going to use a of Lorem" />
                  <a
                    href="#"
                    className="text-[#0070F0] font-semibold hover:underline"
                  >
                    Voir plus {">"}
                  </a>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-2xl border shadow-x1 p-4 mb-4">
            <span className="font-bold text-xl">
              Les sous-catégories les plus visitées
            </span>
            <div className="flex flex-col items-center space-y-4 pt-4">
              <div className="w-full">
                <ul>
                  <ListeLi text="It is a long established fact reader" />
                  <ListeLi text="It is a long established fact reader" />
                  <ListeLi text="The point of using Lorem Ipsum" />
                  <ListeLi text="There are many variations of passages" />
                  <ListeLi text="If you are going to use a of Lorem" />
                  <a
                    href="#"
                    className="text-[#0070F0] font-semibold hover:underline"
                  >
                    Voir plus {">"}
                  </a>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
        <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
      </div>
    </>
  );
};

export default ServiceDetailsSearch;
