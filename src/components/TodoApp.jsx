import React, { useState } from "react";
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setGuestMode, setPendingGuestTask } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

// Define keyframe animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out forwards;
  }

  .hover\\:scale-102:hover {
    transform: scale(1.02);
  }
`;


function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("High");
  const [filter, setFilter] = useState("all"); // "all", "high", "completed"
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isGuestMode } = useSelector(selectAuth);

  // Function to add a new task
  const addTask = () => {
    const trimmedInput = taskInput.trim();
    if (trimmedInput === "") return;

    // Check for duplicate tasks
    if (tasks.some(task => task.task.toLowerCase() === trimmedInput.toLowerCase())) {
      alert("This task already exists!");
      return;
    }

    const newTask = {
      task: trimmedInput,
      isCompleted: false,
      priority: priority,
      createdAt: new Date().toISOString()
    };

    if (!isAuthenticated) {
      if (!isGuestMode) {
        // First task as guest
        dispatch(setGuestMode(true));
        setTasks([...tasks, newTask]);
        setTaskInput("");
      } else {
        // Guest trying to add second task
        dispatch(setPendingGuestTask(newTask));
        navigate("/login");
        return;
      }
    } else {
      setTasks([...tasks, newTask]);
      setTaskInput(""); // Clear input
    }
  };

  // Function to mark task as completed
  const markCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: true } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "high") return task.priority === "High";
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  return (
    <div className={`flex flex-col items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-900'} p-5`}>
      <style>{styles}</style>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-5 rounded-lg shadow-lg w-full max-w-lg transition-all duration-300 ease-in-out transform hover:shadow-xl`}>
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        {/* Input Fields */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a task"
            className={`flex-1 p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} border-none`}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={addTask}
            className="bg-green-500 px-3 py-2 rounded text-white hover:bg-green-600 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setFilter("all")}
            className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-600 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter("high")}
            className="bg-yellow-500 px-3 py-2 rounded text-white hover:bg-yellow-600 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            High Priority
          </button>
          <button
            onClick={() => setFilter("completed")}
            className="bg-purple-500 px-3 py-2 rounded text-white hover:bg-purple-600 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded ${task.isCompleted ? "line-through text-gray-400" : ""} transform transition-all duration-300 ease-in-out hover:scale-102 opacity-0 animate-fadeIn`}
              >
                <p>
                  {task.task}{" "}
                  <span
                    className={`text-sm ${
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    ({task.priority})
                  </span>
                </p>
                {!task.isCompleted && (
                  <button
                    onClick={() => markCompleted(index)}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                  >
                    Complete
                  </button>
                )}
              </li>
            ))
          ) : (
            <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No tasks found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;