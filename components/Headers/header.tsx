"use client";
import React, { useCallback, useEffect, useState } from "react";
import Infos from "./Infos";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import DrawerView from "./DrawerView";
import { axiosAuthapi } from "@/lib/axios";
import { categorie } from "@/modeles/Categorie";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";

function Header() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<categorie[]>([]);
  const [villes, setVilles] = useState<categorie[]>([]);
  const [initialValues, setInitialValues] = useState({
    categorie: "17",
    search: "",
    ville: "8",
  });

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedVilles = localStorage.getItem("villes");
    const storedCategories = localStorage.getItem("categories");

    if (storedVilles && storedCategories) {
      const parsedVilles = JSON.parse(storedVilles);
      const parsedCategories = JSON.parse(storedCategories);
      setVilles(parsedVilles);
      setCategories(parsedCategories);
      setInitialValues({
        categorie: parsedCategories.length > 0 ? parsedCategories[0].id : "",
        search: "",
        ville: parsedVilles.length > 0 ? parsedVilles[0].id : "",
      });
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
      axiosAuthapi
        .get("/categorie")
        .then((res) => {
          const categoriesData = res.data.data;
          setCategories(categoriesData);
          localStorage.setItem("categories", JSON.stringify(categoriesData));
          setInitialValues({
            categorie: categoriesData.length > 0 ? categoriesData[0].id : "",
            search: "",
            ville: "",
          });
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, []);

  const handleClick = useCallback(() => {
    router.push("/annonces");
  }, [router]);

  const handleHomeClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: Yup.object({}),

    onSubmit: async (values) => {
      if (typeof window !== "undefined") {
        const url = `/recherche?categorie=${values.categorie}&search=${values.search}&ville=${values.ville}`;
        window.location.href = url;
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <header className="shadow-sm bg-white font-sans-serif min-h-70px fixed border-b-1 top-0 left-0 right-0 z-40 mb-12">
      <section className="bg-black bg-opacity-50 max-h-40px px-1 py-2 sm:px-10 flex items-center flex-wrap">
        <ul className="flex lg:ml-8 lg:space-x-4 max-lg:block max-lg:w-full">
          <li className="max-lg:border-b max-lg:py-2 px-3 hidden lg:block">
            <a
              href="#"
              className="text-[#FFA726] hover:text-FFA726 text-15px block font-semibold"
            >
              Education
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 hidden lg:block">
            <a
              href="#"
              className="text-[#FFA726] hover:text-FFA726 text-15px block font-semibold"
            >
              Restauration
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 hidden lg:block">
            <a
              href="#"
              className="text-[#FFA726] hover:text-FFA726 text-15px block font-semibold"
            >
              Beauté
            </a>
          </li>
        </ul>

        <div className="ml-auto text-white flex items-center space-x-10 max-lg:space-y-2 max-lg:block max-lg:w-full">
          <a
            href="#"
            onClick={() => router.push("/annonces")}
            className="text-white block text-15px font-medium"
          >
            <div className="ml-4 text-xs inline-flex items-center image-clignote font-bold leading-sm uppercase px-3 py-1 bg-red-600 text-white rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
              Annonces gratuites
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-activity ml-2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
          </a>
        </div>
      </section>

      <div className="flex justify-between sm:px-10 px-6 py-3 lg:gap-y-4 gap-y-6 gap-x-4">
        <div className="flex items-center">
          <a
            href="#"
            onClick={async () => {
              router.push("/");
            }}
            className="ml-6"
          >
            <Image
              src="/assets/appatam_logo-removebg-preview.png"
              alt="logo"
              className="w-36"
              width={300}
              height={150}
            />
          </a>
        </div>

        <div className="flex rounded-md border-none overflow-hidden lg:w-2/4 max-md:w-full mx-auto font-sans-serif">
          {pathname === "/annonces" ? (
            <ul className="flex flex-col lg:flex-row lg:ml-8 lg:space-x-4 max-lg:block max-lg:w-full lg:space-y-0 max-lg:space-y-2">
              <li className="max-lg:border-b max-lg:py-2 px-3">
                <a
                  href="#"
                  className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold"
                >
                  NOS SUCCESS
                </a>
              </li>
              <li className="max-lg:border-b max-lg:py-2 px-3">
                <a
                  href="#"
                  className="text-black hover:text-[#FFA726] text-[15px] block font-semibold"
                >
                  INSCRIVEZ VOTRE ENTREPRISE
                </a>
              </li>
              <li className="max-lg:border-b max-lg:py-2 px-3">
                <a
                  href="#"
                  className="text-black hover:text-[#FFA726] text-[15px] block font-semibold"
                >
                  FAQ
                </a>
              </li>
            </ul>
          ) : (
            <>
              <form
                action="/recherche"
                method="GET"
                className="flex w-full"
                onSubmit={formik.handleSubmit}
              >
                <select
                  value={formik.values.categorie}
                  name="categorie"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3 rounded-l-lg lg:w-1/3"
                >
                  <option value="0">Choisir une catégorie </option>
                  {categories.map((category, index) => (
                    <option key={category.id} value={category.id}>
                      {category.libelle}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="search"
                  onChange={formik.handleChange}
                  value={formik.values.search}
                  onBlur={formik.handleBlur}
                  placeholder="Rechercher..."
                  className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
                />
                <select
                  onChange={formik.handleChange}
                  value={formik.values.ville}
                  onBlur={formik.handleBlur}
                  name="ville"
                  className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3 lg:w-1/3"
                >
                  <option value="0">Choisir une commune </option>
                  {villes.map((ville) => (
                    <option key={ville.id} value={ville.id}>
                      {ville.libelle}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="flex items-center justify-center bg-blue-600 px-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192.904 192.904"
                    width="16px"
                    className="fill-white"
                  >
                    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>

        <div className="flex items-center space-x-8 max-md:ml-auto">
          <Infos />
        </div>

        <DrawerView />
      </div>
    </header>
  );
}

export default Header;
