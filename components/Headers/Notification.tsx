"use client";
import { axiosAuthapi } from "@/lib/axios";
import { notification } from "@/modeles/Notification";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NotificationData {
  id: number;
  title: string;
  content: string;
  receivedAt: Date;
  read: boolean;
}

function Notification() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(session);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    setCurrentUser(session);
    axiosAuthapi
      .get("/notification/prestataire/" + currentUser?.user?.email)
      .then((res) => {
        const unreadNotifications = res.data.data.filter(
          (item: NotificationData) => !item.read
        );
        setNotifications(unreadNotifications);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [notifications]);
  return (
    <div onClick={(e) => router.push("/notification")}>
      <a
        className="hidden-arrow mr-4 flex items-center pt-2.5 text-secondary-500 transition duration-200 hover:text-secondary-400 hover:ease-in-out focus:text-secondary-400 disabled:text-black/30 motion-reduce:transition-none"
        href="#"
        onClick={(e) => router.push("/notification")}
        id="dropdownMenuButton1"
        role="button"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
      >
        <span className="[&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" />
          </svg>
        </span>

        <span className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
          {notifications.length}
        </span>
      </a>
    </div>
  );
}

export default Notification;
