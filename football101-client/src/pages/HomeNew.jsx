// src/pages/Home.jsx
import { Link } from "react-router-dom";
import {
  IconHome,
  IconUsersGroup,
  IconTrophy,
  IconSoccerField,
} from "@tabler/icons-react";

const features = [
  {
    title: "Teams",
    path: "/teams",
    icon: <IconUsersGroup className="h-8 w-8 text-blue-400" />,
    color: "bg-gray-800",
  },
  {
    title: "Leagues",
    path: "/leagues",
    icon: <IconTrophy className="h-8 w-8 text-green-400" />,
    color: "bg-gray-800",
  },
  {
    title: "Match",
    path: "/match",
    icon: <IconSoccerField className="h-8 w-8 text-red-400" />,
    color: "bg-gray-800",
  },
];

export default function Home() {
  return (
    <div className="w-full px-6 md:px-12 py-10 bg-gray-900 min-h-screen text-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Football101 Dashboard</h1>
        <p className="text-lg text-gray-300">Navigate through your football app modules</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="group block"
          >
            <div className={`${feature.color} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center`}>
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}