import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import NavbarWrapper from "./components/NavbarWrapper";
import Home from "./pages/Home";
// import Teams from "./pages/Teams";
// import Leagues from "./pages/Leagues";
import Leaderboard from "./pages/Leaderboard";
import Match from "./pages/Match";
import TeamsNew from "./pages/TeamsNew";
import LeaguesNew from "./pages/LeaguesNew";
import Footer from "./components/Footer";
import HomeNew from "./pages/HomeNew"; // Assuming HomeNew is the new version of Home

export default function App() {
  return (
    <>
    <BrowserRouter>
      {/* <Navbar /> */}
      <NavbarWrapper />
      <Routes>
        {/* <Route path="/leagues" element={<Leagues />} /> */}
        {/* <Route path="/teams" element={<Teams />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<HomeNew />} />
        <Route path="/teams" element={<TeamsNew />} />
        <Route path="/leagues" element={<LeaguesNew />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/match" element={<Match />} />
      </Routes>

      {/* <div className="h-[2000px] bg-slate-100"></div> */}
    </BrowserRouter>
    <Footer />
    </>
  );
}