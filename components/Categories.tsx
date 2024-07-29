"use client";

import CategoryBox from "./CategoryBox";
import { useEffect, useState } from "react";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import { categorie } from "@/modeles/Categorie";
import DrawerCategorie from "./DrawerCategorie";
import Skeletons from "./skeletons/Skeletons";
import CategoryAllBox from "./CategoryAllBox";
import GrandTitreCategorie from "./GrandTitreCategorie";
import CardCategorie from "./cards/cardCategorie";
import { useRouter } from "next/navigation";

const Categories = () => {
  const [categories, setCategories] = useState<categorie[]>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCategories = () => {
    setLoading(true);
    axiosAuthapi
      .get("/categorie")
      .then((res) => {
        setCategories(res.data.data);
        localStorage.setItem("categories", JSON.stringify(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
      setLoading(false);
    } else {
      fetchCategories();
    }

    const interval = setInterval(() => {
      localStorage.removeItem("categories");
      fetchCategories();
    }, 86400000); // 86400000 ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  const handleClick = (id: number) => {
    console.log("Card clicked", id);
    router.push(`/sous_categorie/${id}`);
  };

  return (
    <div className="p-0 md:p-0 lg:p-0">
      <div className="flex flex-col w-full p-6 gap-4 border rounded-lg shadow-md bg-white">
        <div className="my-4">
          <GrandTitreCategorie titre="Nos catégories" lien="#" color="#000" />

          <div className="grid grid-cols-20 sm:grid-cols-20 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-4">
            {isLoading ? (
              <Skeletons number={20} />
            ) : (
              <>
                {categories.map((item) => (
                  <CardCategorie
                    onClick={() => handleClick(item.id)}
                    id={item.id}
                    key={item.id}
                    label={item.libelle}
                    image={`${BASE_SITE}${item.imageLaUne.fileNamePath}`}
                  />
                ))}
                <a
                  type="button"
                  data-drawer-target="drawer-right-example"
                  data-drawer-show="drawer-right-example"
                  data-drawer-placement="right"
                  aria-controls="drawer-right-example"
                >
                  <CategoryAllBox
                    key="all"
                    label="Toutes les catégories"
                    image="/assets/hk_showmore.svg"
                  />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <DrawerCategorie />
    </div>
  );
};

export default Categories;
