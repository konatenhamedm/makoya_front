import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
 import { getUser } from "./actions"; 
/* import { UserProfile } from "@/common.types"; */
import axios, { axiosAuth, axiosAuthapi } from "./axios";

export const authOptions: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
       
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
       
        if (typeof credentials !== "undefined") {
            const res = await axiosAuth.post("/auth/login_check", {
            username: credentials.username,
            password: credentials.password,
          });  
          if (typeof res !== "undefined") {
            // return { ...res.user, apiToken: res.token }
            const data = res.data;
            const resultat = {
              ...data.user,
              accessToken: res.data.token,
            }

          
            if (resultat) {
            
              return resultat ;
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null;

              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = token.accessToken ;
      
        // all of the user data is being logged, yet how to pass it down to session callback so i can use all the user data in the client?
      }
      return token;
    },
    async session({ session, token }) {
      try { 
        
       const data = (await getUser(session.user.email)) ;
               
       /*  session.user = token as any; */
         
       /*  session.user = token as any; */
      
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions));

  return session;
} 


