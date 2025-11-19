import { LogOut } from "lucide-react";
import Avatar from "./Avatar";

export function Navbar({ logout, user }) {
  return (
    <div className="border-b-2 border-gray-400 bg-gray-100 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-gray-600 flex items-center justify-center">
            <span className="text-xs">TF</span>
          </div>
          <span className="tracking-wide">TaskFlow</span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{user?.username}</span>
            <Avatar user={user} />
          </div>
          <button 
            onClick={logout} 
            className="px-4 py-2 border-2 border-gray-600 hover:bg-gray-200 flex items-center gap-2"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}