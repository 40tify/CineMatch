import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, User, Star, List, LogIn, LogOut, Home } from 'lucide-react';

// Navbar component for navigation
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-900 shadow flex items-center justify-between px-4 py-2">
      {/* Logo and Home link */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/') }>
        <Film className="w-6 h-6 text-yellow-400" />
        <span className="font-bold text-xl text-yellow-400">CineMatch</span>
      </div>
      {/* Navigation links */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 hover:text-yellow-400" onClick={() => navigate('/') }>
          <Home className="w-5 h-5" /> Home
        </button>
        {user && (
          <>
            <button className="flex items-center gap-1 hover:text-yellow-400" onClick={() => navigate('/favorites')}>
              <Star className="w-5 h-5" /> Favorites
            </button>
            <button className="flex items-center gap-1 hover:text-yellow-400" onClick={() => navigate('/watchlists')}>
              <List className="w-5 h-5" /> Watchlists
            </button>
            <button className="flex items-center gap-1 hover:text-yellow-400" onClick={() => navigate('/profile')}>
              <User className="w-5 h-5" /> Profile
            </button>
            {/* Show username */}
            <span className="text-yellow-400 font-semibold ml-2">Hi, {user.username}!</span>
            {/* Logout button */}
            <button className="flex items-center gap-1 hover:text-red-400" onClick={() => { logout(); navigate('/login'); }}>
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <button className="flex items-center gap-1 hover:text-yellow-400" onClick={() => navigate('/login')}>
              <LogIn className="w-5 h-5" /> Login
            </button>
            <button className="flex items-center gap-1 hover:text-yellow-400" onClick={() => navigate('/register')}>
              <User className="w-5 h-5" /> Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;