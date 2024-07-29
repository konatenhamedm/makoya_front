"use client";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { stringify } from "querystring";
import { FunctionComponent, useEffect, useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { GiTie } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavItem: FunctionComponent<{
  active: string;
  setActive: Function;
  name: string;
  route: string;
}> = ({ active, setActive, name, route }) => {
  return active !== name ? (
    <Link
      href={route}
      className="flex items-center justify-center px-2 py-1 my-2 bg-[#FFA726] rounded-sm cursor-pointer dark:bg-black-500"
    >
      {/* <a> */}
      <span
        // flex items-center justify-center px-2 py-1 my-2 bg-sky-500 rounded-full cursor-pointer text-wite
        className="mx-2 cursor-pointer text-white hover:border-b-4 hover:text-green"
        onClick={() => setActive(name)}
      >
        {name}
      </span>
      {/*  </a> */}
    </Link>
  ) : null;
};

const Sidebar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(session);
  const [active, setActive] = useState("");

  useEffect(() => {
    setCurrentUser(session);
    if (pathname === "/profile/home") setActive("Mes statistiques");
    else if (pathname === "/profile/projets") setActive("Gallerie");
    else if (pathname === "/profile/reclamation") setActive("Mes réclamations");
    else if (pathname === "/profile/gallerie") setActive("Ma gallerie");
    else if (pathname === "/profile/comande") setActive("Mes commandes");
    else if (pathname === "/profile/logo") setActive("Modifier logo");
  }, []);
  return (
    <div>
      <Image
        width={300}
        height={300}
        src={session?.user ? session?.user.image : "https://i.pravatar.cc/300"}
        alt="avatar"
        className="w-32 h-32 mx-auto border rounded-full "
      />
      <h6 className="my-4 font-medium tracking-wider font-kaushan">
        <span className="text-green ">
          {session?.user ? session.user.name : "Makoya user"}
        </span>
      </h6>
      {/* <NavItem
        active={active}
        setActive={setActive}
        name="Changer logo "
        route="/profile/logo"
      /> */}
      <NavItem
        active={active}
        setActive={setActive}
        name="Modifier mes informations "
        route="/profile/informations"
      />
      <NavItem
        active={active}
        setActive={setActive}
        name="Mes publicités"
        route="/profile/publicites"
      />
      {/*  <a
        href="/profile/logo"
        className="flex items-center justify-center px-2 py-1 my-2 bg-sky-500 rounded-full cursor-pointer dark:bg-black-500"
      >
        <span className="text-white">Changer logo</span>
      </a> */}

      {/* Resume */}

      {/* Socials */}
      {/*     <div className="flex justify-around w-9/12 mx-auto my-5 text-green md:w-full ">
        <a href="https://www.youtube.com/channel/UClW8d1f5m0QAE_Ig024EP6A">
          <AiFillYoutube className="w-8 h-8 cursor-pointer" />
        </a>
        <a href="https://www.linkedin.com/in/sumit-dey-4a04431a9/">
          <AiFillLinkedin className="w-8 h-8 cursor-pointer" />
        </a>
        <a href="https://www.instagram.com/_sumax__/">
          <AiFillGithub className="w-8 h-8 cursor-pointer" />{" "}
        </a>
      </div> */}

      {/* Contacts */}
      <div
        className="py-4 my-5 bg-gray-200 dark:bg-black-500"
        style={{ marginLeft: "-1rem", marginRight: "-1rem" }}
      >
        <div className="flex items-center justify-center">
          <GoLocation className="mr-2" /> <span>Kolkata,India </span>
        </div>
        <p className="my-2 "> {session?.user.email} </p>
        <p className="my-2"> 8514961665 / 8640960375</p>
      </div>

      {/* Email Button */}

      <button
        className="w-11/12 px-5 py-2 text-white bg-black rounded-lg cursor-pointer bg-gradient-to-r from-green to-blue-500 hover:scale-105 focus:outline-none"
        onClick={() => window.open("mailto:code.sumax@gmail.com")}
      >
        Envoye nous email
      </button>
      <button
        onClick={() => {}}
        className="w-11/12 px-5 py-2 my-4 text-white bg-black rounded-lg cursor-pointer bg-gradient-to-r from-green to-blue-500 focus:outline-none hover:scale-105 "
      >
        {/* //TODO remove bg black */}
        Télecharger App
      </button>
    </div>
  );
};

export default Sidebar;
