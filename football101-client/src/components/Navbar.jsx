import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex gap-6">
      <Link to="/" className="font-bold">Football101 Dashboard</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/leagues">Leagues</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/match">Match</Link>
    </nav>
  );
}