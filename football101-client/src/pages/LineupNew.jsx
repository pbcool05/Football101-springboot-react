import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayersFromTeam } from "../api/footballApi";

export default function TeamLineup() {
  const { teamName } = useParams();
  const teams = ["Liverpool", "Chelsea", "Arsenal", "Manchester City", "Newcastle United"];
  const [selectedTeam, setSelectedTeam] = useState(teams.includes(teamName) ? teamName : "Liverpool");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getPlayersFromTeam(selectedTeam)
      .then((data) => {
        if (!data || data.length === 0) {
          setMessage("No players found for this team.");
        } else {
          setPlayers(data);
        }
      })
      .catch(() => setMessage("Failed to fetch players."))
      .finally(() => setLoading(false));
  }, [selectedTeam]);

  return (
    <div className="bg-gray-900 min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-8 items-start">
          <div className="w-1/4 flex flex-col justify-center items-start -ml-6">
            <label htmlFor="team-select" className="text-gray-300 block mb-2 font-semibold text-lg">
              Select Team:
            </label>
            <select
              id="team-select"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="bg-gray-800 text-white border border-blue-500 rounded-md px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className="w-3/4">
            <h1 className="text-3xl font-bold text-blue-400 mb-4">
              {selectedTeam} Lineup
            </h1>
            {loading ? (
              <p className="text-gray-300 text-center">Loading players...</p>
            ) : message ? (
              <p className="text-gray-400 text-center">{message}</p>
            ) : (
              <table className="min-w-full text-gray-200 border-collapse">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Age</th>
                    <th className="p-3 text-left">Position</th>
                    <th className="p-3 text-left">Matches</th>
                    <th className="p-3 text-left">Goals</th>
                    <th className="p-3 text-left">Assists</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.age}</td>
                      <td className="p-3">{p.positions}</td>
                      <td className="p-3">{p.matchesPlayed}</td>
                      <td className="p-3">{p.goals}</td>
                      <td className="p-3">{p.assists}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}