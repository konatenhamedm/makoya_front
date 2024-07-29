"use client";

import React, { useEffect, useState } from "react";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import Slider from "react-slick";
import GrandTitre from "../GrandTitre";
import { axiosAuthapi } from "@/lib/axios";
import { Sponsoring } from "@/modeles/Sponsoring";
import SkeletonsSponsoring from "../skeletons/SkeletonsSponsoring";
import Image from "next/image";
import TestCard from "./TestCard";

function PubSponsorise() {
  const settings = {
    arrows: true,
    Infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={() => console.log("next")} />,
    prevArrow: <PrevArrow onClick={() => console.log("next")} />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [sponsoring, setSponsoring] = useState<Sponsoring[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchSponsoring = () => {
    setLoading(true);
    axiosAuthapi
      .get("/sponsoring")
      .then((res) => {
        setSponsoring(res.data.data);
        localStorage.setItem("sponsoring", JSON.stringify(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const storedSponsoring = localStorage.getItem("sponsoring");

    if (storedSponsoring) {
      setSponsoring(JSON.parse(storedSponsoring));
      setLoading(false);
    } else {
      fetchSponsoring();
    }

    const interval = setInterval(() => {
      localStorage.removeItem("sponsoring");
      fetchSponsoring();
    }, 86400000); // 86400000 ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-full px-4">
      <div className=" my-8">
        <GrandTitre titre="Annonces sponsorisées" lien="#" />
        <div className="">
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
          />
          {isLoading ? (
            <SkeletonsSponsoring nombre={4} />
          ) : (
            <>
              <Slider {...settings}>
                {sponsoring.length > 0 &&
                  sponsoring.map((item, index) => (
                    <TestCard
                      key={index}
                      img={item.image.fileNamePath}
                      titre={item.titre}
                      description={item.description}
                      lien={item.lien}
                      entreprise={item.entreprise}
                      situation={item.situation}
                    />
                  ))}
              </Slider>
              {sponsoring.length === 0 && (
                <div className="flex flex-col justify-center items-center">
                  <Image
                    width={200}
                    height={200}
                    src="/assets/search_notfound.svg"
                    alt="Empty illustration"
                  />
                  <h1 className="text-2xl font-bold">Aucun résultat</h1>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PubSponsorise;
