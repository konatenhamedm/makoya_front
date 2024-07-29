import React from "react";

import PubSousCategorieTester from "./slides/PubSousCategorieTester";
import SideSlide from "./slides/SideSlide";

function Tester() {
  return (
    <div className="flex flex-col w-full pt-4 pb-8 px-4 md:grid md:grid-cols-3 grid-cols-3 gap-4">
      <div className="mb-4 md:mb-0 col-span-2">
        <PubSousCategorieTester ordre={1} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/*  <SideSlide
          titre="B2B"
          desc="Citation"
          image="https://akam.cdn.jdmagicbox.com/images/icons/website/newhome/1/b2b.png?v=1.01?w=1920&q=75"
        /> */}
        <SideSlide
          titre="Événementiel"
          desc="Tout pour les evenements"
          image="https://akam.cdn.jdmagicbox.com/images/icons/website/newhome/1/xperts.png?v=1.0?w=1920&q=75"
        />
        <SideSlide
          titre="Immobilier"
          desc="Les meilleurs agents"
          image="https://akam.cdn.jdmagicbox.com/images/icons/website/newhome/1/realestate.png?v=1.0?w=1920&q=75"
        />
        <SideSlide
          titre="Docteurs"
          desc="Reserves maintenant"
          image="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/web_doctor_image.png?v=1.0?w=1920&q=75"
        />
      </div>
    </div>
  );
}

export default Tester;
