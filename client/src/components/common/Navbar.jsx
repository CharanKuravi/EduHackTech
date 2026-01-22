// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, MonitorPlay, Trophy } from 'lucide-react'; // Icons
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { mode, toggleMode, primary, bgPrimary, bgLight } = useTheme();

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${bgPrimary} flex items-center justify-center text-white font-bold`}>
              E
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-850">
              EduHack<span className={primary}>Tech</span>
            </span>
          </Link>

          {/* 2. Search Bar (Hidden on mobile) */}
          <div className="hidden md:flex flex-1 mx-12">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all"
                placeholder={mode === 'learning' ? "Search for courses..." : "Search for hackathons..."}
              />
            </div>
          </div>

          {/* 3. Right Side Actions */}
          <div className="flex items-center gap-4">
            
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>

            {/* THE CONTEXT TOGGLE */}
            <button 
              onClick={toggleMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${bgLight} border-gray-200 hover:shadow-md`}
            >
              {mode === 'learning' ? (
                <>
                  <MonitorPlay className={`h-4 w-4 ${primary}`} />
                  <span className={`text-sm font-medium ${primary}`}>Learning Mode</span>
                </>
              ) : (
                <>
                  <Trophy className={`h-4 w-4 ${primary}`} />
                  <span className={`text-sm font-medium ${primary}`}>Compete Mode</span>
                </>
              )}
            </button>

            <Link 
              to="/login"
              className={`px-6 py-2 rounded-full text-white text-sm font-medium transition-colors ${bgPrimary} hover:opacity-90`}
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;