"use client";
import CircleLoader from "@/components/CircleLoader";
import { userContext } from "@/context/GlobalContextProvider";
import {  useUser  } from "@clerk/nextjs";
import Link from "next/link";
import { useContext } from "react";
const SuccessPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
    const {setUserDetails, setIsLoggedIn, userDetails} = useContext(userContext);
    if (!isLoaded) {
        return <CircleLoader/>;
    }
    setUserDetails(user);
    setIsLoggedIn(isSignedIn);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-green-500">Order Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase.</p>
      <Link href='/'>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Continue Shopping 
      </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
