"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { BASE_SITE, axiosAuthapi } from "@/lib/axios";
import { SousCategorie } from "@/modeles/SousCategorie";
import SkeletonsSousCategorie from "../skeletons/SkeletonsSousCategorie";
import { useRouter } from "next/navigation";

interface BigCategorieSecondeProps {
  firstTitle: string;
  secondTitle: string;
}

const BigCategorieSeconde: React.FC<BigCategorieSecondeProps> = ({
  firstTitle,
  secondTitle,
}) => {
  const [firstDatas, setFirstDatas] = useState<SousCategorie[]>([]);
  const [secondDatas, setSecondDatas] = useState<SousCategorie[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingSecond, setLoadingSecond] = useState(true);
  const router = useRouter();

  const fetchFirstDatas = () => {
    setLoading(true);
    axiosAuthapi
      .get("/sousCategorie/sous_categories/categorie/23CAT10005")
      .then((res) => {
        setFirstDatas(res.data.data);
        localStorage.setItem("firstDatas", JSON.stringify(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching first data:", err);
        setLoading(false);
      });
  };

  const fetchSecondDatas = () => {
    setLoadingSecond(true);
    axiosAuthapi
      .get("/sousCategorie/sous_categories/categorie/23CAT10005")
      .then((res) => {
        setSecondDatas(res.data.data);
        localStorage.setItem("secondDatas", JSON.stringify(res.data.data));
        setLoadingSecond(false);
      })
      .catch((err) => {
        console.error("Error fetching second data:", err);
        setLoadingSecond(false);
      });
  };

  useEffect(() => {
    const storedFirstDatas = localStorage.getItem("firstDatas");
    const storedSecondDatas = localStorage.getItem("secondDatas");

    if (storedFirstDatas && storedSecondDatas) {
      setFirstDatas(JSON.parse(storedFirstDatas));
      setSecondDatas(JSON.parse(storedSecondDatas));
      setLoading(false);
      setLoadingSecond(false);
    } else {
      fetchFirstDatas();
      fetchSecondDatas();
    }

    const interval = setInterval(() => {
      localStorage.removeItem("firstDatas");
      localStorage.removeItem("secondDatas");
      fetchFirstDatas();
      fetchSecondDatas();
    }, 86400000); // 86400000 ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  const handleClick = useCallback(
    (id: number) => {
      router.push(`/details/sous_categorie/${id}`);
    },
    [router]
  );

  return (
    <div className="flex flex-col w-full pt-5 pb-9 gap-4 md:grid md:grid-cols-1 lg:grid-cols-2">
      <div>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full"
          shadow="sm"
        >
          <CardHeader>
            <p className="font-semibold text">{firstTitle}</p>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <SkeletonsSousCategorie nombre={4} />
            ) : (
              <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {firstDatas &&
                  firstDatas.map((item, index) => (
                    <Card
                      shadow="sm"
                      key={index}
                      isPressable
                      onPress={() => handleClick(item.id)}
                    >
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={item.libelle}
                          className="w-full object-cover h-[140px]"
                          src={`${BASE_SITE}${item.image.fileNamePath}`}
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-center">
                        <b>{item.libelle}</b>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <div>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full"
          shadow="sm"
        >
          <CardHeader>
            <p className="font-semibold text">{secondTitle}</p>
          </CardHeader>
          <CardBody>
            {isLoadingSecond ? (
              <SkeletonsSousCategorie nombre={4} />
            ) : (
              <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {secondDatas &&
                  secondDatas.map((item, index) => (
                    <Card
                      shadow="sm"
                      key={index}
                      isPressable
                      onPress={() => handleClick(item.id)}
                    >
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={item.libelle}
                          className="w-full object-cover h-[140px]"
                          src={`${BASE_SITE}${item.image.fileNamePath}`}
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-center">
                        <b>{item.libelle}</b>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BigCategorieSeconde;
