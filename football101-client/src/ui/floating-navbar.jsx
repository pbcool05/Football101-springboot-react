"use client"

import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()
      if (scrollYProgress.get() < 0.1) {
        setVisible(true) // keep visible near top
      } else if (direction < 0) {
        setVisible(true) // show on scroll up
      } else if (direction > 0 && scrollYProgress.get() > 0.2) {
        setVisible(false) // only hide if scrolled down more
      }
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-slate-600/50 rounded-full bg-slate-900/80 backdrop-blur-md shadow-2xl z-[5000] px-6 py-3 items-center justify-center space-x-6",
          className,
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative flex items-center space-x-2 text-slate-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-full hover:bg-slate-700/50 group",
            )}
          >
            <span className="block sm:hidden text-blue-400 group-hover:text-white transition-colors">
              {navItem.icon}
            </span>
            <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
