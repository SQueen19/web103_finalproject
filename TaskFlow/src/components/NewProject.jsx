import { ArrowLeft } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function NewProject({ onBack }) {

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

      {/* Form */}
      <div className="border-2 border-gray-400 bg-white">
        <div className="px-8 py-8 space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label>Project Name *</Label>
            <Input
              placeholder="Enter project name..."
              className="border-2 border-gray-400 focus:border-gray-600"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label>Project Description</Label>
            <Textarea
              placeholder="Enter project description..."
              rows={5}
              className="border-2 border-gray-400 focus:border-gray-600"
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
              />
            </div>

            {/* Target Completion Date */}
            <div className="space-y-2">
              <Label>Target Completion Date</Label>
              <Input
                type="date"
                className="border-2 border-gray-400 focus:border-gray-600"
              />
            </div>
          </div>

          {/* Project Category */}
          <div className="space-y-2">
            <Label>Project Category</Label>
            <Select>
              <SelectTrigger className="border-2 border-gray-400 focus:border-gray-600">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
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
            <Select defaultValue="planning">
              <SelectTrigger className="border-2 border-gray-400 focus:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
            onClick={onBack}
            className="px-6 py-2 border-2 border-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700">
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
