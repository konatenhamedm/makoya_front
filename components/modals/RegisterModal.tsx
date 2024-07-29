"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "./modal";
import * as Yup from "yup";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon ";
import { EyeFilledIcon } from "../icons/EyeFilledIcon ";
import { axiosAuth, axiosAuthapi, axiosAuthapiFormdata } from "@/lib/axios";
import { Civilite } from "@/modeles/Civilite";
import { Quartier } from "@/modeles/Quartier";
import { useFormik } from "formik";
import styles from "../../app/Spinner.module.css";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Heading from "../Headers/heading";

export type Datatype = {
  latitude: string;
  longitude: string;
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageInput, setImageInput] = useState("");

  const [civilite, setCivilite] = useState<Civilite[]>([]);
  const [quartiers, setQuartiers] = useState<Quartier[]>([]);
  const [latitude, setLatitude] = useState<number | any>();
  const [longitude, setLongitude] = useState<number | any>();
  const hiddenFileInput = useRef(null);

  const handleClick = (event: any) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleImage = (e: any) => {
    //alert("");
    const file = e.target.files[0];
    setImageInput(file);

    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      //console.log(e.target.result);
      setImage(e.target.result);
    };

    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    axiosAuthapi
      .get("/general/only/quartier")
      .then((res) => setQuartiers(res.data.data))
      .catch((err) => {
        //setError(err.message);
      });

    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition((position) => {
        /*  const { latitude, longitude } = coords;
          setLocation({ latitude, longitude }); */

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        //setData(coords);
      });
    }
  }, [quartiers, latitude, longitude]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      denominationSociale: "",
      contact: "",
      quartier: "",
      confirm_password: "",
      logo: "",
      situation: "",
      // longitude: longitude,
      //latitude: latitude,
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalide email")
        .required("Email est un champ requis")
        .email(),
      password: Yup.string().required("Password est un champ requis"),
      contact: Yup.string().required("Contact est un champ requis"),
      quartier: Yup.string().required("Quartier est un champ requis"),
      // longitude: Yup.number(),
      // latitude: Yup.number(),
      situation: Yup.array(),
      logo: Yup.string(),
      denominationSociale: Yup.string().required(
        "Denomination sociale est un champ requis"
      ),
      confirm_password: Yup.string()
        .label("Confirmez le mot de passe")
        .required()
        .oneOf(
          [Yup.ref("password"), ""],
          "Les mots de passe doivent correspondre"
        ),
    }),

    onSubmit: async (values) => {
      //  alert(latitude);
      // alert(latitude);
      const data = new FormData();

      data.append("email", values.email);
      data.append("password", values.password);
      data.append("denominationSociale", values.denominationSociale);
      data.append("contact", values.contact);
      data.append("quartier", values.quartier);
      data.append("situation", values.situation);
      data.append("logo", imageInput);
      data.append("longitude", longitude);
      data.append("latitude", latitude);

      //alert(values.situation);

      /*   const data = {
        ...values,
        latitude: latitude,
        longitude: longitude,
      }; */

      setIsLoading(true);

      await axiosAuthapiFormdata
        .post("/prestataire/create", data)
        .then((res) => {
          if (res.data.status == 300) {
            setMessage(res.data.message);
            setIsLoading(false);
          } else {
            signIn("credentials", {
              username: values.email,
              password: values.password,
              redirect: false,
            }).then((callback) => {
              if (callback?.ok) {
                registerModal.onClose();
                setIsLoading(false);
              }
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setMessage(error.message);
        });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirme, setIsVisibleConfirme] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirme = () => {
    setIsVisibleConfirme(!isVisibleConfirme);
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="" subtitle="" center />

      {message != "" && (
        <div
          className="flex items-center p-4 mb-4  text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          {/*  <span className="sr-only">Info</span> */}
          <div>
            <span className="font-medium">Alerte une erreur!</span> {message}.
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className=" profile_img text-center p-4">
          <div className="flex flex-column justify-content-center align-items-center">
            {image ? (
              <Image
                width={150}
                height={150}
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid  blue ",
                }}
                src={image}
                alt=""
              />
            ) : (
              <Image
                width={150}
                height={150}
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid bg-sky-600",
                }}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""
              />
            )}

            <input
              ref={hiddenFileInput}
              style={{ display: "none" }}
              className=""
              type="file"
              name="logo"
              placeholder="Veillez renseigner le champ logo "
              onChange={(e) => handleImage(e)}
            />
          </div>
        </div>

        {/*   <div className="pb-0">
          <p></p>
          
          <input
            className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            type="file"
            name="logo"
            placeholder="Veillez renseigner le champ logo "
            onChange={(e) => handleImage(e)}
          />
        </div>
        <div>
          {image && <Image src={image} style={{ width: "100%" }} alt="image" />}
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="pb-0">
          <label
            htmlFor="denominationSociale"
            className={`block font-latoBold text-sm pb-2 ${
              formik.touched.denominationSociale &&
              formik.errors.denominationSociale
                ? "text-red-400"
                : ""
            }`}
          >
            {formik.touched.denominationSociale &&
            formik.errors.denominationSociale
              ? formik.errors.denominationSociale
              : "Dénomination sociale"}
          </label>

          <p></p>
          <input
            className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            type="text"
            name="denominationSociale"
            placeholder="Veillez renseigner le champ denomination sociale "
            onChange={formik.handleChange}
            value={formik.values.denominationSociale}
            onBlur={formik.handleBlur}
          />
        </div>
        {/* Country input field */}
        <div className="pb-0">
          <label
            htmlFor="contact"
            className={`block font-latoBold text-sm pb-2 ${
              formik.touched.contact && formik.errors.contact
                ? "text-red-400"
                : ""
            }`}
          >
            {formik.touched.contact && formik.errors.contact
              ? formik.errors.contact
              : "Contact"}
          </label>

          <p></p>
          <input
            className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            type="text"
            name="contact"
            placeholder="Veillez renseigner le champ contact "
            onChange={formik.handleChange}
            value={formik.values.contact}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="pb-0">
          <label
            htmlFor="email"
            className={`block font-latoBold text-sm pb-2 ${
              formik.touched.email && formik.errors.email ? "text-red-400" : ""
            }`}
          >
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email"}
          </label>

          <p></p>
          <input
            className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            type="email"
            name="email"
            placeholder="Veillez renseigner le champ email "
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
        </div>
        {/* Country input field */}
        <div className="pb-4">
          <label htmlFor="country" className="block font-latoBold text-sm pb-2">
            Quartier
          </label>
          <select
            className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            name="quartier"
            onChange={formik.handleChange}
            value={formik.values.quartier}
          >
            {quartiers.map((quartier) => (
              <option key={quartier.id} value={quartier.id}>
                {quartier.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="pb-4 password_2 block  relative">
          <label
            htmlFor="password"
            className={`block font-latoBold text-sm pb-2 ${
              formik.touched.password && formik.errors.password
                ? "text-red-400"
                : ""
            }`}
          >
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Password"}
          </label>

          <p></p>
          <input
            className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            // type="password"
            name="password"
            placeholder="Veillez renseigner le champ password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            type={isVisible ? "text" : "password"}
          />
          <div
            className="icon_button absolute right-4 top-10"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </div>
        </div>
        {/* Country input field */}
        <div className="pb-4 password_2 block  relative">
          <label
            htmlFor="confirm_password"
            className={`block font-latoBold text-sm pb-2 ${
              formik.touched.confirm_password && formik.errors.confirm_password
                ? "text-red-400"
                : ""
            }`}
          >
            {formik.touched.confirm_password && formik.errors.confirm_password
              ? formik.errors.confirm_password
              : "Confirmation password"}
          </label>

          <p></p>
          <input
            className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            // type="password"
            name="confirm_password"
            placeholder="Veillez confirmer le mot de passe"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            onBlur={formik.handleBlur}
            type={isVisibleConfirme ? "text" : "password"}
          />
          <div
            className="icon_button absolute right-4 top-10"
            onClick={toggleVisibilityConfirme}
          >
            {isVisibleConfirme ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </div>
        </div>
      </div>

      <div className="pb-4">
        <label
          htmlFor="situation"
          className={`block font-latoBold text-sm pb-2 ${
            formik.touched.situation && formik.errors.situation
              ? "text-red-400"
              : ""
          }`}
        >
          {formik.touched.situation && formik.errors.situation
            ? formik.errors.situation
            : "Situation entreprise"}
        </label>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="situation"
            value="checked"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-5 w-5 text-teal-500 border-2  background-gray-500 focus:border-white focus:ring-black-500"
          />
          <p className="text-sm font-latoBold text-gray-500">
            Voulez-vous qu&apos;on prenne cette position en tant que
            l&apos;emplacement de votre activité.
          </p>
        </div>

        {/*  <button
          type="submit"
          className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
        >
          Start learning today!
        </button> */}

        {/* {isLoading == true && (
          <div className={styles.overlay}>
            <div className={styles.spinner}></div>
          </div>
        )} */}
        {isLoading == true && (
          <div className="flex flex-row gap-2 justify-center mt-5">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        )}
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-2">
      <hr />

      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Vous avez déjà un compte?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Connectez vous
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Enregistez vous ici"
      size={false}
      actionLabel="S'inscrire"
      onClose={registerModal.onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
