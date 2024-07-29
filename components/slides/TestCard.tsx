import { BASE_SITE } from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface TestCardProps {
  img: string;
  titre: string;
  description: string;
  lien?: string;
  entreprise: string;
  situation: string;
}

const TestCard: React.FC<TestCardProps> = ({
  img,
  titre,
  description,
  lien,
  entreprise,
  situation,
}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`${lien}`);
  }, []);
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <Image
          width={292}
          height={292}
          className="w-full h-56 object-cover object-center"
          src={`${BASE_SITE}` + img}
          alt="avatar"
        />
        <div className="flex items-center px-6 py-3 bg-gray-900">
          <svg
            className="h-6 w-6 text-white fill-current"
            viewBox="0 0 512 512"
          >
            <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z" />
          </svg>
          <h1 className="mx-3 text-white font-semibold text-lg">
            {entreprise}
          </h1>
        </div>
        <div className="py-4 px-6">
          <h1 className="text-2xl font-semibold text-gray-800">{titre}</h1>
          <p className="py-2 text-xs text-gray-700">{description}</p>
          <div className="flex items-center mt-4 text-gray-700">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
            </svg>
            <h1 className="px-2 text-sm">{situation}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
