import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

// Custom wrapper to handle /reset-password/:token deep links
function AppWithResetPassword() {
  const [initialPage, setInitialPage] = React.useState('home');
  const [resetToken, setResetToken] = React.useState(null);

  React.useEffect(() => {
    const match = window.location.pathname.match(/^\/reset-password\/(.+)$/);
    if (match) {
      setInitialPage('resetPassword');
      setResetToken(match[1]);
    }
  }, []);

  // Pass initialPage and resetToken as props to App
  return <App initialPage={initialPage} initialResetToken={resetToken} />;
}

root.render(
  <React.StrictMode>
    <AppWithResetPassword />
  </React.StrictMode>
); 