import { ArrowLeft, Plus, Filter, SortAsc } from 'lucide-react';
import { useState } from 'react';
import { TaskModal } from './TaskModal';
import { Badge } from './ui/badge';

const mockTasks = [
  { id: '1', title: 'Design homepage mockup', priority: 'high', dueDate: '2025-11-10', status: 'todo' },
  { id: '2', title: 'Setup development environment', priority: 'medium', dueDate: '2025-11-08', status: 'todo' },
  { id: '3', title: 'Create user flow diagram', priority: 'high', dueDate: '2025-11-12', status: 'in-progress' },
  { id: '4', title: 'Database schema design', priority: 'medium', dueDate: '2025-11-15', status: 'in-progress' },
  { id: '5', title: 'Project kickoff meeting', priority: 'low', dueDate: '2025-11-05', status: 'done' },
  { id: '6', title: 'Requirements gathering', priority: 'high', dueDate: '2025-11-06', status: 'done' },
];

export function ProjectDetails({ onBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-gray-700 text-white border-gray-800';
      case 'medium': return 'bg-gray-400 text-gray-900 border-gray-500';
      default: return 'bg-gray-200 text-gray-700 border-gray-300';
    }
  };

  const columns = [
    { id: 'todo', title: 'To Do', tasks: mockTasks.filter(t => t.status === 'todo') },
    { id: 'in-progress', title: 'In Progress', tasks: mockTasks.filter(t => t.status === 'in-progress') },
    { id: 'done', title: 'Done', tasks: mockTasks.filter(t => t.status === 'done') },
  ];

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
                <input type="radio" name="sort" className="w-4 h-4" />
                Due Date
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="sort" className="w-4 h-4" />
                Priority
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="sort" className="w-4 h-4" />
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
                <input type="checkbox" className="w-4 h-4" />
                High
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                Medium
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
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
              <h1 className="mb-2">Website Redesign</h1>
              <p className="text-sm text-gray-600">Personal project</p>
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
            {columns.map((column, colIndex) => (
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
                    {column.tasks.map((task, taskIndex) => (
                      <div
                        key={task.id}
                        className="border-2 border-gray-400 bg-white p-4 hover:border-gray-600 cursor-pointer relative"
                      >

                        <h4 className="mb-3 text-sm">{task.title}</h4>

                        <div className="flex items-center justify-between text-xs">
                          <Badge className={`${getPriorityColor(task.priority)} border-2`}>
                            {task.priority}
                          </Badge>
                          <span className="text-gray-500">{task.dueDate}</span>
                        </div>

                        {/* Status Toggle */}
                        <div className="mt-3 pt-3 border-t border-gray-300">
                          <label className="flex items-center gap-2 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={task.status === 'done'}
                              readOnly
                            />
                            Complete
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
