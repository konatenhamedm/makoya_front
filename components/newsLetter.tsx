"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosAuthapi } from "@/lib/axios";

function NewsLetter() {
  const [isLoading, setIsLoading] = useState(false);
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
      <div className="bg-[#dfe2e6] font-sans p-6 h-[292px] rounded-lg flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-bold text-xl text-gray-700 w-4/6 text-center">
            NewsLetters
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="flex flex-col items-center space-y-4 w-full"
          >
            <p className="text-sm text-gray-500 text-center w-Full ">
              Inscrivez-vous à notre newsletter pour être toujours bien informé
              !
            </p>

            {(touched.nom && errors.nom) || (touched.email && errors.email) ? (
              <p className="text-sm text-center w-Full text-red-500">
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
              {isLoading ? (
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
    </>
  );
}

export default NewsLetter;
