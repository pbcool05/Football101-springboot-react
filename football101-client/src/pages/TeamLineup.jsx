"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlayersFromTeam } from "../api/footballApi"
import PlayerCard from "../components/PlayerCard"
import { FaUsers, FaSpinner, FaChevronDown } from "react-icons/fa"

export default function TeamLineup() {
  const { teamName } = useParams()
  const teams = ["Liverpool", "Chelsea", "Arsenal", "Manchester City", "Newcastle United"]
  const [selectedTeam, setSelectedTeam] = useState(teams.includes(teamName) ? teamName : "Liverpool")
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setLoading(true)
    setMessage("")
    getPlayersFromTeam(selectedTeam)
      .then((data) => {
        if (!data || data.length === 0) {
          setMessage("No players found for this team.")
          setPlayers([])
        } else {
          setPlayers(data)
        }
      })
      .catch(() => {
        setMessage("Failed to fetch players.")
        setPlayers([])
      })
      .finally(() => setLoading(false))
  }, [selectedTeam])

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <FaSpinner className="animate-spin h-12 w-12 text-gray-400" />
      <p className="mt-4 text-gray-400">Loading players...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
            Team Lineup
          </h1>
          <p className="text-xl text-gray-400">Explore player rosters and statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Team Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm sticky top-32 rounded-xl">
              <div className="p-6 border-b border-gray-700">
                <h2 className="flex items-center gap-2 text-gray-300 font-semibold text-lg">
                  <FaUsers className="h-5 w-5" />
                  Select Team
                </h2>
              </div>
              <div className="p-6">
                <div className="relative">
                  <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-gray-500 appearance-none pr-10"
                  >
                    {teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* Team Info */}
                <div className="mt-6 p-4 rounded-lg bg-gray-800/30 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center">
                      <FaUsers className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedTeam}</h3>
                      <p className="text-sm text-gray-400">Premier League</p>
                    </div>
                  </div>
                  <span className="bg-gray-700 text-white px-2 py-1 rounded text-sm">{players.length} Players</span>
                </div>
              </div>
            </div>
          </div>

          {/* Players Grid */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-xl">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl text-white flex items-center gap-3 font-semibold">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center">
                    <FaUsers className="h-4 w-4 text-white" />
                  </div>
                  {selectedTeam} Squad
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <LoadingSpinner />
                ) : message ? (
                  <div className="text-center py-16">
                    <FaUsers className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">{message}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {players.map((player, index) => (
                      <PlayerCard key={index} player={player} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
