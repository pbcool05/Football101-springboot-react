import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavbarWrapper from "./components/NavbarWrapper";
import TeamsNew from "./pages/TeamsNew";
import LeaguesNew from "./pages/LeaguesNew";
import Footer from "./components/Footer";
import MatchNew from "./pages/MatchNew";
import TeamLineup from "./pages/TeamLineup"; 
import HomeNew from "./pages/HomeNew"; 

export default function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
      <NavbarWrapper />
      <Routes>

        <Route path="/" element={<HomeNew />} />
        <Route path="/teams" element={<TeamsNew />} />
        <Route path="/leagues" element={<LeaguesNew />} />
        <Route path="/match" element={<MatchNew />} />
        <Route path="/team/:teamName" element={<TeamLineup />} />

      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}