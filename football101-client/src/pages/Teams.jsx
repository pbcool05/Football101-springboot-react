import React, { useState, useEffect } from "react";
import { getTeams, addTeam, assignTeamToLeague } from "../api/footballApi";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamForm, setTeamForm] = useState({ teamName: "", league: "" });
  const [assignForm, setAssignForm] = useState({ teamName: "", leagueName: "" });
  const [activeTab, setActiveTab] = useState("view");     // "view" | "add" | "assign"
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState("");

  useEffect(() => {
    if (activeTab === "view") {
      setLoading(true);
      getTeams()
        .then(setTeams)
        .catch(() => setMessage("Error fetching teams"))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const handleAddTeam = (e) => {
  e.preventDefault();
  addTeam(teamForm).then(() => {
    getTeams().then(setTeams);
    setTeamForm({ teamName: "", league: "" });
    setMessage("Team added successfully!");    // <-- Add this line
  }).catch(() => {
    setMessage("Failed to add team");
  });
};

const handleAssign = (e) => {
  e.preventDefault();
  assignTeamToLeague(assignForm).then(() => {
    setAssignForm({ teamName: "", leagueName: "" });
    setMessage("Team assigned successfully!");  // <-- Add this line
  }).catch(() => {
    setMessage("Failed to assign team");
  });
};

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Teams Management</h1>

      {/* --- Tab Navigation --- */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: "view",   label: "View All Teams", icon: "👁️" },
          { id: "add",    label: "Add Team",       icon: "➕" },
          { id: "assign", label: "Assign Team",    icon: "🔗" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setMessage(""); }}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors duration-200 ${activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* --- Message Banner --- */}
      {message && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">{message}</p>
        </div>
      )}

      {/* --- VIEW TAB --- */}
      {activeTab === "view" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">All Teams</h2>
            <button
              onClick={() => setActiveTab("view")}   /* triggers useEffect to refetch */
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading teams...</p>
            </div>
          ) : teams.length ? (
            <ul className="divide-y divide-gray-200">
              {teams.map((t) => (
                <li key={t.id} className="py-3 flex justify-between">
                  <span className="font-medium text-gray-900">{t.teamName}</span>
                  <span className="text-gray-500">{t.league}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-8">No teams found</p>
          )}
        </div>
      )}

      {/* --- ADD TAB --- */}
      {activeTab === "add" && (
        <form onSubmit={handleAddTeam} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Team</h2>
          <input
            className="border p-3 rounded w-full"
            placeholder="Team Name"
            value={teamForm.teamName}
            onChange={(e) => setTeamForm((f) => ({ ...f, teamName: e.target.value }))}
            required
          />
          <input
            className="border p-3 rounded w-full"
            placeholder="League Name"
            value={teamForm.league}
            onChange={(e) => setTeamForm((f) => ({ ...f, league: e.target.value }))}
            required
          />
          <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add Team</button>
        </form>
      )}

      {/* --- ASSIGN TAB --- */}
      {activeTab === "assign" && (
        <form onSubmit={handleAssign} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Assign Team to League</h2>
          <input
            className="border p-3 rounded w-full"
            placeholder="Team Name"
            value={assignForm.teamName}
            onChange={(e) => setAssignForm((f) => ({ ...f, teamName: e.target.value }))}
            required
          />
          <input
            className="border p-3 rounded w-full"
            placeholder="League Name"
            value={assignForm.leagueName}
            onChange={(e) => setAssignForm((f) => ({ ...f, leagueName: e.target.value }))}
            required
          />
          <button className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Assign</button>
        </form>
      )}
    </div>
  );
}