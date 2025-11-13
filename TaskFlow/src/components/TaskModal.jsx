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

export function TaskModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-gray-600 max-w-2xl w-full relative">
        {/* Annotation */}
        <div className="absolute -top-8 left-0 text-[10px] text-gray-300 italic">
          Task Modal (Overlay)
        </div>

        {/* Modal Header */}
        <div className="border-b-2 border-gray-400 px-6 py-4 flex items-center justify-between bg-gray-100">
          <h2>Add New Task</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-gray-600 hover:bg-gray-200 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label>Task Title *</Label>
            <Input
              placeholder="Enter task title..."
              className="border-2 border-gray-400 focus:border-gray-600"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter task description..."
              rows={4}
              className="border-2 border-gray-400 focus:border-gray-600"
            />
          </div>

          {/* Due Date and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                className="border-2 border-gray-400 focus:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select>
                <SelectTrigger className="border-2 border-gray-400 focus:border-gray-600">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="complete" />
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
            onClick={onClose}
            className="px-6 py-2 border-2 border-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700">
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}