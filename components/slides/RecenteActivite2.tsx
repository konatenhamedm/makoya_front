"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import SideActivite from "./SideActivite";
import ActiviteBloc from "./ActiviteBloc";

interface RecenteActivite2Props {
  firstTitle: string;
  etat: boolean;
}

const RecenteActivite2: React.FC<RecenteActivite2Props> = ({
  firstTitle,
  etat,
}) => {
  return (
    <div className="w-full py-3.5 mt-6 px-0">
      <h1 className="font-semibold text-2xl">{firstTitle}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* <ActiviteBloc
          image="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          titre="Prestataire"
          commentaire="This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          profil="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          nom="Konate Hamed"
          serviceVille="Daloa"
          serviceQuartier="Huberson"
          ville="Daloa"
          quartier="Soleil 1"
          note={4}
          whatsappNumber="025855578"
          whatsapp={true}
        />
        <ActiviteBloc
          image="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          titre="Prestataire"
          commentaire="This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          profil="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          nom="Konate Hamed"
          serviceVille="Daloa"
          serviceQuartier="Huberson"
          ville="Daloa"
          quartier="Soleil 1"
          note={4}
          whatsappNumber="025855578"
          whatsapp={true}
        />
        <ActiviteBloc
          image="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          titre="Prestataire"
          commentaire="This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          profil="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          nom="Konate Hamed"
          serviceVille="Daloa"
          serviceQuartier="Huberson"
          ville="Daloa"
          quartier="Soleil 1"
          note={4}
          whatsappNumber="025855578"
          whatsapp={true}
        />
        <ActiviteBloc
          image="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          titre="Prestataire"
          commentaire="This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          profil="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
          nom="Konate Hamed"
          serviceVille="Daloa"
          serviceQuartier="Huberson"
          ville="Daloa"
          quartier="Soleil 1"
          note={4}
          whatsappNumber="025855578"
          whatsapp={true}
        /> */}

        {/* Ajoutez les autres ActiviteBloc ici de la même manière */}

        {etat && (
          <Card className="mt-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-xs uppercase font-bold">
                Comment noteriez-vous votre expérience ?
              </p>
            </CardHeader>
            <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SideActivite />
                <SideActivite />
                <SideActivite />
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecenteActivite2;
