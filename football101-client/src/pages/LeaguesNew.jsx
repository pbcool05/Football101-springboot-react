"use client"

import { useState, useEffect } from "react"
import { getLeagues, getLeaderboard } from "../api/footballApi"
import { Link } from "react-router-dom"
import { FaTrophy, FaUsers, FaBullseye, FaAward, FaSpinner, FaImage } from "react-icons/fa"


export default function LeaguesDashboard() {
  const [leagues, setLeagues] = useState([])
  const [leaguesLoading, setLeaguesLoading] = useState(false)
  const [leaguesMessage, setLeaguesMessage] = useState("")

  const [selectedLeague, setSelectedLeague] = useState("")
  const [table, setTable] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [tableMessage, setTableMessage] = useState("")

  useEffect(() => {
    setLeaguesLoading(true)
    getLeagues()
      .then((data) => {
        setLeagues(data)
        if (!data.length) setLeaguesMessage("No leagues found.")
      })
      .catch(() => setLeaguesMessage("Failed to fetch leagues."))
      .finally(() => setLeaguesLoading(false))
  }, [])

  const fetchTable = (leagueName) => {
    setSelectedLeague(leagueName)
    setTable([])
    setTableMessage("")
    setTableLoading(true)
    getLeaderboard(leagueName)
      .then((data) => {
        setTable(data)
        if (!data.length) setTableMessage("No leaderboard data found.")
      })
      .catch(() => setTableMessage("Failed to fetch leaderboard."))
      .finally(() => setTableLoading(false))
  }

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner className="animate-spin h-12 w-12 text-gray-400" />
      <p className="mt-4 text-gray-400 text-sm">Loading...</p>
    </div>
  )

  const getPositionColor = (index) => {
    if (index === 0) return "text-yellow-500"
    if (index === 1) return "text-gray-400"
    if (index === 2) return "text-amber-600"
    return "text-gray-500"
  }

  const getPositionIcon = (index) => {
    if (index < 3) return <FaAward className="h-4 w-4" />
    return <span className="text-sm font-semibold">{index + 1}</span>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 px-4 pb-20">
      
      
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400 mb-4">
            Leagues Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore leagues and track team performance across competitions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Leagues List */}
          <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-xl shadow-xl">
            <div className="p-6 border-b border-gray-700">
              <h2 className="flex items-center gap-3 text-2xl text-gray-300 font-semibold">
                <FaTrophy className="h-6 w-6" />
                Available Leagues
              </h2>
            </div>
            <div className="p-6">
              {leaguesLoading ? (
                <LoadingSpinner />
              ) : leagues.length ? (
                <div className="space-y-3">
                  {leagues.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => fetchTable(l.leagueName)}
                      className="group cursor-pointer p-4 rounded-lg border border-gray-700 hover:border-gray-600 bg-gray-800/30 hover:bg-gray-800/60 transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/10"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center">
                            <FaTrophy className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-gray-300 transition-colors">
                              {l.leagueName}
                            </h3>
                            <p className="text-sm text-gray-400">Click to view standings</p>
                          </div>
                        </div>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">ID: {l.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaTrophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">{leaguesMessage}</p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Leaderboard Table */}
          <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-xl shadow-xl">
            <div className="p-6 border-b border-gray-700">
              <h2 className="flex items-center gap-3 text-2xl text-gray-300 font-semibold">
                <FaBullseye className="h-6 w-6" />
                {selectedLeague ? `${selectedLeague} Standings` : "League Standings"}
              </h2>
            </div>
            <div className="p-6">
              {tableLoading ? (
                <LoadingSpinner />
              ) : table.length > 0 ? (
                <div className="overflow-hidden rounded-lg border border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Pos</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Team</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">MP</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">W</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">D</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">L</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Pts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {table.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-800/30 transition-colors group">
                            <td className="px-4 py-3">
                              <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full ${getPositionColor(i)}`}
                              >
                                {getPositionIcon(i)}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Link
                                to={`/team/${encodeURIComponent(row.teamName)}`}
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group-hover:underline"
                              >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center">
                                  <FaUsers className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-medium">{row.teamName}</span>
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-300">{row.matchesPlayed}</td>
                            <td className="px-4 py-3 text-center text-green-400 font-semibold">{row.won}</td>
                            <td className="px-4 py-3 text-center text-yellow-400 font-semibold">{row.drawn}</td>
                            <td className="px-4 py-3 text-center text-red-400 font-semibold">{row.lost}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-2 py-1 rounded">
                                {row.points}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaBullseye className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    {selectedLeague ? tableMessage || "No leaderboard data." : "Select a league to view standings."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
