import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { selectAuth, logout } from './store/slices/authSlice';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import TodoApp from './components/TodoApp';
import './App.css'
import logoutIcon from './assets/logout-icon.svg';

function MainContent() {
  const { isAuthenticated, isGuestMode } = useSelector(selectAuth);
  const { darkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Successfully logged out!');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark:bg-background-dark' : 'bg-background-light'}`}>
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gradient-to-r from-gradient-1-start to-gradient-1-end text-white shadow-lg hover:opacity-90 transition-opacity"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        {(isAuthenticated || isGuestMode) && (
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:opacity-90 transition-opacity"
          >
            <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
          </button>
        )}
      </div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated || isGuestMode ? (
                <TodoApp />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainContent />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </ThemeProvider>
  );
}

export default App
