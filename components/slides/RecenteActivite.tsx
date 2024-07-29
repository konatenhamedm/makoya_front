"use client";

import React, { useEffect, useState } from "react";
import GrandTitre from "../GrandTitre";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import { Details } from "@/modeles/Details";
import SkeletonsCommentaire from "../skeletons/SkeletonsCommentaire";
import Image from "next/image";
import ListeLi from "../ListeLi";
import ActiviteBloc from "./ActiviteBloc";

interface RecenteActiviteProps {
  firstTitle: string;
  etat: boolean;
}

const RecenteActivite: React.FC<RecenteActiviteProps> = ({
  firstTitle,
  etat,
}) => {
  const [services, setServices] = useState<Details[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchServices = () => {
    setLoading(true);
    axiosAuthapi
      .get("/general/retour_experience")
      .then((res) => {
        setServices(res.data.data.services);
        localStorage.setItem(
          "services",
          JSON.stringify(res.data.data.services)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const storedServices = localStorage.getItem("services");

    if (storedServices) {
      setServices(JSON.parse(storedServices));
      setLoading(false);
    } else {
      fetchServices();
    }

    const interval = setInterval(() => {
      localStorage.removeItem("services");
      fetchServices();
    }, 86400000); // 86400000 ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 py-3.5 mt-6 pb-2.5">
      <GrandTitre titre={firstTitle} lien="#" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <SkeletonsCommentaire nombre={4} />
        ) : (
          <>
            {etat && (
              <div className="max-w-full bg-white rounded-xl shadow-lg">
                <div className="px-6 pt-6 pb-2">
                  <span className="font-bold text-xl mb-4">
                    Liste pharmacies de garde
                  </span>
                  <input
                    type="text"
                    placeholder="Recherche..."
                    className="border-2 rounded-lg w-full h-12 px-4"
                  />
                  <div className="flex flex-col items-center space-y-4 pt-4">
                    <div className="w-full">
                      <ul>
                        <ListeLi text="Pharmacie soleil 1" />
                        <ListeLi text="Pharmacie pavis" />
                        <ListeLi text="Pharmacie lobia" />
                        <ListeLi text="Pharmacie du grand marché" />
                        <ListeLi text="Pharmacie orli" />
                        <ListeLi text="Pharmacie tazibouo" />
                        <ListeLi text="Pharmacie centrale" />
                        <ListeLi text="Pharmacie labia" />
                        <a
                          href="#"
                          className="text-[#0070F0] font-semibold hover:underline hover:text-blue-500"
                        >
                          Voir plus {">"}
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {services.map((service) => (
              <ActiviteBloc
                key={service.id}
                image={`${BASE_SITE}${service.image.fileNamePath}`}
                titre={service.prestataire.denominationSociale}
                commentaire={service.message}
                profil={`${BASE_SITE}${service.image.fileNamePath}`}
                nom="Konate Hamed"
                serviceVille={service.prestataire.quartier}
                serviceQuartier={service.service.libelle}
                ville={service.prestataire.statut}
                quartier={service.prestataire.quartier}
                note={service.note}
                whatsappNumber={service.prestataire.contactPrincipal}
                whatsapp={true}
              />
            ))}

            {services.length === 0 && (
              <div className="flex flex-col justify-center items-center">
                <img
                  src="/assets/search_notfound.svg"
                  alt="Empty illustration"
                />
                <h1 className="text-2xl font-bold">Aucun résultat</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecenteActivite;
