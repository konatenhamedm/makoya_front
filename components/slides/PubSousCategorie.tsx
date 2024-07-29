"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ItemPub from "./ItemPub";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import SkeletonsPublicite from "../skeletons/SkeletonsPublicite";
import { Publicite } from "@/modeles/Publicite";

interface PubSousCategorieProps {
  id: number;
}

const PubSousCategorie: React.FC<PubSousCategorieProps> = ({ id }) => {
  const [publicites, setPublicites] = useState<Publicite[]>([]);
  const [isLoading, setLoading] = useState(true);

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
    const fetchPublicites = async () => {
      try {
        const storedPublicites = localStorage.getItem("publicites");

        if (storedPublicites) {
          setPublicites(JSON.parse(storedPublicites));
          setLoading(false);
        } else {
          const response = await axiosAuthapi.get(`/publicite/user/`);
          setPublicites(response.data.data);
          localStorage.setItem(
            "publicites",
            JSON.stringify(response.data.data)
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching publicites:", error);
        setLoading(false);
      }
    };

    fetchPublicites();
  }, []);

  return (
    <div className="my-9 inset-0">
      <div id="custom-controls-gallery" className="relative w-full ">
        <div className="relative h-[14rem] overflow-hidden rounded-b-lg md:h-[14rem]">
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
              <Slider {...settings}>
                <>
                  {publicites.length === 0 ? (
                    <ItemPub key={1} image={`/b_264.jpg`} titre={"publicite"} />
                  ) : (
                    <>
                      {publicites.map((item, key) => (
                        <ItemPub
                          key={key}
                          image={`${BASE_SITE}${item.fileNamePath}`}
                          titre={item.libelle}
                        />
                      ))}
                    </>
                  )}
                </>
              </Slider>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PubSousCategorie;
