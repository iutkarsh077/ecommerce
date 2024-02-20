"use client";
import {createContext, useState } from "react";

export const userContext = createContext();

export const GlobalContextProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    console.log(userDetails);
    return (
        <userContext.Provider value={{ setUserDetails, setIsLoggedIn, isLoggedIn, userDetails}}>
            {children}
        </userContext.Provider>
    )
}