import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrandTitre from "./GrandTitre";
import Pagination from "@/components/Pagination";
import { Paginate } from "@/components/Paginate";
import { axiosAuthapi } from "@/lib/axios";
import { Details } from "@/modeles/Details";
import CardBlocServiceDetails from "./CardBlocServiceDetails";
import * as Yup from "yup";
import { useFormik } from "formik";
import Image from "next/image";
import { categorie } from "@/modeles/Categorie";
import ListeLi from "./ListeLi";

interface ServiceDetailsProps {
  id: number;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ id }) => {
  const [services, setServices] = useState<Details[]>([]);
  const [sousCategories, setSousCategories] = useState<string>("");

  const [liked, setLiked] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [Error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [noteFilter, setNoteFilter] = useState<number | null>(null);
  const [quartierFilter, setQuartierFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [villes, setVilles] = useState<categorie[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedVilles = localStorage.getItem("villes");

    const fetchData = async () => {
      try {
        const response = await axiosAuthapi.get(`/general/services/${id}`);
        setServices(response.data.data.services);
        setLoading(false);
      } catch (error) {
        setError("Une erreur s&apos;est produite");
        setLoading(false);
      }
    };

    fetchData();
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
  }, [id]);

  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        const response = await axiosAuthapi.get(`/sousCategorie/getOne/${id}`);
        setSousCategories(response.data.data);
      } catch (error) {
        setError("Une erreur s&apos;est produite");
      }
    };

    fetchSousCategories();
  }, [id]);

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

  const paginatedServices = Paginate(filteredServices, currentPage, pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [Loading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const formik = useFormik({
    initialValues: {
      nom: "",
      email: "",
    },

    validationSchema: Yup.object({
      nom: Yup.string().required("Vous devez renseigner votre nom"),
      email: Yup.string()
        .email("Email invalide")
        .required("Vous devez renseigner votre prénoms"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      const data = {
        nom: values.nom,
        email: values.email,
      };

      await axiosAuthapi
        .post("/newsletter/create", data)
        .then((response) => {
          setIsLoading(false);
          if (response.data) {
            setMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <div className="sticky-top">
        <GrandTitre lien="detail" titre={sousCategories} color="black" />

        <div className="flex gap-4 mb-1 pl-1 pr-5 border-b-4 border-[#FFA726] pb-2">
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
      </div>
      <div className="flex flex-col lg:flex-row gap-4 pt-5 lg:mb-0 md:mb-16 px-0 bg-white">
        <div className="scrollable-left lg:w-9/12 w-full rounded-2xl gap-4">
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
              {paginatedServices.length > 0 ? (
                paginatedServices.map((service: Details) => (
                  <CardBlocServiceDetails key={service.id} service={service} />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <Image
                    width={200}
                    height={200}
                    src="/assets/search_notfound.svg"
                    alt="Empty illustration"
                  />
                  <h1 className="text-2xl font-bold">Aucun service trouvé.</h1>
                </div>
              )}

              {paginatedServices.length > 0 && (
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

        <div className="flex flex-col lg:w-3/12 w-full bg-white rounded-2xl dark:text-white overflow-hidden sticky-top2">
          <div className="bg-white rounded-2xl border shadow-x1 p-10 mb-4">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                NewsLetters
              </h1>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="flex flex-col items-center space-y-4 w-full"
              >
                <p className="text-sm text-gray-500 text-center w-Full ">
                  Inscrivez-vous à notre newsletter pour être toujours bien
                  informé !
                </p>

                {(touched.nom && errors.nom) ||
                (touched.email && errors.email) ? (
                  <p className="text-sm text-center w-Full text-[#FFA726]">
                    {"Vous devez renseigner tous les champs"}
                  </p>
                ) : (
                  ""
                )}

                {message && (
                  <p className="text-sm text-center w-Full text-green-500">
                    {message}
                  </p>
                )}

                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={values.nom}
                  onChange={handleChange}
                  className="border-2 rounded-lg w-full h-10 px-4"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  className="border-2 rounded-lg w-full h-10 px-4"
                />

                <button
                  type="submit"
                  className="bg-[#FFA726] text-white rounded-md hover:bg-green-700 font-semibold px-4 py-2 w-full"
                >
                  {Loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                  JE M&apos;INSCRIS
                </button>
              </form>
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

          <div className="bg-white rounded-2xl border shadow-x1 p-4 mb-4">
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
          </div>
        </div>
        <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
      </div>
    </>
  );
};

export default ServiceDetails;
