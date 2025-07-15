import React, { useState } from "react";
import { addMatch } from "../api/footballApi";

export default function Match() {
  const [form, setForm] = useState({
    leagueName: "",
    homeTeamName: "",
    awayTeamName: "",
    score: "",
    winner: "",
    matchDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    addMatch(form)
      .then(() => {
        setForm({
          leagueName: "",
          homeTeamName: "",
          awayTeamName: "",
          score: "",
          winner: "",
          matchDate: "",
        });
        setMessage("Match added successfully!");
      })
      .catch(() => setMessage("Failed to add match."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Add Match</h1>
        <section className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
          {message && (
            <div className="mb-4 p-3 bg-blue-800 border border-blue-600 rounded-lg text-center">
              <p className="text-blue-300">{message}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
              placeholder="League Name"
              value={form.leagueName}
              onChange={e => setForm(f => ({ ...f, leagueName: e.target.value }))}
              required
            />
            <input
              className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
              placeholder="Home Team Name"
              value={form.homeTeamName}
              onChange={e => setForm(f => ({ ...f, homeTeamName: e.target.value }))}
              required
            />
            <input
              className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
              placeholder="Away Team Name"
              value={form.awayTeamName}
              onChange={e => setForm(f => ({ ...f, awayTeamName: e.target.value }))}
              required
            />
            <input
              className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
              placeholder="Score (e.g. 2 - 1)"
              value={form.score}
              onChange={e => setForm(f => ({ ...f, score: e.target.value }))}
              required
            />
            <input
              className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
              placeholder="Winner"
              value={form.winner}
              onChange={e => setForm(f => ({ ...f, winner: e.target.value }))}
              required
            />
            <input
              className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded w-full placeholder-gray-400"
              type="date"
              value={form.matchDate}
              onChange={e => setForm(f => ({ ...f, matchDate: e.target.value }))}
              required
            />
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" type="submit">
              {loading ? "Adding..." : "Add Match"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}