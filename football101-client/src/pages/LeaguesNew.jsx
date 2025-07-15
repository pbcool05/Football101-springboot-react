// src/pages/LeaguesDashboard.jsx
import React, { useState, useEffect } from "react";
import { getLeagues, getLeaderboard } from "../api/footballApi";

export default function LeaguesDashboard() {
  // Leagues state
  const [leagues, setLeagues] = useState([]);
  const [leaguesLoading, setLeaguesLoading] = useState(false);
  const [leaguesMessage, setLeaguesMessage] = useState("");

  // Leaderboard state
  const [selectedLeague, setSelectedLeague] = useState("");
  const [table, setTable] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableMessage, setTableMessage] = useState("");

  // Fetch leagues on mount
  useEffect(() => {
    setLeaguesLoading(true);
    getLeagues()
      .then((data) => {
        setLeagues(data);
        if (!data.length) setLeaguesMessage("No leagues found.");
      })
      .catch(() => setLeaguesMessage("Failed to fetch leagues."))
      .finally(() => setLeaguesLoading(false));
  }, []);

  // Fetch leaderboard when a league is selected
  const fetchTable = (leagueName) => {
    setSelectedLeague(leagueName);
    setTable([]);
    setTableMessage("");
    setTableLoading(true);
    getLeaderboard(leagueName)
      .then((data) => {
        setTable(data);
        if (!data.length) setTableMessage("No leaderboard data found.");
      })
      .catch(() => setTableMessage("Failed to fetch leaderboard."))
      .finally(() => setTableLoading(false));
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-40 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Leagues Dashboard</h1>
        {/* Leagues List */}
        <section className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Leagues</h2>
          {leaguesLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
              <p className="mt-4 text-gray-300 text-sm">Loading leagues...</p>
            </div>
          ) : leagues.length ? (
            <ul className="divide-y divide-gray-700">
              {leagues.map((l) => (
                <li
                  key={l.id}
                  className="py-2 flex justify-between text-gray-200 cursor-pointer hover:bg-gray-700 rounded transition"
                  onClick={() => fetchTable(l.leagueName)}
                >
                  <span className="font-medium">{l.leagueName}</span>
                  <span className="text-gray-400">ID: {l.id}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-4 text-sm">{leaguesMessage || "No leagues found."}</p>
          )}
        </section>

        {/* Leaderboard Table */}
        <section className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">
            {selectedLeague ? `Leaderboard: ${selectedLeague}` : "Leaderboard"}
          </h2>
          {tableLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
              <p className="mt-4 text-gray-300 text-sm">Loading leaderboard...</p>
            </div>
          ) : table.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-gray-200">
                <thead>
                  <tr>
                    <th className="p-2 border-b border-gray-700">Team</th>
                    <th className="p-2 border-b border-gray-700">MP</th>
                    <th className="p-2 border-b border-gray-700">W</th>
                    <th className="p-2 border-b border-gray-700">D</th>
                    <th className="p-2 border-b border-gray-700">L</th>
                    <th className="p-2 border-b border-gray-700">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-700 transition">
                      <td className="p-2 border-b border-gray-700">{row.teamName}</td>
                      <td className="p-2 border-b border-gray-700">{row.matchesPlayed}</td>
                      <td className="p-2 border-b border-gray-700">{row.won}</td>
                      <td className="p-2 border-b border-gray-700">{row.drawn}</td>
                      <td className="p-2 border-b border-gray-700">{row.lost}</td>
                      <td className="p-2 border-b border-gray-700">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4 text-sm">
              {selectedLeague ? tableMessage || "No leaderboard data." : "Select a league to view leaderboard."}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}