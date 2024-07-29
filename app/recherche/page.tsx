"use client";
import ServiceDetails from "@/components/ServiceDetails";
import ServiceDetailsSearch from "@/components/ServiceDetailsSearch";
import PubSousCategorie from "@/components/slides/PubSousCategorie";
import PubSousCategorieTester from "@/components/slides/PubSousCategorieTester";
import { useSearchParams } from "next/navigation";
import React from "react";

function Page() {
  const searchParams = useSearchParams();
  const categorie = searchParams.get("categorie")?.toString();
  const ville = searchParams.get("ville")?.toString();
  const search = searchParams.get("search")?.toString();

  return (
    <>
      <div className=" bg-white my-12 px-0 md:px-0 lg:px-0 ">
        <div className="mb-12 py-3">{/*  <h1>Makoya</h1> */}</div>
        {/* <PubSousCategorie id={parseInt(id)} /> */}
        {/* <PubSousCategorieTester ordre={2} /> */}

        <ServiceDetailsSearch
          categorie={categorie ? parseInt(categorie) : "null"}
          ville={ville ? parseInt(ville) : "null"}
          search={search ? search.toString() : "null"}
        />
      </div>
    </>
  );
}

export default Page;
