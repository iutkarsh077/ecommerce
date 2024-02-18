"use client";
import React, { useContext, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import { userContext } from "@/context/GlobalContextProvider";
import { SignOutButton } from "@clerk/nextjs";
import { IoMdCart } from "react-icons/io";
import SearchBar from "./SearchBar";
export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const {isLoggedIn} = useContext(userContext);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      {
        isLoggedIn ? (
          <>
          <Menu setActive={setActive}>
          <SearchBar/>
          <div className="hover:cursor-pointer flex items-center text-3xl p-1">
          <IoMdCart/>
          </div>
         <SignOutButton>
        <button>Sign out</button>
      </SignOutButton>
      </Menu>
          </>
        ) : (
          <Menu setActive={setActive}>
        <HoveredLink href={"/sign-in"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Sign In"
          ></MenuItem>
        </HoveredLink>
        <HoveredLink href={"/sign-up"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Sign Up"
          ></MenuItem>
        </HoveredLink>
      </Menu>
        )
      }
    </div>
  );
}
