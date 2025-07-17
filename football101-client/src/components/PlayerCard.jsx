"use client"

import { useId, useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { FaUser, FaTrophy, FaBullseye, FaUsers, FaTimes } from "react-icons/fa"

// Simple outside click hook replacement
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}

export default function PlayerCard({ player }) {
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const id = useId()

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActive(false)
    }
    // if (active) {
    //   // Prevent body scroll when modal is open
    //   document.body.style.overflow = "hidden"
    //   document.body.style.paddingRight = "15px" // Prevent layout shift
    // } else {
    //   // Restore body scroll when modal is closed
    //   document.body.style.overflow = "auto"
    //   document.body.style.paddingRight = "0px"
    // }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [active])

  useOutsideClick(ref, () => setActive(false))

  const getPositionColor = (position) => {
    const colors = {
      GK: "bg-yellow-500",
      DF: "bg-blue-500",
      MF: "bg-green-500",
      FW: "bg-red-500",
      
    }
    return colors[position?.toUpperCase()] || "bg-gray-500"
  }

  const StatItem = ({ icon: Icon, label, value, color = "text-gray-300" }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <Icon className="h-4 w-4 text-gray-300" />
        </div>
        <span className="text-gray-300 font-medium">{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}</span>
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <motion.div
              layoutId={`card-${player.name}-${id}`}
              ref={ref}
              className="bg-gray-900 border border-gray-700 max-w-md w-full rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-gray-800 to-black p-6 relative border-b border-gray-700">
                <button
                  className="absolute top-4 right-4 text-white hover:bg-white/20 h-8 w-8 rounded flex items-center justify-center transition-colors"
                  onClick={() => setActive(false)}
                >
                  <FaTimes className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {player.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                    <span
                      className={`${getPositionColor(player.positions)} text-white font-semibold mt-1 px-2 py-1 rounded text-sm`}
                    >
                      {player.positions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats content */}
              <div className="p-6 space-y-3">
                <StatItem icon={FaUser} label="Age" value={`${player.age} years`} />
                <StatItem icon={FaUsers} label="Matches Played" value={player.matchesPlayed} color="text-gray-400" />
                <StatItem icon={FaBullseye} label="Goals" value={player.goals} color="text-green-400" />
                <StatItem icon={FaTrophy} label="Assists" value={player.assists} color="text-yellow-400" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card trigger */}
      <motion.div layoutId={`card-${player.name}-${id}`}>
        <div
          className="bg-gray-900/50 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/10 group rounded-xl"
          onClick={() => setActive(true)}
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center text-lg font-bold text-white">
                  {player.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">
                    {player.name}
                  </h3>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{player.positions}</span>
                </div>
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 text-white shadow-md px-3 py-1 rounded text-sm transition-colors">
                View Stats
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
