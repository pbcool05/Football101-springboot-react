"use client"

import { useState } from "react"
import { addMatch } from "../api/footballApi"
import { FaCalendarAlt, FaUsers, FaTrophy, FaBullseye, FaSpinner } from "react-icons/fa"

export default function Match() {
  const [form, setForm] = useState({
    leagueName: "",
    homeTeamName: "",
    awayTeamName: "",
    score: "",
    winner: "",
    matchDate: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    addMatch(form)
      .then(() => {
        setForm({
          leagueName: "",
          homeTeamName: "",
          awayTeamName: "",
          score: "",
          winner: "",
          matchDate: "",
        })
        setMessage("Match added successfully!")
      })
      .catch(() => setMessage("Failed to add match."))
      .finally(() => setLoading(false))
  }

  const handleInputChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm shadow-2xl rounded-xl">
          <div className="text-center pb-6 p-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <FaBullseye className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Add Match
            </h1>
            <p className="text-slate-400 mt-2">Record a new match result</p>
          </div>

          <div className="px-8 pb-8 space-y-6">
            {message && (
              <div
                className={`p-4 rounded-lg border text-center font-semibold ${
                  message.includes("successfully")
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : "border-red-500 bg-red-500/10 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <div className="border-amber-500 bg-amber-500/10 p-4 rounded-lg border">
              <p className="text-amber-400 font-medium text-center">All fields are required to submit the match</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* League and Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="league" className="text-slate-300 flex items-center gap-2 font-medium">
                    <FaTrophy className="h-4 w-4" />
                    League Name
                  </label>
                  <input
                    id="league"
                    placeholder="Enter league name"
                    value={form.leagueName}
                    onChange={(e) => handleInputChange("leagueName", e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none p-4 rounded-lg transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-slate-300 flex items-center gap-2 font-medium">
                    <FaCalendarAlt className="h-4 w-4" />
                    Match Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={form.matchDate}
                    onChange={(e) => handleInputChange("matchDate", e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white focus:border-blue-500 focus:outline-none p-4 rounded-lg transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Teams Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="home-team" className="text-slate-300 flex items-center gap-2 font-medium">
                    <FaUsers className="h-4 w-4" />
                    Home Team
                  </label>
                  <input
                    id="home-team"
                    placeholder="Enter home team name"
                    value={form.homeTeamName}
                    onChange={(e) => handleInputChange("homeTeamName", e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none p-4 rounded-lg transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="away-team" className="text-slate-300 flex items-center gap-2 font-medium">
                    <FaUsers className="h-4 w-4" />
                    Away Team
                  </label>
                  <input
                    id="away-team"
                    placeholder="Enter away team name"
                    value={form.awayTeamName}
                    onChange={(e) => handleInputChange("awayTeamName", e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none p-4 rounded-lg transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Score and Winner Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="score" className="text-slate-300 flex items-center gap-2 font-medium">
                    <FaBullseye className="h-4 w-4" />
                    Final Score
                  </label>
                  <input
                    id="score"
                    placeholder="e.g., 2 - 1"
                    value={form.score}
                    onChange={(e) => handleInputChange("score", e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500 focus:outline-none p-4 rounded-lg transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="winner" className="text-slate-300 flex items-center gap-2 font-medium">
                    <FaTrophy className="h-4 w-4" />
                    Winner
                  </label>
                  <input
                    id="winner"
                    placeholder="Enter winning team name"
                    value={form.winner}
                    onChange={(e) => handleInputChange("winner", e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500 focus:outline-none p-4 rounded-lg transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin h-5 w-5" />
                    Adding Match...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaBullseye className="h-5 w-5" />
                    Add Match
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
