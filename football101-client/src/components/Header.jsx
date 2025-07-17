import { FaTrophy } from "react-icons/fa"

export default function Header() {
  return (
    <header className="w-full px-8 py-6 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-2xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Enhanced Logo */}
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-700 to-black border border-gray-600 flex items-center justify-center shadow-lg">
              <FaTrophy className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full blur opacity-30"></div>
          </div>

          {/* Enhanced Title */}
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-wide">
              Football 101
            </h1>
            <p className="text-sm text-gray-400 font-medium">League & Team Manager</p>
          </div>
        </div>

        {/* Optional status indicator */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">System Online</span>
        </div>
      </div>
    </header>
  )
}
