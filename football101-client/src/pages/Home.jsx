// import { Link } from "react-router-dom";
// export default function Home() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Football101 Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Link to="/teams" className="bg-white shadow p-6 rounded hover:bg-blue-50">Teams</Link>
//         <Link to="/leagues" className="bg-white shadow p-6 rounded hover:bg-blue-50">Leagues</Link>
//         <Link to="/leaderboard" className="bg-white shadow p-6 rounded hover:bg-blue-50">Leaderboard</Link>
//         <Link to="/match" className="bg-white shadow p-6 rounded hover:bg-blue-50">Match</Link>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "Teams",
      path: "/teams",
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Leagues",
      path: "/leagues",
      icon: "🏆",
      color: "bg-green-500",
    },
    //LeaderBoard merged with league in LeaguesNew.jsx and leagues now points to LeaguesNew.jsx
    // {
    //   title: "Leaderboard",
    //   path: "/leaderboard",
    //   icon: "📊",
    //   color: "bg-purple-500",
    // },
    {
      title: "Match",
      path: "/match",
      icon: "⚽",
      color: "bg-red-500",
    },
  ];

  return (
    // <div className="max-w-6xl mx-auto px-4 py-10">
    // <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-900 min-h-screen text-gray-100">
    <>
    <div className="h-32" /> 
    <div className="w-full px-6 md:px-12 py-10 pt-56 bg-gray-900 min-h-screen text-gray-100">
      <div className="text-center mb-12">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-4">Football101 Dashboard</h1>
        <p className="text-lg text-gray-600">Navigate through your football app modules</p> */}
        <h1 className="text-4xl font-bold text-white mb-4">Football101 Dashboard</h1>
        <p className="text-lg text-gray-300">Navigate through your football app modules</p>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="group block"
          >
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 text-center h-full">
              <div
                className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
              >
                <span className="text-2xl text-white">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
          </Link>
        ))}
      </div> */}

      <div className="flex flex-col items-center gap-8">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="group block w-full max-w-2xl"
          >
            {/* <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-10 text-center"> */}
            <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-10 text-center">
              <div
                className={`${feature.color} w-20 h-20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
              >
                <span className="text-3xl text-white">{feature.icon}</span>
              </div>
              {/* <h3 className="text-2xl font-semibold text-gray-800">{feature.title}</h3> */}
              <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
            </div>
          </Link>
      ))}
      </div>
    </div>
    </>
  );
}