// import { GraphQLClient } from "graphql-request";

import { axiosAuthapi } from "./axios";

// import {
//   createProjectMutation,
//   createUserMutation,
//   deleteProjectMutation,
//   updateProjectMutation,
//   getProjectByIdQuery,
//   getProjectsOfUserQuery,
//   getUserQuery,
//   projectsQuery,
// } from "@/graphql";
// import { ProjectForm } from "@/common.types";

// const isProduction = process.env.NODE_ENV === "production";
// const apiUrl = isProduction
//   ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
//   : "http://127.0.0.1:4000/graphql";
// const apiKey = isProduction
//   ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
//   : "letmein";
// const serverUrl = isProduction
//   ? process.env.NEXT_PUBLIC_SERVER_URL
//   : "http://localhost:3000";

// const client = new GraphQLClient(apiUrl);

// export const fetchToken = async () => {
//   try {
//     const response = await fetch(`${serverUrl}/api/auth/token`);
//     return response.json();
//   } catch (err) {
//     throw err;
//   }
// };

// export const uploadImage = async (imagePath: string) => {
//   try {
//     const response = await fetch(`${serverUrl}/api/upload`, {
//       method: "POST",
//       body: JSON.stringify({
//         path: imagePath,
//       }),
//     });
//     return response.json();
//   } catch (err) {
//     throw err;
//   }
// };

// const makeGraphQLRequest = async (query: string, variables = {}) => {
//   try {
//     return await client.request(query, variables);
//   } catch (err) {
//     throw err;
//   }
// };

// export const fetchAllProjects = (
//   category?: string | null,
//   endcursor?: string | null
// ) => {
//   client.setHeader("x-api-key", apiKey);

//   return makeGraphQLRequest(projectsQuery, { category, endcursor });
// };

// export const createNewProject = async (
//   form: ProjectForm,
//   creatorId: string,
//   token: string
// ) => {
//   const imageUrl = await uploadImage(form.image);

//   if (imageUrl.url) {
//     client.setHeader("Authorization", `Bearer ${token}`);

//     const variables = {
//       input: {
//         ...form,
//         image: imageUrl.url,
//         createdBy: {
//           link: creatorId,
//         },
//       },
//     };

//     return makeGraphQLRequest(createProjectMutation, variables);
//   }
// };

// export const updateProject = async (
//   form: ProjectForm,
//   projectId: string,
//   token: string
// ) => {
//   function isBase64DataURL(value: string) {
//     const base64Regex = /^data:image\/[a-z]+;base64,/;
//     return base64Regex.test(value);
//   }

//   let updatedForm = { ...form };

//   const isUploadingNewImage = isBase64DataURL(form.image);

//   if (isUploadingNewImage) {
//     const imageUrl = await uploadImage(form.image);

//     if (imageUrl.url) {
//       updatedForm = { ...updatedForm, image: imageUrl.url };
//     }
//   }

//   client.setHeader("Authorization", `Bearer ${token}`);

//   const variables = {
//     id: projectId,
//     input: updatedForm,
//   };

//   return makeGraphQLRequest(updateProjectMutation, variables);
// };

// export const deleteProject = (id: string, token: string) => {
//   client.setHeader("Authorization", `Bearer ${token}`);
//   return makeGraphQLRequest(deleteProjectMutation, { id });
// };

// export const getProjectDetails = (id: string) => {
//   client.setHeader("x-api-key", apiKey);
//   return makeGraphQLRequest(getProjectByIdQuery, { id });
// };

export const createUser = (name: string, email: string, avatarUrl: string) => {
  // client.setHeader("x-api-key", apiKey);
  // const variables = {
  //   input: {
  //     name: name,
  //     email: email,
  //     avatarUrl: avatarUrl,
  //   },
  // };
  // return makeGraphQLRequest(createUserMutation, variables);
};

export const getUser = async (email: string) => {

  const response = await axiosAuthapi.get("/front/getOne/"+email).then((res) => {
    
      return res.data;/* {
    
    username: res.data.data.code,
    email: res.data.data.emai,
    reference: "string",
    type: "string",
    token: "string",
    
  }; */
  })

  return response;
  // client.setHeader("x-api-key", apiKey);
  // return makeGraphQLRequest(getUserQuery, { email });
};

export const distances = async (lat1:string, lng1:string, lat2:string, lng2:string, $unit = 'k')=>{

}

/* function deg2rad(x){
    return Math.PI*x/180;
  }
   
  function get_distance_m($lat1, $lng1, $lat2, $lng2) {
    $earth_radius = 6378137;   // Terre = sphère de 6378km de rayon
    $rlo1 = deg2rad($lng1);    // CONVERSION
    $rla1 = deg2rad($lat1);
    $rlo2 = deg2rad($lng2);
    $rla2 = deg2rad($lat2);
    $dlo = ($rlo2 - $rlo1) / 2;
    $dla = ($rla2 - $rla1) / 2;
    $a = (Math.sin($dla) * Math.sin($dla)) + Math.cos($rla1) * Math.cos($rla2) * (Math.sin($dlo) * Math.sin($dlo
  ));
    $d = 2 * Math.atan2(Math.sqrt($a), Math.sqrt(1 - $a));
    return ($earth_radius * $d);
  } */