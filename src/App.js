import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import { UserProvider, useUserContext } from './context/UserContext';
import AppRoutes from './AppRoutes';
import './App.css';

// Create a theme instance.
const theme = createTheme();

function AppContent() {
  const { setCurrentUser } = useUserContext();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [setCurrentUser]);

  return <AppRoutes />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
