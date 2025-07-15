const API = "http://localhost:8080";

export const getTeams = () => fetch(`${API}/team/allTeams`).then(res => res.json());
export const addTeam = (team) =>
  fetch(`${API}/team/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(team),
  });

export const getLeagues = () => fetch(`${API}/league/allLeagues`).then(res => res.json());

export const assignTeamToLeague = (data) =>
  fetch(`${API}/leaderboard/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const getLeaderboard = (leagueName) =>
  fetch(`${API}/leaderboard/getTable?leagueName=${leagueName}`).then(res => res.json());

export const addMatch = (match) =>
  fetch(`${API}/match/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(match),
  });