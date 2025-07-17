"use client"

import { useState, useEffect } from "react"
import { getTeams, addTeam, assignTeamToLeague } from "../api/footballApi"
import { FaUsers, FaPlus, FaTrophy, FaSpinner, FaSync } from "react-icons/fa"

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [teamForm, setTeamForm] = useState({ teamName: "", league: "" })
  const [activeTab, setActiveTab] = useState("view")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const fetchTeams = () => {
    setLoading(true)
    setMessage("")
    getTeams()
      .then(setTeams)
      .catch(() => setMessage("Error fetching teams"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const handleAddTeam = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    addTeam(teamForm)
      .then(() => assignTeamToLeague(teamForm))
      .then(() => {
        fetchTeams()
        setTeamForm({ teamName: "", league: "" })
        setMessage("Team added and assigned successfully!")
        setTimeout(() => setMessage(""), 3000)
      })
      .catch(() => setMessage("Failed to add and assign team"))
      .finally(() => setLoading(false))
  }

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner className="animate-spin h-10 w-10 text-gray-400" />
      <p className="mt-4 text-gray-400 text-sm">Loading teams...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center mx-auto mb-6">
            <FaUsers className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400 mb-4">
            Teams Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Manage your football teams and league assignments</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border text-center ${
              message.includes("successfully")
                ? "border-green-500 bg-green-500/10 text-green-400"
                : "border-red-500 bg-red-500/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Enhanced Tabs */}
        <div className="max-w-md mx-auto mb-8">
          <div className="grid grid-cols-2 bg-gray-900 border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("view")}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded transition-all ${
                activeTab === "view" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <FaUsers className="h-4 w-4" />
              View Teams
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded transition-all ${
                activeTab === "add" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <FaPlus className="h-4 w-4" />
              Add Team
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* View Teams Tab */}
          {activeTab === "view" && (
            <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-xl">
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="flex items-center gap-3 text-2xl text-gray-300 font-semibold">
                    <FaUsers className="h-6 w-6" />
                    Current Teams
                  </h2>
                  <button
                    onClick={fetchTeams}
                    disabled={loading}
                    className="border border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent px-4 py-2 rounded text-sm transition-colors flex items-center gap-2"
                  >
                    <FaSync className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </button>
                </div>
              </div>
              <div className="p-6">
                {loading ? (
                  <LoadingSpinner />
                ) : teams.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        className="bg-gray-800/30 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/10 rounded-xl"
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center">
                              <FaUsers className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white text-lg">{team.teamName}</h3>
                              <p className="text-sm text-gray-400">Team ID: {team.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaTrophy className="h-4 w-4 text-yellow-500" />
                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">{team.league}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaUsers className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No teams found</p>
                    <p className="text-gray-500 text-sm mt-2">Add your first team to get started</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add Team Tab */}
          {activeTab === "add" && (
            <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm max-w-2xl mx-auto rounded-xl">
              <div className="p-6 border-b border-gray-700">
                <h2 className="flex items-center gap-3 text-2xl text-gray-300 font-semibold">
                  <FaPlus className="h-6 w-6" />
                  Add New Team
                </h2>
                <p className="text-gray-400 mt-2">Create a new team and assign it to a league</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleAddTeam} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="team-name" className="text-gray-300 flex items-center gap-2 font-medium">
                        <FaUsers className="h-4 w-4" />
                        Team Name
                      </label>
                      <input
                        id="team-name"
                        placeholder="Enter team name"
                        value={teamForm.teamName}
                        onChange={(e) => setTeamForm((f) => ({ ...f, teamName: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-500 focus:outline-none p-3 rounded-lg transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="league-name" className="text-gray-300 flex items-center gap-2 font-medium">
                        <FaTrophy className="h-4 w-4" />
                        League Name
                      </label>
                      <input
                        id="league-name"
                        placeholder="Enter league name"
                        value={teamForm.league}
                        onChange={(e) => setTeamForm((f) => ({ ...f, league: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-500 focus:outline-none p-3 rounded-lg transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 bg-gradient-to-r from-gray-800 to-black border border-gray-600 hover:from-gray-700 hover:to-gray-900 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <FaSpinner className="animate-spin h-5 w-5" />
                        Adding Team...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaPlus className="h-5 w-5" />
                        Add Team to League
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
