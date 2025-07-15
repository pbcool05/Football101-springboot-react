import React, { useState, useEffect } from "react";
import { getLeagues } from "../api/footballApi";

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setLoading(true);
    getLeagues()
      .then((data) => {
        setLeagues(data);
        if (!data.length) setMessage("No leagues found.");
      })
      .catch(() => setMessage("Failed to fetch leagues."))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="bg-gray-900 min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Leagues</h1>
        <section className="bg-gray-800 rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
              <p className="mt-4 text-gray-300 text-sm">Loading leagues...</p>
            </div>
          ) : leagues.length ? (
            <ul className="divide-y divide-gray-700">
              {leagues.map((l) => (
                <li key={l.id} className="py-2 flex justify-between text-gray-200">
                  <span className="font-medium">{l.leagueName}</span>
                  <span className="text-gray-400">ID: {l.id}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-4 text-sm">{message || "No leagues found."}</p>
          )}
        </section>
      </div>
    </div>
  );
}