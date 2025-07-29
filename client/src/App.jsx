import React, { useState, useContext, useEffect } from 'react';
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
function App({ initialPage = 'home', initialResetToken = null }) {
  // State to manage current page for simple routing
  const [page, setPage] = useState(initialPage);
  // State to hold selected movie ID for detail view
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  // Add state for reset password token
  const [resetToken, setResetToken] = useState(initialResetToken);

  // On mount, set page/resetToken if provided by props (for deep link)
  useEffect(() => {
    if (initialPage) setPage(initialPage);
    if (initialResetToken) setResetToken(initialResetToken);
  }, [initialPage, initialResetToken]);

  // Access authentication state from context
  const { user, logout } = useContext(AuthContext) || {};

  // Modified navigate to handle reset password links and logout
  const navigate = (to, param = null) => {
    if (to === 'resetPassword') {
      setResetToken(param); // param is the token
      setPage('resetPassword');
    } else if (to === 'logout') {
      // Handle logout
      logout();
      setPage('login');
      setSelectedMovieId(null);
      setResetToken(null);
    } else {
      setPage(to);
      setSelectedMovieId(param);
    }
  };

  // Render the correct page based on current state
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'profile':
        return user ? <ProfilePage navigate={navigate} /> : <LoginPage navigate={navigate} />;
      case 'favorites':
        return user ? <FavoritesPage navigate={navigate} /> : <LoginPage navigate={navigate} />;
      case 'watchlists':
        return user ? <WatchlistsPage navigate={navigate} /> : <LoginPage navigate={navigate} />;
      case 'movieDetail':
        return <MovieDetailPage movieId={selectedMovieId} navigate={navigate} />;
      case 'forgotPassword':
        return <ForgotPasswordPage navigate={navigate} />;
      case 'resetPassword':
        return <ResetPasswordPage token={resetToken} navigate={navigate} />;
      case 'logout':
        // This case is handled in navigate, so just show LoginPage
        return <LoginPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    // Provide authentication context to the entire app
    <AuthContextProvider>
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
        {/* Navbar is always visible and receives navigation props */}
        <Navbar navigate={navigate} user={user} />
        {/* Main content area */}
        <main className="flex-1 container mx-auto px-2 sm:px-4 py-4">
          {renderPage()}
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default App; 