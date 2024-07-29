"use client";
import Tester from "@/components/Tester";
import PubSponsorise from "@/components/slides/PubSponsorise";
import Categories from "@/components/Categories";
import BigCategorie from "@/components/slides/bigCategorie";
import BigCategorieSeconde from "@/components/slides/bigCategorieSeconde";
import RecenteActivite from "@/components/slides/RecenteActivite";
import RecenteActivite2 from "@/components/slides/RecenteActivite2";
import Publicite from "@/components/slides/Publicite";
import Banner from "@/components/Banner";
import Image from "next/image";
import React, { useEffect, useState, createContext, useContext } from "react";
/* import { ThemeContext } from "./context/ThemeContext";
import Slides from "@/components/slides/slides";
*/

export default function Home() {
  // const context = useContext(ThemeContext);

  return (
    <div className="bg-white my-12">
      <div className="mb-10 py-3">{/*  <h1>Makoya</h1> */}</div>
      {/* <Slides /> */}
      <Tester />
      <PubSponsorise />
      <Categories />
      <BigCategorie firstTitle="Restauration" secondTitle="Beauté" />
      <BigCategorieSeconde
        firstTitle="Éducation"
        secondTitle="Organisateurs d'évènements"
      />
      <RecenteActivite firstTitle="Retours d'experiences" etat={true} />
      <RecenteActivite2 firstTitle="" etat={false} />
      <Publicite />

      <Banner />
    </div>
  );
}
