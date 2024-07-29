"use client";
import type { Metadata, NextPage } from "next";

import { services } from "../data";
import { IService } from "../types";
import ServiceCard from "@/components/profile/ServiceCard";
import { useEffect, useState } from "react";
import { axiosAuth } from "@/lib/axios";

const Page: NextPage = () => {
  //console.log(getServerSideProps);
  const [data, setData] = useState();

  useEffect(() => {
    axiosAuth
      .get("http://127.0.0.1:8000/api/front/getOne/konatenhamed@gmail.com")
      .then((res) => res.data)
      .then((data) => setData(data));
  }, [data]);

  console.log("DATTTTTTT ", data);

  return (
    <>
      <div className="flex flex-col flex-grow px-6 pt-8 top-10 bg-white">
        {/* <h6 className="my-3 text-base font-medium">
        I am currently pursuing B.Tech Degree(Final Year) in Computer Science
        Engineering from Academy of Technology. I have 3+ years of experience in
        Web Development and I have a Youtube Channel where I teach Full Stack
        Web Development Projects
      </h6> */}

        <div
          className="flex-grow p-4 mt-5 bg-gray-400 dark:bg-black-100"
          style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
        >
          <h4 className="my-3 text-xl font-semibold tracking-wide">
            Quelque statistiques {/* <pre>{JSON.stringify(data, null)}</pre> */}
          </h4>

          <div className="grid gap-6 my-3 md:grid-cols-2">
            {/* children's initial and animate property should be same as the parent during a stagger effect  */}
            {services.map((service) => (
              <div
                className="col-span-2 p-2 bg-gray-200 rounded-lg dark:bg-black-500 lg:col-span-1 "
                key={service.title}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

//!called every time  the page refreshed
/* export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const res = await fetch(
    "http://localhost:8000/api/front/getOne/konatenhamed@gmail.com"
  );
  const data = await res.json();
  console.log(data);
  return { props: { services: data.services } };
}; */

//!called only during the build of the project
//? make sure the server(localhost:3000)[this will receive the request during build] is running on a terminal during the build
//? also need to change the localhost during the deployment | see the todo
// https://aude53.medium.com/set-environment-variables-with-next-js-and-vercel-e544c0460a48

// export const getStaticProps: GetStaticProps = async (
//    context: GetStaticPropsContext
// ) => {
//    // console.log(context);

//    const res = await fetch('http://localhost:3000/api/services')
//    const { services } = await res.json()
//    console.log({ services })
//    return { props: { services: services } }
// }

export default Page;
