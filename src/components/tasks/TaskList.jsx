import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, deleteTask, toggleComplete, updatePriority } from '../../store/slices/taskSlice';
import { TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const renderWeatherInfo = (weather) => {
    if (!weather) return null;

    return (
      <div className="text-sm text-gray-500">
        <span>{Math.round(weather.temperature)}°C</span>
        <span className="mx-1">|</span>
        <span>{weather.description}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 bg-white rounded-lg shadow-sm border-l-4 ${task.completed ? 'border-green-500' : `border-${getPriorityColor(task.priority).split('-')[1]}`}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch(toggleComplete(task.id))}
                  className="text-gray-400 hover:text-green-500"
                >
                  <CheckCircleIcon className={`h-6 w-6 ${task.completed ? 'text-green-500' : ''}`} />
                </button>
                <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.text}
                </span>
              </div>
              {task.weather && renderWeatherInfo(task.weather)}
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={task.priority}
                onChange={(e) => dispatch(updatePriority({ id: task.id, priority: e.target.value }))}
                className={`text-sm border rounded px-2 py-1 ${getPriorityColor(task.priority)}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tasks yet. Add some tasks to get started!
        </div>
      )}
    </div>
  );
};

export default TaskList;