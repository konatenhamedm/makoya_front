"use client";
import { useState, useEffect, FunctionComponent } from "react";
//import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavItem: FunctionComponent<{
  active: string;
  setActive: Function;
  name: string;
  route: string;
}> = ({ active, setActive, name, route }) => {
  return active !== name ? (
    <Link href={route} className="bg-[#FFA726] rounded-sm mx-1 gap-2">
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

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(session?.user);
  useEffect(() => {
    setCurrentUser(session?.user);
  });

  //later
  useEffect(() => {
    if (pathname === "/profile/home") setActive("Mes statistiques");
    else if (pathname === "/profile/projets") setActive("Gallerie");
    else if (pathname === "/profile/reclamation") setActive("Mes réclamations");
    else if (pathname === "/profile/gallerie") setActive("Ma gallerie");
    else if (pathname === "/profile/comande") setActive("Mes commandes");
    else if (pathname === "/profile/logo") setActive("Modifier logo");
  }, []);

  return (
    <div className="flex items-center justify-between px-5 py-3 my-3 bg-gray-100">
      <span className="text-xl font-bold border-b-4 md:text-2xl border-green">
        {active}
      </span>

      <div className="text-base font-normal md:text-xl">
        <NavItem
          active={active}
          setActive={setActive}
          name="Mes statistiques"
          route="/profile/home"
        />
        <NavItem
          active={active}
          setActive={setActive}
          name="Mes réclamations"
          route="/profile/reclamation"
        />
        <NavItem
          active={active}
          setActive={setActive}
          name="Mes commande"
          route="/profile/resume"
        />
        <NavItem
          active={active}
          setActive={setActive}
          name="Ma gallerie"
          route="/profile/projets"
        />
      </div>
    </div>
  );
};

export default Navbar;
