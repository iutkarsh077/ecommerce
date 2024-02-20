"use client";
import {  useUser  } from "@clerk/nextjs";
import CircleLoader from "./CircleLoader";
import { useContext } from "react";
import { userContext } from "@/context/GlobalContextProvider";
import  { ImagesSliderDemo } from "./ImageSlider";
import ProductListed from "./ProductListed";
const MyHome = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const {setUserDetails, setIsLoggedIn, userDetails} = useContext(userContext);
    if (!isLoaded) {
        return <CircleLoader/>;
    }
    setUserDetails(user);
    setIsLoggedIn(isSignedIn);
  return (
    <div>
        <ImagesSliderDemo/>
        <ProductListed/>
    </div>
  );
};

export default MyHome;
