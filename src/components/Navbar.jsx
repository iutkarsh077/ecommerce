"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
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
    </div>
  );
}
