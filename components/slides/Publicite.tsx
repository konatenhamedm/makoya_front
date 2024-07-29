import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { Button } from "@nextui-org/react";
import PubSousCategorieTester from "./PubSousCategorieTester";
import useLoginModal from "@/hooks/useLoginModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosAuthapi } from "@/lib/axios";
import NewsLetter from "../newsLetter";

function Publicite() {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    initFlowbite();
  }, []);

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
    <div className="flex flex-col w-full pt-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-0 mb-4">
      <div className="h-[292px] rounded-lg">
        <div className="bg-[#dfe2e6] font-sans p-6 h-[292px] rounded-lg flex justify-center items-center">
          <NewsLetter />
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <PubSousCategorieTester ordre={2} />
      </div>
    </div>
  );
}

export default Publicite;
