"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import Modal from "./modal";
import { EyeFilledIcon } from "../icons/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon ";
import * as Yup from "yup";
import { useFormik } from "formik";
import Heading from "../Headers/heading";
import styles from "../../app/Spinner.module.css";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .email(),
      password: Yup.string()
        .min(5, "Password must be at least 5 charaters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      await signIn("credentials", {
        username: values.email,
        password: values.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh();
          console.log("KKKKOROOROR", values.email);

          //alert("jdnlkjdhdlk");
          loginModal.onClose();
          setIsLoading(false);
        }

        if (callback?.error) {
          setIsLoading(false);
          setMessage(callback?.error);
        }
      });
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading
        title="MAKOYA"
        subtitle="Connectez-vous pour une expérience fluide"
        center
      />

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
          placeholder="Enter your email address"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
      </div>
      {/* Country input field */}
      <div className="pb-0 password_2 block pt-2 relative">
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
          placeholder="Enter your password address"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          type={isVisible ? "text" : "password"}
        />
        {/*  <input
          type="email"
          required
          className="w-full mt-0 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
        /> */}
        <div
          className="icon_button absolute right-4 top-11"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </div>
      </div>

      {isLoading == true && (
        <div className="flex flex-row gap-2 justify-center mt-5">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      )}
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      /> */}
      <div
        className="
      text-neutral-500 text-center mt-4 font-light grid grid-cols-2 justify-between"
      >
        <div>
          <p>
            Avez-vous un compte client?
            <span
              onClick={onToggle}
              className="
              text-blue-600
              cursor-pointer 
              hover:underline
            "
            >
              {" "}
              créez-en un
            </span>
          </p>
        </div>
        <div>
          <p>
            Avez-vous un compte prestataire ?
            <span
              onClick={onToggle}
              className="
              text-blue-600
              cursor-pointer 
              hover:underline
              
            "
            >
              {" "}
              créez-en un
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Bienvenue à vous"
      size={true}
      actionLabel="Connectez-vous"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
