"use client";
import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import animationData from "../../public/assets/search_notfound.json";
import styles from "../Notifications.module.css";
import Pagination from "@/components/pagination/Pagination";
import { axiosAuthapi } from "@/lib/axios";
import { useSession } from "next-auth/react";

interface Notification {
  id: number;
  title: string;
  content: string;
  receivedAt: Date;
  read: boolean;
}

const Page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterRead, setFilterRead] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<
    number | null
  >(null);
  const itemsPerPage = 6;
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState(session);

  useEffect(() => {
    setCurrentUser(session);
    axiosAuthapi
      .get("/notification/prestataire/" + currentUser?.user?.email)
      .then((res) => {
        setNotifications(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  }, []);

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;
    if (filterDate) {
      filtered = filtered.filter(
        (notification) =>
          notification.receivedAt.toDateString() === filterDate.toDateString()
      );
    }
    if (filterRead !== null) {
      filtered = filtered.filter(
        (notification) => notification.read === filterRead
      );
    }
    return filtered;
  }, [notifications, filterDate, filterRead]);

  const handleDateChange = (date: Date | null) => {
    setFilterDate(date);
    setCurrentPage(1);
  };

  const handleFilterReadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRead(e.target.value === "" ? null : e.target.value === "true");
    setCurrentPage(1);
  };

  const deleteNotification = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setNotificationToDelete(id);
    setShowConfirmationModal(true);
    e.preventDefault();
  };

  const readNotification = async (notification: Notification) => {
    try {
      setSelectedNotification(notification);
      setIsLoading(true);

      await axiosAuthapi
        .post(`/notification/prestataire/read`, { id: notification.id })
        .then(() => {
          notification.read = true;
        })
        .catch((err) => {
          console.error(err.message);
        });

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const deleteNotificationConfirmed = async (id: number | null) => {
    if (id !== null) {
      try {
        setIsLoading(true);

        await axiosAuthapi
          .delete(`/notification/prestataire/delete/${id}`)
          .then(() => {
            setNotifications(
              notifications.filter((notification) => notification.id !== id)
            );
          })
          .catch((err) => {
            console.error(err.message);
          });

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const refreshedData = notifications;
      setNotifications(refreshedData);
      setIsLoading(false);
    }, 1500);
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleMouseEnter = (id: number) => {
    // Handle animation on mouse enter if necessary
    // Example: console.log("Mouse entered notification with id:", id);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastNotification = currentPage * itemsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - itemsPerPage;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  return (
    <div
      className="mb-4 px-2 md:px-4 lg:px-8 mt-[8.5rem]"
      style={{ height: "calc(100vh - 8.5rem)", overflowY: "auto" }}
    >
      <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
        <div className="border-2 px-3 pt-3 sticky top-[8.5rem] pb-3">
          <div className="col-span-full sm:col-span-1 mb-5">
            <DatePicker
              selected={filterDate}
              onChange={(date: Date | null) => handleDateChange(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Sélectionner une date"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-full sm:col-span-1">
            <select
              value={filterRead === null ? "" : filterRead.toString()}
              onChange={handleFilterReadChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Tous</option>
              <option value="true">Lus</option>
              <option value="false">Non lus</option>
            </select>
          </div>
        </div>
        <div className="col-span-3 border-2 pt-3 px-3">
          <div className="">
            {isLoading ? (
              <div className={styles.center}>
                <div className={styles.loader}></div>
              </div>
            ) : error ? (
              <div className={styles.center}>
                {/*  <Lottie options={lottieOptions} height={200} width={200} /> */}
                {/* <h1>load ....</h1> */}
                <p className="text-gray-600">
                  Une erreur a eu lieu lors du chargement. Veuillez réessayer.
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-[#FFA726] text-white rounded hover:bg-[#FB8C00]"
                  onClick={handleRefresh}
                >
                  Recharger
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className={styles.center}>
                {/* <Lottie options={lottieOptions} height={200} width={200} /> */}
                {/* <h1>load ....</h1> */}

                <img
                  src="/assets/search_notfound.svg"
                  alt="Empty illustration"
                />
                <h1 className="text-2xl font-bold">Aucune notification</h1>
                <p className="text-gray-600">
                  Nous n'avons trouvé aucune notification.
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-[#FFA726] text-white rounded hover:bg-[#FB8C00]"
                  onClick={handleRefresh}
                >
                  Recharger
                </button>
              </div>
            ) : selectedNotification ? (
              <div className="notification-details pb-3">
                <h2>{selectedNotification.title}</h2> <hr className="pb-3" />
                <p>{selectedNotification.content}</p>
                <p className="pb-5">
                  {selectedNotification.receivedAt.toLocaleString()}
                </p>
                <hr className="pb-3" />
                <button
                  className="bg-[#FFA726] text-white py-2 px-4 rounded mr-3"
                  onClick={() => setSelectedNotification(null)}
                >
                  {"<-"} Retour
                </button>
                {/*   <button
                  className="mt-2 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteNotification(selectedNotification.id)}
                >
                  Supprimer
                </button> */}
              </div>
            ) : (
              <>
                <ul className="space-y-2 cursor-pointer">
                  {currentNotifications.length === 0 ? (
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <img
                        src="/assets/search_notfound.svg"
                        alt="Empty illustration"
                      />
                      <h1 className="text-2xl font-bold">
                        Aucune notification
                      </h1>
                      <p className="text-gray-600">
                        Nous n'avons trouvé aucune notification.
                      </p>
                      <button
                        className="mt-2 px-4 py-2 bg-[#FFA726] text-white rounded hover:bg-[#FB8C00]"
                        onClick={handleRefresh}
                      >
                        Recharger
                      </button>
                    </div>
                  ) : (
                    currentNotifications.map((notification) => (
                      <li
                        key={notification.id}
                        className={`px-4 py-4 bg-white border shadow-sm ${
                          notification.read ? "opacity-50" : ""
                        }`}
                        onClick={() => readNotification(notification)}
                        onMouseEnter={() => handleMouseEnter(notification.id)}
                      >
                        <div className="font-bold">{notification.title}</div>
                        <div className="text-gray-600">
                          {notification.receivedAt.toLocaleString()}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
                <div className="pagination-container mt-4">
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredNotifications.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
