import { ArrowLeft } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { createProject } from '../../services/projectsApi';

export function NewProject({ onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    due_date: '',
    category: '',
    status: 'planning',
    progress: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError('Project name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createProject(formData);
      // Success - go back to dashboard
      onBack();
    } catch (err) {
      setError('Failed to create project. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-3 py-2 border-2 border-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        
        <div className="relative">
          <h1 className="mb-2">Create New Project</h1>
          <p className="text-gray-500 text-sm">Fill in the details below to create a new project</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 border-2 border-red-400 bg-red-50 text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-gray-400 bg-white">
          <div className="px-8 py-8 space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input
                placeholder="Enter project name..."
                className="border-2 border-gray-400 focus:border-gray-600"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label>Project Description</Label>
              <Textarea
                placeholder="Enter project description..."
                rows={5}
                className="border-2 border-gray-400 focus:border-gray-600"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            {/* Project Details Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Start Date */}
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  className="border-2 border-gray-400 focus:border-gray-600"
                  value={formData.start_date}
                  onChange={(e) => handleChange('start_date', e.target.value)}
                />
              </div>

              {/* Target Completion Date */}
              <div className="space-y-2">
                <Label>Target Completion Date</Label>
                <Input
                  type="date"
                  className="border-2 border-gray-400 focus:border-gray-600"
                  value={formData.due_date}
                  onChange={(e) => handleChange('due_date', e.target.value)}
                />
              </div>
            </div>

            {/* Project Category */}
            <div className="space-y-2">
              <Label>Project Category</Label>
              <Select 
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className="border-2 border-gray-400 focus:border-gray-600 bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Status */}
            <div className="space-y-2">
              <Label>Initial Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger className="border-2 border-gray-400 focus:border-gray-600 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Footer */}
          <div className="border-t-2 border-gray-400 px-8 py-4 flex justify-end gap-3 bg-gray-50">
            <button
              type="button"
              onClick={onBack}
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
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
