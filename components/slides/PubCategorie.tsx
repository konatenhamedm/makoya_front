"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ItemPubTester from "./ItemPubTester";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import { Publicite } from "@/modeles/Publicite";
import SkeletonsPublicite from "../skeletons/SkeletonsPublicite";
import ItemPubCategorie from "./ItemPubCategorie";

interface PubCategorieProps {
  id?: number;
}

const PubCategorie: React.FC<PubCategorieProps> = ({ id }) => {
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [publicites, setPublicites] = useState<Publicite[]>([]);

  const settings = {
    dots: true,
    arrows: true,
    Infinite: true,
    speed: 6000,
    pauseOnHover: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    //const storedPublicites = localStorage.getItem("publicites");

    /*  if (storedPublicites) {
      setPublicites(JSON.parse(storedPublicites));
      setLoading(false);
    } else { */
    axiosAuthapi
      .get("/publicite/categorie/" + id)
      .then((response) => {
        setPublicites(response.data.data);
        /*  localStorage.setItem(
            "publicites",
            JSON.stringify(response.data.data)
          ); */
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    /* } */
  }, []);

  return (
    <div className="my-0 inset-0 px-0">
      <div id="custom-controls-gallery" className="relative w-full ">
        <div className="relative w-full h-[250px] overflow-hidden rounded-lg md:h-[250px] ">
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
            <SkeletonsPublicite nombre={1} />
          ) : (
            <>
              {publicites.length > 0 ? (
                <Slider {...settings}>
                  {publicites.map((item, key) => (
                    <ItemPubCategorie
                      key={key}
                      image={`${BASE_SITE}${item.fileNamePath}`}
                      titre={item.libelle}
                    />
                  ))}
                </Slider>
              ) : (
                <ItemPubCategorie
                  key={1}
                  image={`/b_264.jpg`}
                  titre={"publicite"}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PubCategorie;
