import { FloatingNav } from "../ui/floating-navbar"
import { FaHome, FaUsers, FaTrophy, FaFutbol } from "react-icons/fa"

export default function NavbarWrapper() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Teams",
      link: "/teams",
      icon: <FaUsers className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Leagues",
      link: "/leagues",
      icon: <FaTrophy className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Match",
      link: "/match",
      icon: <FaFutbol className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Lineup",
      link: "/team/Liverpool", // Default to Liverpool or choose a default team
      icon: <FaUsers className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ]

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  )
}
