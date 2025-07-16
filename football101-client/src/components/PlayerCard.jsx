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
    document.body.style.overflow = active ? "hidden" : "auto"
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [active])

  useOutsideClick(ref, () => setActive(false))

  const getPositionColor = (position) => {
    const colors = {
      GK: "bg-yellow-500",
      DEF: "bg-blue-500",
      MID: "bg-green-500",
      FWD: "bg-red-500",
      ATT: "bg-red-500",
    }
    return colors[position?.toUpperCase()] || "bg-slate-500"
  }

  const StatItem = ({ icon: Icon, label, value, color = "text-slate-300" }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
          <Icon className="h-4 w-4 text-slate-300" />
        </div>
        <span className="text-slate-300 font-medium">{label}</span>
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
              className="bg-slate-800 border border-slate-600 max-w-md w-full rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
                <button
                  className="absolute top-4 right-4 text-white hover:bg-white/20 h-8 w-8 rounded flex items-center justify-center transition-colors"
                  onClick={() => setActive(false)}
                >
                  <FaTimes className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {player.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                    <span
                      className={`${getPositionColor(player.position)} text-white font-semibold mt-1 px-2 py-1 rounded text-sm`}
                    >
                      {player.position}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats content */}
              <div className="p-6 space-y-3">
                <StatItem icon={FaUser} label="Age" value={`${player.age} years`} />
                <StatItem icon={FaUsers} label="Matches Played" value={player.mp} color="text-blue-400" />
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
          className="bg-slate-800/50 border border-slate-600 hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 group rounded-xl"
          onClick={() => setActive(true)}
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                  {player.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {player.name}
                  </h3>
                  <span className="bg-slate-600 text-slate-300 text-xs px-2 py-1 rounded">{player.position}</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-3 py-1 rounded text-sm transition-colors">
                View Stats
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
