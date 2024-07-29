"use client";
import ServiceDetails from "@/components/ServiceDetails";
import PubCategorie from "@/components/slides/PubCategorie";
import PubSousCategorie from "@/components/slides/PubSousCategorie";
import React, { useEffect, useState } from "react";

function page({ params }: { params: { id: number } }) {
  //console.log(params.id);

  //const [name, setName] = useState("categorie");

  return (
    <div className=" bg-white my-12 px-0 md:px-0 lg:px-0 ">
      <div className="mb-10 py-3">{/*  <h1>Makoya</h1> */}</div>

      {/* <div className="sticky-top"> */}
      {/* <PubSousCategorie id={parseInt(params.id)} /> */}
      <PubCategorie id={params.id} />
      <br />
      {/* Contenu de PubSousCategorie */}
      {/* </div> */}

      <ServiceDetails id={params.id} />
    </div>
  );
}

export default page;
