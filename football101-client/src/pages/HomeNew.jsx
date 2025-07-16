"use client"

import { useRef } from "react"
import { Link } from "react-router-dom"
import { FaUsers, FaTrophy, FaBullseye, FaArrowRight, FaFutbol, FaListUl } from "react-icons/fa"

const features = [
  {
    title: "Teams",
    path: "/teams",
    icon: <FaUsers className="h-8 w-8" />,
    description: "Manage team rosters and player lineups",
    color: "from-blue-500 to-cyan-500",
    hoverColor: "hover:shadow-blue-500/20",
  },
  {
    title: "Leagues",
    path: "/leagues",
    icon: <FaTrophy className="h-8 w-8" />,
    description: "View league standings and statistics",
    color: "from-green-500 to-emerald-500",
    hoverColor: "hover:shadow-green-500/20",
  },
  {
    title: "Match",
    path: "/match",
    icon: <FaBullseye className="h-8 w-8" />,
    description: "Record match results and scores",
    color: "from-purple-500 to-pink-500",
    hoverColor: "hover:shadow-purple-500/20",
  },
  {
    title: "Lineup",
    path: "/team/Liverpool", // Default to Liverpool or choose a default team
    icon: <FaUsers className="h-8 w-8" />,
    description: "View and manage team lineups",
    color: "from-pink-500 to-blue-500",
    hoverColor: "hover:shadow-pink-500/20",
  },
]

export default function Home() {
  const aboutRef = useRef(null)
  const exploreRef = useRef(null)

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <FaTrophy className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 mb-6 leading-tight">
            Football101
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your comprehensive football management portal for leagues, teams, and match tracking
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => scrollTo(aboutRef)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              Learn More
              <FaArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollTo(exploreRef)}
              className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg bg-transparent"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section ref={aboutRef} className="py-24 px-6 md:px-12 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Football101</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                This a project made by Pranav Bansal, a Computer Science student at PEC Chandigarh, 
                The backend for this project is built using Spring Boot,
                and the frontend is developed using React.js. 
                The link to the source code is attached in the footer along with my LinkedIn profile.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Football101 is designed to help you manage leagues, teams, and matches effortlessly. Our comprehensive
                platform provides all the tools you need to track scores, manage team rosters, and stay updated with
                league standings.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Whether you're managing a local league or tracking professional competitions, Football101 streamlines
                your football management experience with an intuitive interface and powerful features.
              </p>
              <p className="text-white text-xl font-semibold leading-relaxed bg-blue-800/60 p-4 rounded-lg max-w-3xl mx-auto">
                Existing League Leaderboards : Premier league, Bundesliga, La Liga.
                <br />
                Existing Team Lineups : Top 5 PL finishers in 2024/2025 season.
                <br />
                [Manchester City, Arsenal, Liverpool, Manchester United, Newcastle United]
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 border border-slate-600 p-6 text-center rounded-xl">
                <FaUsers className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Team Management</h3>
                <p className="text-slate-400 text-sm">Organize and track team performance</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 p-6 text-center rounded-xl">
                <FaTrophy className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">League Tracking</h3>
                <p className="text-slate-400 text-sm">Monitor standings and statistics</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 p-6 text-center rounded-xl">
                <FaBullseye className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Match Recording</h3>
                <p className="text-slate-400 text-sm">Log results and scores easily</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 p-6 text-center rounded-xl">
                <FaFutbol className="h-8 w-8 text-red-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Real-time Updates</h3>
                <p className="text-slate-400 text-sm">Stay current with live data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Section */}
      <section ref={exploreRef} className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Features</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Navigate through your football app modules and discover powerful management tools
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link key={feature.path} to={feature.path} className="group block">
                <div
                  className={`bg-slate-800/50 border border-slate-600 hover:border-slate-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${feature.hoverColor} overflow-hidden rounded-xl`}
                >
                  <div className="p-8 text-center relative">
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-6">
                        {feature.description}
                      </p>

                      <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        <span className="font-semibold">Explore</span>
                        <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
