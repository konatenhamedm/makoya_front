import React from "react";
import Image from "next/image";

interface BannerProps {
  image?: string;
  titre?: string;
  desc?: string;
  bouton?: string;
  lien?: string;
}

const Banner: React.FC<BannerProps> = ({
  image,
  titre,
  desc,
  bouton,
  lien,
}) => {
  return (
    <div className="grid grid-cols-3 min-h-[164px] py-6 px-16 bg-[#f1a730] font-[sans-serif] overflow-hidden">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold text-white">
          {titre ? titre : "Besoin d'aide?"}
        </h1>
        <p className="text-sm text-gray-200 mt-1">
          {desc
            ? desc
            : "Notre service d'assistance convivial propose  une assistance par chat en direct et par e-mail 24h/24 et 7j/7. Nous sommes là pour vous aider."}
        </p>
        <a href={lien}>
          <button
            type="button"
            className="py-2.5 px-4 text-sm font-semibold bg-white text-blue-500 hover:bg-slate-100 mt-4 rounded"
          >
            {bouton ? bouton : "Contactez-nous"}
          </button>
        </a>
      </div>
      <div className="relative max-lg:hidden">
        <Image
          width={250}
          height={200}
          src={
            image
              ? image
              : "https://img.freepik.com/vecteurs-premium/notion-service-client-femme-casque-microphone-ordinateur-portable-support-assistance-call-center-illustration-vectorielle-style-plat_186332-939.jpg?w=2000"
          }
          alt="Banner Image"
          className="w-fill right-4 top-[-13px] absolute skew-x-[-16deg] rotate-2"
        />
      </div>
    </div>
  );
};

export default Banner;
