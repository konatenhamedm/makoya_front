"use client";
import React from "react";
import { Image } from "@nextui-org/react";
import Noter from "../reseaux/Noter";

interface ActiviteBlocProps {
  image: string;
  titre: string;
  situationPrestataire: string;
  situationUtilisateur: string;
  commentaire: string;
  profil: string;
  nomUtilisateur: string;
  note: number;
  whatsappNumber: string;
  whatsapp: boolean;
  serviceLibelle: string;
}

const ActiviteBloc: React.FC<ActiviteBlocProps> = ({
  image,
  titre,
  commentaire,
  profil,
  nomUtilisateur,
  situationPrestataire,
  situationUtilisateur,
  note,
  whatsappNumber,
  whatsapp,
  serviceLibelle,
}) => {
  const openWhatsApp = () => {
    const message = "Bonjour, je suis intéressé par votre service.";
    const whatsappUrl = `https://wa.me/${"0142325260"}?text=${encodeURIComponent(
      message
    )}`;
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="max-w-full bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3>
        <span className="mb-3 text-xl font-bold text-indigo-600">{titre}</span>
        <span className="mb-3 text-xl font-bold text-indigo-600">{"-"}</span>
        <span className="mb-3 text-md font-bold text-indigo-600">
          {" "}
          {situationPrestataire}
        </span>
      </h3>
      <div className="relative">
        {/* <Image
          width={540}
          height={1000}
          className="w-full rounded-xl h-48 object-cover"
          src={image}
          alt={titre}
          // layout="fill"
          // objectFit="cover"
        /> */}

        <img
          style={{ objectFit: "cover" }}
          width={292}
          height={292}
          src={image}
          alt=""
          className="w-full h-[252px] rounded-xl object-cover brightness-125"
        />
        <p
          className="absolute top-0 right-0 bg-yellow-300 text-white font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"
          style={{ zIndex: 99999 }}
        >
          {serviceLibelle}
        </p>
      </div>
      <div className="p-1">
        <div className="flex gap-2 items-center justify-between">
          <Image
            alt="Profile picture"
            className="rounded-full w-11 h-11 bg-black"
            src={profil}
          />
          <div className="flex flex-col">
            <p className="text-xs text-black">
              {/* {": "} */}
              {/*  {ville == "Oui" ? (
                <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-white bg-green-500 rounded-full">
                  Certifié
                </span>
              ) : (
                <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  Non certifié
                </span>
              )} */}
              {nomUtilisateur}
            </p>
            <p className="text-xs text-black">{`Habite : ${situationUtilisateur}`}</p>
          </div>
          <Noter note={note} />
        </div>
      </div>
      <p className="mt-4 text-base text-neutral-600 dark:text-neutral-200 cursor-pointer">
        {commentaire} ...
      </p>
      <div className="my-4">
        <button
          type="button"
          onClick={openWhatsApp}
          className="text-xl w-full rounded px-6 py-2.5 bg-green-500 font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 inline"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>Converser</span>
        </button>
      </div>
    </div>
  );
};

export default ActiviteBloc;
