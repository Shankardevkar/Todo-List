import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuth } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const styles = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-slideIn {
    animation: slideIn 0.5s ease-out forwards;
  }

  .gradient-border {
    position: relative;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 0.5rem;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .gradient-border:focus-within::before {
    opacity: 1;
  }
`;

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const { error } = useSelector(selectAuth);
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication - in a real app, this would call an API
    if (credentials.username && credentials.password) {
      dispatch(login({ username: credentials.username }));
      toast.success('Welcome back! Successfully logged in!');
    } else {
      toast.error('Please enter both username and password');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8`}>
      <style>{styles}</style>
      <div className={`w-full max-w-md p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl transform transition-all duration-300 hover:shadow-3xl animate-slideIn`}>
        <div className="text-center mb-8 space-y-2">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
            Welcome to Todo List
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your personal task management companion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Username
            </label>
            <div className="gradient-border">
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`w-full p-3 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none transition-colors duration-200`}
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="gradient-border">
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full p-3 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none transition-colors duration-200`}
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center animate-slideIn">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;