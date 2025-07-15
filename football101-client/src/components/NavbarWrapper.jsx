"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import {
  IconHome,
  IconUsersGroup,
  IconTrophy,
  IconListNumbers,
  IconSoccerField,
} from "@tabler/icons-react";

export default function NavbarWrapper() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Teams",
      link: "/teams",
      icon: <IconUsersGroup className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Leagues",
      link: "/leagues",
      icon: <IconTrophy className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    //leagues and leaderboard functionality merged
    // {
    //   name: "Leaderboard",
    //   link: "/leaderboard",
    //   icon: <IconListNumbers className="h-4 w-4 text-neutral-500 dark:text-white" />,
    // },
    {
      name: "Match",
      link: "/match",
      icon: <IconSoccerField className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}