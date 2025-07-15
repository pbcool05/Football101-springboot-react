import React, { useState, useEffect } from "react";
import { getTeams, addTeam, assignTeamToLeague } from "../api/footballApi";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamForm, setTeamForm] = useState({ teamName: "", league: "" });
  const [assignForm, setAssignForm] = useState({ teamName: "", leagueName: "" });
  const [activeTab, setActiveTab] = useState("view");      // still used for refresh logic
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState("");

  /* ─────────────────────────────────────────────────────────── */
  /*   Fetch teams whenever we "refresh" the view section        */
  /* ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    setLoading(true);
    getTeams()
      .then(setTeams)
      .catch(() => setMessage("Error fetching teams"))
      .finally(() => setLoading(false));
  }, [activeTab]);

  /* ─────────────────────────────────────────────────────────── */
  /*                    Form handlers                            */
  /* ─────────────────────────────────────────────────────────── */
  const handleAddTeam = (e) => {
    e.preventDefault();
    addTeam(teamForm)
      .then(() => {
        getTeams().then(setTeams);
        setTeamForm({ teamName: "", league: "" });
        setMessage("Team added successfully!");
      })
      .catch(() => setMessage("Failed to add team"));
  };

  const handleAssign = (e) => {
    e.preventDefault();
    assignTeamToLeague(assignForm)
      .then(() => {
        setAssignForm({ teamName: "", leagueName: "" });
        setMessage("Team assigned successfully!");
      })
      .catch(() => setMessage("Failed to assign team"));
  };

  /* ─────────────────────────────────────────────────────────── */
  /*                         JSX                                */
  /* ─────────────────────────────────────────────────────────── */
  return (
    <div className="bg-gray-900 min-h-screen pt-40 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Teams Dashboard
        </h1>

        {message && (
            <div className="mb-6 p-4 bg-blue-800 border border-blue-600 rounded-lg text-center">
            <p className="text-blue-300">{message}</p>
            </div>
        )}

        <div className="space-y-12">
            {/* VIEW TEAMS */}
            <section className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
                 Current Teams
                </h2>
                <button
                onClick={() => {
                    setActiveTab("view");
                    setMessage("");
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                >
                Refresh
                </button>
            </div>

            {loading ? (
                <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                <p className="mt-4 text-gray-300 text-sm">Loading teams...</p>
                </div>
            ) : teams.length ? (
                <ul className="divide-y divide-gray-700">
                {teams.map((t) => (
                    <li
                    key={t.id}
                    className="py-2 flex justify-between text-gray-200"
                    >
                    <span className="font-medium">{t.teamName}</span>
                    <span className="text-gray-400">{t.league}</span>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 py-4 text-sm">
                No teams found
                </p>
            )}
            </section>

            {/* ADD TEAM */}
            <section className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
                ➕ Add a New Team
            </h2>
            <form onSubmit={handleAddTeam} className="space-y-4">
                <input
                className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
                placeholder="Team Name"
                value={teamForm.teamName}
                onChange={(e) =>
                    setTeamForm((f) => ({ ...f, teamName: e.target.value }))
                }
                required
                />
                <input
                className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
                placeholder="League Name"
                value={teamForm.league}
                onChange={(e) =>
                    setTeamForm((f) => ({ ...f, league: e.target.value }))
                }
                required
                />
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                Add Team
                </button>
            </form>
            </section>

            {/* ASSIGN TEAM */}
            <section className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-green-400 flex items-center gap-2">
                 Assign Team to League's Leaderboard
            </h2>
            <form onSubmit={handleAssign} className="space-y-4">
                <input
                className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
                placeholder="Team Name"
                value={assignForm.teamName}
                onChange={(e) =>
                    setAssignForm((f) => ({ ...f, teamName: e.target.value }))
                }
                required
                />
                <input
                className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
                placeholder="League Name"
                value={assignForm.leagueName}
                onChange={(e) =>
                    setAssignForm((f) => ({ ...f, leagueName: e.target.value }))
                }
                required
                />
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                Assign
                </button>
            </form>
            </section>
        </div>
        </div>
    </div>
    );
}