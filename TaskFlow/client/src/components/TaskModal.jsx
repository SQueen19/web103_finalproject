import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { createTask } from '../../services/tasksApi';

export function TaskModal({ isOpen, onClose, projectId, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium',
    status: 'todo',
    completed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Create task with project_id
      await createTask({
        ...formData,
        project_id: projectId
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        due_date: '',
        priority: 'medium',
        status: 'todo',
        completed: false
      });
      
      // Notify parent component
      onTaskCreated();
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form on close
    setFormData({
      title: '',
      description: '',
      due_date: '',
      priority: 'medium',
      status: 'todo',
      completed: false
    });
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-gray-600 max-w-2xl w-full relative">

        {/* Modal Header */}
        <div className="border-b-2 border-gray-400 px-6 py-4 flex items-center justify-between bg-gray-100">
          <h2>Add New Task</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 border-2 border-gray-600 hover:bg-gray-200 flex items-center justify-center"
            disabled={loading}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Modal Body */}
          <div className="px-6 py-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 border-2 border-red-400 bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Task Title */}
            <div className="space-y-2">
              <Label>Task Title *</Label>
              <Input
                placeholder="Enter task title..."
                className="border-2 border-gray-400 focus:border-gray-600"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter task description..."
                rows={4}
                className="border-2 border-gray-400 focus:border-gray-600"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Due Date and Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  className="border-2 border-gray-400 focus:border-gray-600"
                  value={formData.due_date}
                  onChange={(e) => handleChange('due_date', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select 
                  value={formData.priority}
                  onValueChange={(value) => handleChange('priority', value)}
                  disabled={loading}
                >
                  <SelectTrigger className="border-2 border-gray-400 focus:border-gray-600 bg-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
                disabled={loading}
              >
                <SelectTrigger className="border-2 border-gray-400 focus:border-gray-600 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="complete"
                checked={formData.completed}
                onCheckedChange={(checked) => handleChange('completed', checked)}
                disabled={loading}
              />
              <Label
                htmlFor="complete"
                className="cursor-pointer"
              >
                Mark as complete
              </Label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t-2 border-gray-400 px-6 py-4 flex justify-end gap-3 bg-gray-50">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border-2 border-gray-600 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}