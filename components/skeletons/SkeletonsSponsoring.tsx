import { Skeleton } from "@nextui-org/react";
import React from "react";

interface SkeletonsSponsoringProps {
  nombre: number;
}

const SkeletonsSponsoring: React.FC<SkeletonsSponsoringProps> = ({
  nombre,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array(nombre)
        .fill(0)
        .map((el, index) => (
          <div
            key={index}
            className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4"
          >
            <Skeleton className="rounded-lg">
              <div className="h-56  rounded-lg bg-default-300"></div>
            </Skeleton>
            {/* <Image
              className="w-full h-56 object-cover object-center"
              src={`${BASE_SITE}` + img}
              alt="avatar"
            /> */}
            <div className="flex items-center px-6 py-3">
              {/*  <svg
                className="h-6 w-6 text-white fill-current"
                viewBox="0 0 512 512"
              >
                <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z" />
              </svg> */}
              <div className="mx-3 text-white font-semibold text-lg">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                {/* {entreprise} */}
              </div>
            </div>
            <div className="py-4 px-6">
              <div className="text-2xl font-semibold text-gray-800">
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
              <div className="py-2 text-xs text-gray-700">
                <Skeleton className="w-3/5 rounded-lg ">
                  {/*  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div> */}
                </Skeleton>
              </div>
              <div className="flex items-center mt-4 text-gray-700">
                {/*  <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                  <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                </svg> */}
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonsSponsoring;
