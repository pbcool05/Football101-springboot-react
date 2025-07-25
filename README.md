#Before you read

-This project gives a great insight on how to structure your backend code in java spring boot and to understand the best practices whilst structuring your code in different layers, Hope you like it and learn from it💞
-⭐️ Star this repo if you like it! 

# Football101

A full-stack football management portal for leagues, teams, matches, and player lineups.

---

## Project Overview
Football101 is a web application that allows users to manage football leagues, teams, matches, and player lineups. Built with a Spring Boot backend and a modern React frontend, it provides an intuitive interface for tracking league standings, team rosters, and match results.

---

##  Features
- **League Management:** Create and view leagues, see league standings (leaderboards).
- **Team Management:** Add teams, assign them to leagues, and view team details.
- **Player Lineups:** View player lineups for top teams in a league.
- **Match Recording:** Record match results and automatically update leaderboards.
- **Modern UI:** Responsive, dark-themed React interface.

---

## 🛠️ Tech Stack
- **Backend:** Java, Spring Boot, JPA/Hibernate
- **Frontend:** React.js, Vite, Tailwind CSS
- **Database:** (I used PostgreSQL, but you can use any database)

---

## 📁 Project Structure

```
Football101/
  football101/                # Spring Boot backend
    src/main/java/com/pbcool/football101/
      controller/             # REST controllers
      dao/                    # JPA repositories
      dto/                    # Data Transfer Objects
      models/                 # JPA entities
      requests/               # Request payloads
      service/                # Business logic
    src/main/resources/       # Application properties, static files
  football101-client/         # React frontend
    src/
      api/                    # API calls to backend
      components/             # Shared UI components
      pages/                  # Main app pages (Leagues, Teams, Match, Lineup)
      ui/                     # UI helpers
```

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Football101.git
cd Football101
```

### 2. Backend Setup (Spring Boot)
- Open `football101/pom.xml` in your IDE.
- Configure your database in `football101/src/main/resources/application.properties`
- The backend will start on `http://localhost:8080`.

### 3. Frontend Setup (React)
- You will need to setup a few packages for the custom components used, so do look up the npm commands for those.
- Open a new terminal:
  ```bash
  cd football101-client
  npm install
  npm run dev
  ```
- The frontend will start on `http://localhost:5173`.

---

## 🔗 API Overview

- **Leagues:**
  - `GET /league/allLeagues` — List all leagues
- **Teams:**
  - `GET /team/allTeams` — List all teams
  - `POST /team/add` — Add a new team
- **Leaderboard:**
  - `GET /leaderboard/getTable?leagueName=...` — Get leaderboard for a league
  - `POST /leaderboard/assign` — Assign team to league
- **Players:**
  - `GET /players/team?team=...` — Get players for a team
- **Matches:**
  - `POST /match/add` — Add a match and update leaderboard

---

## 🖥️ Usage
- Visit the homepage to explore features.
- Use the Leagues page to view standings and click teams to see their lineups.
- Add teams and assign them to leagues from the Teams page.
- Record match results from the Match page.

---

## 🙋‍♂️ Author
- Pranav Bansal ([LinkedIn](www.linkedin.com/in/pranav-bansal-12138a2b5))
