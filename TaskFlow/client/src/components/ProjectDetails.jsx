import { ArrowLeft, Plus, Filter, SortAsc } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TaskModal } from './TaskModal';
import { Badge } from './ui/badge';
import { getProject } from '../../services/projectsApi';
import { getTasksByProject, updateTask, deleteTask } from '../../services/tasksApi';

export function ProjectDetails({ projectId, onBack }) {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('due_date');
  const [priorityFilter, setPriorityFilter] = useState({
    high: true,
    medium: true,
    low: true
  });

  useEffect(() => {
    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const [projectData, tasksData] = await Promise.all([
        getProject(projectId),
        getTasksByProject(projectId)
      ]);
      setProject(projectData);
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      setError('Failed to load project details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    fetchProjectData();
    setIsModalOpen(false);
  };

  const handleTaskToggle = async (taskId, currentStatus) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      // Toggle completed status
      const newCompleted = !currentStatus;
      const newStatus = newCompleted ? 'done' : 'todo';

      await updateTask(taskId, {
        ...task,
        completed: newCompleted,
        status: newStatus
      });

      // Refresh tasks
      fetchProjectData();
    } catch (err) {
      console.error('Failed to update task:', err);
      alert('Failed to update task status');
    }
  };

  const handleTaskDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(taskId);
      fetchProjectData();
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Failed to delete task');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-gray-700 text-white border-gray-800';
      case 'medium': return 'bg-gray-400 text-gray-900 border-gray-500';
      default: return 'bg-gray-200 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handlePriorityFilterChange = (priority) => {
    setPriorityFilter(prev => ({
      ...prev,
      [priority]: !prev[priority]
    }));
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => priorityFilter[task.priority]);
  };

  const getSortedTasks = (tasksList) => {
    const sorted = [...tasksList];
    switch (sortBy) {
      case 'due_date':
        return sorted.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      case 'priority':
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'status':
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return sorted;
    }
  };

  const filteredTasks = getSortedTasks(getFilteredTasks());

  const columns = [
    { id: 'todo', title: 'To Do', tasks: filteredTasks.filter(t => t.status === 'todo') },
    { id: 'in-progress', title: 'In Progress', tasks: filteredTasks.filter(t => t.status === 'in-progress') },
    { id: 'done', title: 'Done', tasks: filteredTasks.filter(t => t.status === 'done') },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={onBack}
          className="px-4 py-2 border-2 border-gray-600 hover:bg-gray-100"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Filters */}
      <div className="w-64 border-r-2 border-gray-400 bg-gray-50 p-6 relative">
        <div className="absolute top-0 right-0 text-[10px] text-gray-400 italic px-2 py-1">
          Filter Panel
        </div>
        
        <h3 className="mb-6">Filters & Sort</h3>

        <div className="space-y-6">
          {/* Sort Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <SortAsc size={16} />
              <span>Sort By</span>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  name="sort" 
                  className="w-4 h-4"
                  checked={sortBy === 'due_date'}
                  onChange={() => setSortBy('due_date')}
                />
                Due Date
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  name="sort" 
                  className="w-4 h-4"
                  checked={sortBy === 'priority'}
                  onChange={() => setSortBy('priority')}
                />
                Priority
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  name="sort" 
                  className="w-4 h-4"
                  checked={sortBy === 'status'}
                  onChange={() => setSortBy('status')}
                />
                Status
              </label>
            </div>
          </div>

          {/* Filter Section */}
          <div className="pt-4 border-t-2 border-gray-300">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Filter size={16} />
              <span>Filter By Priority</span>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4"
                  checked={priorityFilter.high}
                  onChange={() => handlePriorityFilterChange('high')}
                />
                High
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4"
                  checked={priorityFilter.medium}
                  onChange={() => handlePriorityFilterChange('medium')}
                />
                Medium
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4"
                  checked={priorityFilter.low}
                  onChange={() => handlePriorityFilterChange('low')}
                />
                Low
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Project Header */}
        <div className="border-b-2 border-gray-400 bg-white px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 px-3 py-2 border-2 border-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">{project.title}</h1>
              <p className="text-sm text-gray-600">
                {project.category ? `${project.category} project` : 'Project'}
              </p>
              {project.description && (
                <p className="text-sm text-gray-500 mt-2">{project.description}</p>
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 relative">
            {columns.map((column) => (
              <div key={column.id} className="relative">
                <div className="border-2 border-gray-400 bg-gray-50 min-h-[600px]">
                  {/* Column Header */}
                  <div className="border-b-2 border-gray-400 bg-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span>{column.title}</span>
                      <span className="text-sm text-gray-600">{column.tasks.length}</span>
                    </div>
                  </div>

                  {/* Task Cards */}
                  <div className="p-3 space-y-3">
                    {column.tasks.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                    ) : (
                      column.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="border-2 border-gray-400 bg-white p-4 hover:border-gray-600 cursor-pointer relative group"
                        >
                          <h4 className="mb-3 text-sm">{task.title}</h4>

                          {task.description && (
                            <p className="text-xs text-gray-500 mb-3">{task.description}</p>
                          )}

                          <div className="flex items-center justify-between text-xs mb-3">
                            <Badge className={`${getPriorityColor(task.priority)} border-2`}>
                              {task.priority}
                            </Badge>
                            <span className="text-gray-500">{formatDate(task.due_date)}</span>
                          </div>

                          {/* Status Toggle */}
                          <div className="pt-3 border-t border-gray-300 flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer text-xs">
                              <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={task.completed}
                                onChange={() => handleTaskToggle(task.id, task.completed)}
                              />
                              Complete
                            </label>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleTaskDelete(task.id)}
                              className="text-xs text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}
