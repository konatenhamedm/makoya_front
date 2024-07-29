"use client";
import { useState } from "react";
import { projects as projectsData } from "../data";
import { Category } from "../types";
import ProjectNavbar from "@/components/profile/ProjectNavbar";
import ProjectCard from "@/components/profile/ProjectCard";

const Page = () => {
  const [projects, setProjects] = useState(projectsData);
  const [active, setActive] = useState("All");

  const handleFilterCategory = (category: Category | "all") => {
    if (category === "all") {
      setProjects(projectsData);
      setActive(category);
      return;
    }

    const newArray = projectsData.filter((project) =>
      project.category.includes(category)
    );

    setProjects(newArray);
    setActive(category);
  };

  return (
    <div className="px-5 py-2 overflow-y-scroll " style={{ height: "65vh" }}>
      <ProjectNavbar
        handleFilterCategory={handleFilterCategory}
        active={active}
      />
      <div className="relative grid grid-cols-12 gap-4 my-3">
        {/* <AnimatePresence> */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="col-span-12 p-2 bg-gray-200 rounded-lg dark:bg-black-200 sm:col-span-6 lg:col-span-4"
          >
            <ProjectCard project={project} key={project.id} />
          </div>
        ))}
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
};

export default Page;
