import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Header from "./components/Header";
import NavbarWrapper from "./components/NavbarWrapper";
import Home from "./pages/Home";
// import Teams from "./pages/Teams";
// import Leagues from "./pages/Leagues";
import Leaderboard from "./pages/Leaderboard";
import Match from "./pages/Match";
import TeamsNew from "./pages/TeamsNew";
import LeaguesNew from "./pages/LeaguesNew";
import Footer from "./components/Footer";
import MatchNew from "./pages/MatchNew";
import TeamLineup from "./pages/TeamLineup"; // Importing the new TeamLineup component
import HomeNew from "./pages/HomeNew"; // Assuming HomeNew is the new version of Home

export default function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
      {/* <Navbar /> */}
      <NavbarWrapper />
      <Routes>

        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/teams" element={<Teams />} /> */}
        {/* <Route path="/leagues" element={<Leagues />} /> */}
        {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}

        <Route path="/" element={<HomeNew />} />
        <Route path="/teams" element={<TeamsNew />} />
        <Route path="/leagues" element={<LeaguesNew />} />
        <Route path="/match" element={<MatchNew />} />
        <Route path="/team/:teamName" element={<TeamLineup />} />

      </Routes>

      {/* <div className="h-[2000px] bg-slate-100"></div> */}
    </BrowserRouter>
    <Footer />
    </>
  );
}