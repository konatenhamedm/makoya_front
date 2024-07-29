import { IService } from "@/app/profile/types";
import { FunctionComponent } from "react";
// import { motion } from 'framer-motion'

const ServiceCard: FunctionComponent<{ service: IService }> = ({
  service: { Icon, title, about },
}) => {
  //XSS attack :( on our portfolio btw, as an alternate use npm i dom purify
  function createMarkup() {
    return {
      __html: about,
    };
  }

  return (
    /*  <div className="flex items-center p-2 space-x-4 ">
      <Icon className="w-12 h-12 text-green" />
      <div className="">
        <h6 className="font-bold">{title}</h6>
        <p dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div> */

    <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
      <div className="p-4 flex items-center">
        <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Total clients
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            6389
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
