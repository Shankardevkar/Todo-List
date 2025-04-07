import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  weatherData: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        priority: action.payload.priority || 'medium',
        completed: false,
        weather: action.payload.weather || null,
        createdAt: new Date().toISOString(),
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updatePriority: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleComplete,
  updatePriority,
  setWeatherData,
  setLoading,
  setError,
} = taskSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectWeatherData = (state) => state.tasks.weatherData;
export const selectLoading = (state) => state.tasks.loading;
export const selectError = (state) => state.tasks.error;

export default taskSlice.reducer;