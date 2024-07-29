"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ItemPubTester from "./ItemPubTester";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import { Publicite } from "@/modeles/Publicite";
import SkeletonsPublicite from "../skeletons/SkeletonsPublicite";

const dataR = [
  {
    id: 1,
    title: "Swiper Carousel Example",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quos mollitia sed quod consectetur at quam dolore praesentium neque eos assumenda iusto nam laborum laboriosam odio blanditiis possimus accusantium recusandae porro exercitationem itaque",
    imageUrl:
      "https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/03/web-images.jpg?auto=format&q=60&w=1600&h=824&fit=crop&crop=faces",
  },
  // Autres données statiques...
];

interface PubSousCategorieProps {
  ordre?: number;
}

const PubSousCategorieTester: React.FC<PubSousCategorieProps> = ({ ordre }) => {
  const [datas, setDatas] = useState(dataR);

  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [publicites, setPublicites] = useState<Publicite[]>([]);
  const [publicites2, setPublicites2] = useState<Publicite[]>([]);

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

  const fetchPublicites = () => {
    if (ordre === 1) {
      setLoading(true);
      axiosAuthapi
        .get("/publicite")
        .then((response) => {
          setPublicites(response.data.data);
          localStorage.setItem(
            "publicites",
            JSON.stringify(response.data.data)
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading2(true);
      axiosAuthapi
        .get("/publicite/ordre")
        .then((response) => {
          setPublicites2(response.data.data);
          localStorage.setItem(
            "publicites2",
            JSON.stringify(response.data.data)
          );
          setLoading2(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading2(false);
        });
    }
  };

  useEffect(() => {
    const storedPublicites = localStorage.getItem("publicites");
    const storedPublicites2 = localStorage.getItem("publicites2");

    if (ordre === 1) {
      if (storedPublicites) {
        setPublicites(JSON.parse(storedPublicites));
        setLoading(false);
      } else {
        fetchPublicites();
      }
    } else {
      if (storedPublicites2) {
        setPublicites2(JSON.parse(storedPublicites2));
        setLoading2(false);
      } else {
        fetchPublicites();
      }
    }

    const interval = setInterval(() => {
      if (ordre === 1) {
        localStorage.removeItem("publicites");
      } else {
        localStorage.removeItem("publicites2");
      }
      fetchPublicites();
    }, 86400000); // 86400000 ms = 1 minute

    return () => clearInterval(interval);
  }, [ordre]);

  return (
    <div className="my-0 inset-0 px-0">
      <div id="custom-controls-gallery" className="relative w-full ">
        <div className="relative w-full h-[292px] overflow-hidden rounded-lg md:h-[292px] ">
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
          {ordre == 1 ? (
            isLoading ? (
              <SkeletonsPublicite nombre={1} />
            ) : (
              <Slider {...settings}>
                {publicites.map((item, key) => (
                  <ItemPubTester
                    key={key}
                    image={`${BASE_SITE}${item.fileNamePath}`}
                    titre={item.libelle}
                  />
                ))}
              </Slider>
            )
          ) : isLoading2 ? (
            <SkeletonsPublicite nombre={1} />
          ) : (
            <Slider {...settings}>
              {publicites2.map((item, key) => (
                <ItemPubTester
                  key={key}
                  image={`${BASE_SITE}${item.fileNamePath}`}
                  titre={item.libelle}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default PubSousCategorieTester;
