"use client";

import React, { useEffect, useState } from "react";
import { Details } from "@/modeles/Details";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import Noter from "./reseaux/Noter";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import Image from "next/image";

interface CardBlocServiceDetailsProps {
  service: Details;
}

const CardBlocServiceDetails: React.FC<CardBlocServiceDetailsProps> = ({
  service,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [liked, setLiked] = React.useState(false);
  const [etat, setEtat] = useState(true);
  const [query, setQuery] = useState("");
  const [Error, setError] = useState();
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(session);

  useEffect(() => {
    setCurrentUser(session);
  });

  const handleUnlike = (id: number) => {
    const data = {
      user: session ? session.user.email : null,
      service: id,
    };

    axiosAuthapi
      .post("/favorie/create", data)
      .then((res) => {
        setLiked(res.data.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <div
        key={service.id}
        className="relative w-full flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0 rounded-md shadow-md p-2 border border-white bg-white hover:cursor-pointer transition hover:shadow-lg"
        onClick={() => {
          router.push("/");
        }}
      >
        <div className="w-full md:w-1/4 bg-white grid place-items-center">
          <Image
            src={`${BASE_SITE}` + service.image.fileNamePath}
            alt="service image"
            height={600}
            width={300}
            className="rounded-xl"
          />
        </div>
        <div className="w-full md:w-3/4 bg-white flex flex-col space-y-4 p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-gray-800 text-lg md:text-2xl">
              {service.service.libelle}
            </h3>

            {session ? (
              <Button
                isIconOnly
                className="text-default-900/60 hover:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => {
                  handleUnlike(service.id);
                }}
              >
                <HeartIcon
                  width={20}
                  height={20}
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "pink" : "none"}
                />
              </Button>
            ) : (
              <Button
                isIconOnly
                className="text-default-900/60 hover:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onClick={loginModal.onOpen}
              >
                <HeartIcon
                  width={20}
                  height={20}
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "pink" : "none"}
                />
              </Button>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="bg-green-600 text-white text-xl px-2.5 py-0.5 rounded">
                4.0
              </span>
              <Noter note={service.note} />
              <span className="px-2 text-gray-600">{service.note} notes</span>
              <span
                className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
                  service.prestataire.statut == "Oui"
                    ? "bg-red-600 text-red-100"
                    : "bg-gray-600 text-gray-100"
                }`}
              >
                {service.prestataire.statut == "Oui"
                  ? "Certifié"
                  : "Non Certifié"}
              </span>
            </div>
          </div>

          <p className="text-base md:text-lg text-gray-500">
            {service.prestataire.denominationSociale}
          </p>
          <div className="flex items-center text-gray-700">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
            </svg>
            <h1 className="px-2 text-sm">{service.prestataire.quartier}</h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <button
              type="button"
              className="w-full md:w-1/3 inline-block rounded bg-[#FFA726] px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FFA726] focus:bg-[#FFA726] active:bg-[#FFA726]"
            >
              {service.prestataire.contactPrincipal}
            </button>
            <button
              type="button"
              className="w-full md:w-1/3 inline-block rounded bg-blue-700 px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700"
            >
              Envoyer une demande
            </button>
            <button
              type="button"
              className="w-full md:w-1/3 inline-flex rounded bg-green-600 px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-green-700 focus:bg-green-700 active:bg-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3.5 w-3.5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.256-.463-2.39-1.477-.883-.788-1.48-1.76-1.653-2.058-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.581-.487-.501-.669-.511l-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.197 5.076 4.482.709.306 1.262.488 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414z" />
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBlocServiceDetails;
