import { Card, CardFooter, CardHeader, Image, Button } from "@nextui-org/react";
import React from "react";

interface SideSlideProps {
  titre: string;
  desc: string;
  image: string;
}
const SideSlide: React.FC<SideSlideProps> = ({ titre, desc, image }) => {
  return (
    <div className="cursor-pointer transition group-hover:opacity-100  duration-300 ease-in-out">
      <Card
        isFooterBlurred
        className="w-full h-[292px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white font-bold text-2xl text-transform-uppercase">
            {titre}
          </h4>
          <p className="text-tiny text-white/60 uppercase font-bold">{desc}</p>
        </CardHeader>
        <Image
          width={100}
          height={1000}
          removeWrapper
          alt="Card example background"
          className={`
z-0 w-full h-full scale-125
 bg-sky-500 bg-cover bg-no-repeat
  object-cover transition duration-300 ease-in-out hover:scale-110
`}
          src={image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          {/* <div>
<p className="text-black text-tiny">Available soon.</p>
<p className="text-black text-tiny">Get notified.</p>
</div> */}
          <Button
            className="text-tiny w-full"
            color="primary"
            radius="full"
            size="sm"
          >
            Lire plus
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SideSlide;
