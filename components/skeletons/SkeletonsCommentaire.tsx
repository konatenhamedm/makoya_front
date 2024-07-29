import { Skeleton } from "@nextui-org/react";
import React from "react";

interface SkeletonsCommentaireProps {
  nombre: number;
}

const SkeletonsCommentaire: React.FC<SkeletonsCommentaireProps> = ({
  nombre,
}) => {
  return (
    <>
      {Array(nombre)
        .fill(0)
        .map((el, index) => (
          <div
            key={index}
            className="max-w-sm bg-white  pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
          >
            <h3 className="mb-3 text-xl font-bold text-indigo-600">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </h3>
            <div className="relative">
              <Skeleton className="rounded-lg">
                <div className="h-56  rounded-lg bg-default-300"></div>
              </Skeleton>

              <p className="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"></p>
            </div>
            <div className="p-1">
              <div className="flex flex-grow gap-2 items-center justify-between">
                <Skeleton className="rounded-full w-2/5 h-1">
                  <div className="rounded-full w-2/5 h-11  bg-default-300"></div>
                </Skeleton>

                {/*  <p className="text-tiny text-black">tttt</p> */}
                <div className="flex flex-col">
                  {/*  <p className="text-tiny text-black">Habite : gfryu 1</p> */}
                </div>
                {/* <div> */}
                <Skeleton className="rounded-full w-2/5 h-1">
                  <div className="rounded-full w-2/5 h-11  bg-default-300"></div>
                </Skeleton>
                {/* </div> */}
              </div>
            </div>
            <div className="mt-4 text-base text-neutral-600 dark:text-neutral-200 cursor-pointer">
              <Skeleton className="w-full rounded-lg">
                <div className="h-36 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
            <div className="my-4">
              <Skeleton className="w-full rounded-lg">
                <div className="h-3 w-full rounded-lg bg-default-300"></div>
              </Skeleton>
              {/* <button className="mt-4 text-xl w-full mx-4 text-white bg-green-500 py-2 rounded-xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </button> */}
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonsCommentaire;
