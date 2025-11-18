import { Plus, Calendar } from 'lucide-react';
import { Progress } from './ui/progress';
import { useState, useEffect } from 'react';
import { getProjects } from '../../services/projectsApi';

export function Dashboard({ onSelectProject, onNewProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-gray-500">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-red-500">{error}</p>
        <button 
          onClick={fetchProjects}
          className="mx-auto block mt-4 px-4 py-2 border-2 border-gray-600 hover:bg-gray-100"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">All Projects</h1>
          <p className="text-gray-500 text-sm">Manage and view all your projects</p>
        </div>
        <button 
          onClick={onNewProject}
          className="px-6 py-3 bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700 flex items-center gap-2"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No projects yet</p>
          <button
            onClick={onNewProject}
            className="px-6 py-3 bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="border-2 border-gray-400 bg-white p-6 hover:border-gray-600 transition-colors relative"
            >
              {/* Annotation for first card */}
              {index === 0 && (
                <div className="absolute -top-6 left-0 text-[10px] text-gray-400 italic">
                  Project Card
                </div>
              )}

              {/* Project Title */}
              <div className="mb-4">
                <h3 className="mb-1">{project.title}</h3>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Calendar size={16} />
                <span>Due: {formatDate(project.due_date)}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* View Button */}
              <button
                onClick={() => onSelectProject(project.id)}
                className="w-full py-2 border-2 border-gray-600 hover:bg-gray-100 text-sm"
              >
                View Project →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
