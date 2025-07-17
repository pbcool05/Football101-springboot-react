// src/components/Footer.jsx

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { faHome } from '@fortawesome/free-solid-svg-icons';


// export default function Footer() {
//   return (
//     <footer className="w-full text-center text-gray-400 py-6 bg-gray-900">
//       <hr className="border-gray-700 mb-4" />
//       <div>
//         &copy; {new Date().getFullYear()} Football101 &mdash; All rights reserved.
//       </div>
//       <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-300">
//         <a
//           href="/"
//           className="flex items-center space-x-1 hover:text-white"
//         >
//           <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
//           <span>Home</span>
//         </a>
//         <a
//           href="https://www.linkedin.com/in/pranav-bansal-12138a2b5"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center space-x-1 hover:text-white"
//         >
//           <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
//           <span>LinkedIn</span>
//         </a>

//         <a
//           href="https://github.com/pbcool05/Football101-springboot-react"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center space-x-1 hover:text-white"
//         >
//           <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
//           <span>GitHub</span>
//         </a>
//       </div>
//     </footer>
//   );
// }
import { FaLinkedin, FaGithub, FaHome, FaHeart } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-black border-t border-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <h3 className="text-xl font-bold text-white">Football101</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your comprehensive football management portal for leagues, teams, and match tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
              >
                <FaHome className="h-4 w-4" />
                Home
              </a>
              <a
                href="/teams"
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
              >
                Teams
              </a>
              <a
                href="/leagues"
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
              >
                Leagues
              </a>
              <a
                href="/match"
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
              >
                Matches
              </a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/pranav-bansal-12138a2b5"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600 bg-transparent px-3 py-2 rounded text-sm transition-colors flex items-center gap-2"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/pbcool05/Football101-springboot-react"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600 bg-transparent px-3 py-2 rounded text-sm transition-colors flex items-center gap-2"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-1">
              © {currentYear} Football101. Made with <FaHeart className="h-4 w-4 text-red-500" /> by Pranav Bansal
            </p>
            <p className="text-gray-500 text-xs">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
