"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Notification from "./Notification";
import useRentModal from "../../hooks/useRentModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Infos() {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(session);

  useEffect(() => {
    setCurrentUser(session);
  });

  return (
    <>
      {session ? (
        <>
          <div
            className=" hidden
      md:block
      text-sm 
      font-semibold 
      py-3 
      px-4 
      rounded-full 
      hover:bg-neutral-100 
      transition 
      cursor-pointer"
          >
            {session.user.name}
          </div>
          <Notification />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Makoya"
                size="sm"
                src={session.user.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                {/*  <p className="font-semibold">Signed in as</p> */}
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => router.push("/profile/home")}
              >
                Tableau de bord
              </DropdownItem>
              <DropdownItem key="team_settings">Favories</DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Se deconnecter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : (
        <>
          <div className="flex ">
            {/* <Notification /> */}
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-sky-500  border-none rounded-md hover:bg-warning text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 "
              /* onClick={rentModal.onOpen} */
              onClick={loginModal.onOpen}
            >
              Login / S&apos;inscrire
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Infos;
