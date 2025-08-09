import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from './pages/MovieDetailPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import WatchlistsPage from './pages/WatchlistsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AuthContextProvider, AuthContext } from './context/AuthContext';

// Main App component
function AppContent() {
  const { user, logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  // Helper for protected routes
  function RequireAuth({ children }) {
    return user ? children : <Navigate to="/login" replace />;
  }

  // For ResetPassword route
  function ResetPasswordWrapper() {
    const { token } = useParams();
    return <ResetPasswordPage token={token} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar navigate={navigate} />
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4">
        <Routes>
          <Route path="/" element={<HomePage navigate={navigate} />} />
          <Route path="/login" element={<LoginPage navigate={navigate} />} />
          <Route path="/register" element={<RegisterPage navigate={navigate} />} />
          <Route path="/profile" element={<RequireAuth><ProfilePage navigate={navigate} /></RequireAuth>} />
          <Route path="/favorites" element={<RequireAuth><FavoritesPage navigate={navigate} /></RequireAuth>} />
          <Route path="/watchlists" element={<RequireAuth><WatchlistsPage navigate={navigate} /></RequireAuth>} />
          <Route path="/movie/:movieId" element={<MovieDetailPage navigate={navigate} />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage navigate={navigate} />} />
          <Route path="/resetPassword/:token" element={<ResetPasswordWrapper />} />
          <Route path="*" element={<HomePage navigate={navigate} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App; 