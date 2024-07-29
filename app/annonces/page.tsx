"use client";

import { color } from "framer-motion";
import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Image from "next/image";

function Annnce() {
  const loginModal = useRegisterModal();
  return (
    <div>
      <div className=" bg-white my-12 ">
        <div className="mb-10 py-3"></div>
        <section className="bg-gray-100">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  <span>Inscrivez votre entreprise </span>
                  <span
                    className="color007"
                    style={{ verticalAlign: "inherit", color: "red" }}
                  >
                    {/* <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;"></font>
                    </font> */}
                    GRATUITEMENT
                  </span>
                </h2>

                <Button
                  variant="outlined"
                  className="flex-shrink-0 bg-sky-500 text-white mt-6"
                  placeholder="Enter placeholder text"
                  onPointerEnterCapture={""}
                  onPointerLeaveCapture={""}
                  onClick={loginModal.onOpen}
                >
                  Commencez maintenant
                </Button>
                <div className="mt-4 text-gray-600 text-lg">
                  <ul className="mt-8 space-y-3 font-medium">
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-indigo-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 leading-5 text-gray-600">
                        Secure every API endpoint with our built in
                        authentication.
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-indigo-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 leading-5 text-gray-600">
                        Restrict capabilities using Token-Based Access Controls.
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-indigo-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 leading-5 text-gray-600">
                        Easily Manage API Keys.
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-indigo-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 leading-5 text-gray-600">
                        Custom validations to validate input coming to your API.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  {/* <a
                    href="#"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Learn more about us
                    <span className="ml-2">&#8594;</span>
                  </a> */}
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <Image
                  width={500}
                  height={500}
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
                  alt="About Us Image"
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-yellow-100">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
            <div className="col-span-1 px-4 pt-12">
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  Nos
                </span>{" "}
                Réussites.
              </h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Plus de 250 Annonceurs sur nos plateforme <br />à ce jour.
              </p>
            </div>
            <div className="col-span-3">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-3 justify-between">
                <div className=" justify-center">
                  <div className="rounded-lg shadow-lg bg-white max-w-sm">
                    <a href="#!">
                      <video
                        width="320"
                        height="240"
                        controls
                        className="w-full rounded-t-lg"
                      >
                        <source
                          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                          type="video/mp4"
                        />
                        <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </a>
                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        Video Card
                      </h5>
                      <p className="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <button
                        type="button"
                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Button
                      </button>
                    </div>
                  </div>
                </div>

                <div className=" justify-center">
                  <div className="rounded-lg shadow-lg bg-white max-w-sm">
                    <a href="#!">
                      <video
                        width="320"
                        height="240"
                        controls
                        className="w-full rounded-t-lg"
                      >
                        <source
                          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                          type="video/mp4"
                        />
                        <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </a>
                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        Video Card
                      </h5>
                      <p className="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <button
                        type="button"
                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Button
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex ">
                  <div className="rounded-lg shadow-lg bg-white max-w-sm">
                    <a href="#!">
                      <video
                        width="320"
                        height="240"
                        controls
                        className="w-full rounded-t-lg"
                      >
                        <source
                          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                          type="video/mp4"
                        />
                        <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </a>
                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        Video Card
                      </h5>
                      <p className="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <button
                        type="button"
                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6">
          <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">
            Obtenez une fiche d'entreprise GRATUITE en 4 étapes simples
          </h2>

          <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
            <div className="lg:py-6 lg:pr-16">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 1</p>
                  <p className="text-gray-700">
                    All recipes are written using certain conventions, which
                    define the characteristics of common ingredients. The rules
                    vary from place to place.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 2</p>
                  <p className="text-gray-700">
                    The first mate and his Skipper too will do their very best
                    to make the others comfortable in their tropic island nest.
                    Michael Knight a young loner.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 3</p>
                  <p className="text-gray-700">
                    Tell them I hate them. Is the Space Pope reptilian!? Tell
                    her she looks thin. Hello, little man. I will destroy you!
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 4</p>
                  <p className="text-gray-700">
                    If one examines precultural libertarianism, one is faced
                    with a choice: either accept rationalism or conclude that
                    context is a product.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-6 text-gray-600"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <polyline
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          points="6,12 10,16 18,8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="mb-2 text-lg font-bold">Success</p>
                  <p className="text-gray-700" />
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                width={500}
                height={500}
                className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-6 lg:py-20">
          <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">
            Connectez-vous avec de nouveaux clients et développez votre
            entreprise
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative md:col-span-2 lg:col-span-2">
              <Image
                width={500}
                height={500}
                className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                src="https://www.justdial.com/Free-Listing/_next/image?url=http%3A%2F%2Fakam.cdn.jdmagicbox.com%2Fimages%2Ficontent%2Flistingbusiness%2Ffreebusinesslisting%402x.png&w=640&q=75"
                alt=""
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 md:col-span-2 lg:col-span-3">
              <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-indigo-50">
                <div className="flex items-center mb-1">
                  <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-white rounded bg-deep-purple-accent-400">
                    1
                  </span>
                  <p className="text-lg font-semibold sm:text-base">
                    Read the recipe
                  </p>
                </div>
                <p className="text-sm text-gray-900">
                  Take a good look at the recipe. Don’t just skim it; read it
                  through from start to finish. As you read, visualize doing the
                  steps which will help when you’re prepping.
                </p>
              </div>
              <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-teal-50">
                <div className="flex items-center mb-1">
                  <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-teal-900 rounded bg-teal-accent-400">
                    2
                  </span>
                  <p className="text-lg font-semibold sm:text-base">
                    Know the assumptions
                  </p>
                </div>
                <p className="text-sm text-gray-900">
                  All recipes are written using certain conventions, which
                  define the characteristics of common ingredients. The rules
                  vary from place to place.
                </p>
              </div>
              <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-teal-50">
                <div className="flex items-center mb-1">
                  <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-white rounded md:text-teal-900 bg-deep-purple-accent-400 md:bg-teal-accent-400">
                    3
                  </span>
                  <p className="text-lg font-semibold sm:text-base">
                    Figure out the timing
                  </p>
                </div>
                <p className="text-sm text-gray-900">
                  Check the “prep time” and “total time” listed at the top to be
                  sure you have enough time to complete the recipe. Look for
                  hints, such as the words “meanwhile” .
                </p>
              </div>
              <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-indigo-50">
                <div className="flex items-center mb-1">
                  <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-teal-900 rounded md:text-white bg-teal-accent-400 md:bg-deep-purple-accent-400">
                    4
                  </span>
                  <p className="text-lg font-semibold sm:text-base">
                    Plan ahead
                  </p>
                </div>
                <p className="text-sm text-gray-900">
                  Missing a prep instruction can leave you scrambling in the
                  middle of a recipe. Keep your eyes peeled for time-consuming
                  steps and be careful.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="py-6 bg-white">
          <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">
            Vous avez une question?
          </h2>
          <ul className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto mt-20 divide-y  shadow shadow-[#FFA726] rounded-xl">
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <h2 className="text-2xl font-semibold">
                    <span>What am I getting as a Premium Member?</span>
                  </h2>
                </summary>

                <article className="px-4 pb-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <h2 className="text-2xl font-semibold">
                    <span>What am I getting as a Premium Member?</span>
                  </h2>
                </summary>

                <article className="px-4 pb-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.{" "}
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <h2 className="text-2xl font-semibold">
                    <span>What am I getting as a Premium Member?</span>
                  </h2>
                </summary>

                <article className="px-4 pb-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.{" "}
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <h2 className="text-2xl font-semibold">
                    <span>What am I getting as a Premium Member?</span>
                  </h2>
                </summary>

                <article className="px-4 pb-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.{" "}
                  </p>
                </article>
              </details>
            </li>
          </ul>
        </section>

        <section className="m-10 bg-[#f1a730]">
          <div className="p-10 rounded-l-xl text-white border border-[#f1a730] bg-[url('https://www.material-tailwind.com/image/gradient-bg-1.png')] rounded-xl bg-no-repeat lg:bg-contain bg-cover bg-right">
            <Typography
              placeholder="Enter placeholder text"
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              variant="small"
              color="blue-gray"
              className="font-bold mb-2"
            >
              Makoya pour tous
            </Typography>
            <Typography
              variant="h3"
              color="blue-gray"
              placeholder=""
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
            >
              Inscrivez votre entreprise GRATUITEMENT sur Justdial aujourd'hui
            </Typography>
            <Typography
              placeholder="Enter placeholder text"
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              className="mt-2 mb-6 !text-base font-normal text-white"
            >
              En continuant, vous acceptez nos conditions d'utilisation , notre
              politique de confidentialité et de violation..
            </Typography>

            {/*  <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-sky-500  border-none rounded-md hover:bg-warning text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 "
              
              onClick={loginModal.onOpen}
            >
              Login / S'inscrire
            </button> */}
            <Button
              variant="outlined"
              className="flex-shrink-0 bg-sky-500 text-white"
              placeholder="Enter placeholder text"
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              onClick={loginModal.onOpen}
            >
              Créer un compte gratuitement
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Annnce;
