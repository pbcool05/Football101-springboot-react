import React, { useState } from "react";
import { getLeaderboard } from "../api/footballApi";

export default function Leaderboard() {
  const [leagueName, setLeagueName] = useState("");
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTable = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    getLeaderboard(leagueName)
      .then((data) => {
        setTable(data);
        if (!data.length) setMessage("No leaderboard data found.");
      })
      .catch(() => setMessage("Failed to fetch leaderboard."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Leaderboard</h1>
        <section className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 mb-8">
          <form onSubmit={fetchTable} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full sm:w-auto placeholder-gray-400"
              placeholder="League Name"
              value={leagueName}
              onChange={e => setLeagueName(e.target.value)}
              required
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition w-full sm:w-auto" type="submit">
              {loading ? "Loading..." : "Show Table"}
            </button>
          </form>
          {message && <div className="text-blue-300 text-center mt-2">{message}</div>}
        </section>
        {table.length > 0 && (
          <section className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
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
          </section>
        )}
      </div>
    </div>
  );
}