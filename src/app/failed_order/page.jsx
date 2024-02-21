"use client"
import CircleLoader from "@/components/CircleLoader";
import {  useUser  } from "@clerk/nextjs";
import { userContext } from "@/context/GlobalContextProvider";
import Link from "next/link";
import { useContext } from "react";
const FailedOrderPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const {setUserDetails, setIsLoggedIn, userDetails} = useContext(userContext);
  if (!isLoaded) {
      return <CircleLoader/>;
  }
  setUserDetails(user);
  setIsLoggedIn(isSignedIn);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Order Failed</h1>
      <p className="text-lg mb-8">We apologize for the inconvenience.</p>
      <Link href="/">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Try Again
      </button>
      </Link>
    </div>
  );
};

export default FailedOrderPage;
