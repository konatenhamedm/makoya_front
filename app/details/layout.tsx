import Navbar from "@/components/profile/Navbar";
import Sidebar from "@/components/profile/Sidebar";
import React from "react";
/* import ThemeProvider from "../context/ThemeProvider";
import { Providers } from "../providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session"; */
export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const session = await getServerSession(authOptions);
  return (
    /*  <ThemeProvider> */
    <div className="bg-gray-500 ">
      {/* <Providers session={session}> */}
      {children}
      {/* </Providers> */}
    </div>
    /* </ThemeProvider>  */
  );
}
