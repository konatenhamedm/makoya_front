"use client";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import React from "react";
interface SkeletonsSousCategorieProps {
  nombre: number;
}
/* export default function SkeletonsSousCategorie({ nombre })
 */

const SkeletonsSousCategorie: React.FC<SkeletonsSousCategorieProps> = ({
  nombre,
}) => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {Array(nombre)
        .fill(0)
        .map((el, index) => (
          <Card key={index} shadow="sm">
            <CardBody className="overflow-visible p-0">
              <Skeleton className="rounded-lg">
                <div className="h-[140px]  rounded-lg bg-default-300"></div>
              </Skeleton>
              {/*   <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.libelle}
              className="w-full object-cover h-[140px]"
              src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
            /> */}
            </CardBody>
            <CardFooter className="text-small justify-center">
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
export default SkeletonsSousCategorie;
