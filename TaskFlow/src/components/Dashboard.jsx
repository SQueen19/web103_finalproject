import { Plus, Calendar } from 'lucide-react';
import { Progress } from './ui/progress';

const mockProjects = [
  { id: '1', title: 'Website Redesign', dueDate: 'Dec 15, 2025', progress: 65 },
  { id: '2', title: 'Mobile App Development', dueDate: 'Jan 20, 2026', progress: 30 },
  { id: '3', title: 'Marketing Campaign', dueDate: 'Nov 30, 2025', progress: 90 },
  { id: '4', title: 'Product Launch', dueDate: 'Dec 31, 2025', progress: 45 },
  { id: '5', title: 'Q4 Planning', dueDate: 'Nov 15, 2025', progress: 15 },
  { id: '6', title: 'Client Onboarding', dueDate: 'Nov 25, 2025', progress: 80 },
];

export function Dashboard({ onSelectProject, onNewProject }) {
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="border-2 border-gray-400 bg-white p-6 hover:border-gray-600 transition-colors relative"
          >
            {/* Annotation for first card */}
            {project.id === '1' && (
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
              <span>Due: {project.dueDate}</span>
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
    </div>
  );
}
