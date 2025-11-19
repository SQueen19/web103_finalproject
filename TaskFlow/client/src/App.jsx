import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ProjectDetails } from './components/ProjectDetails';
import { NewProject } from './components/NewProject';
import Login from './pages/Login';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, { credentials: 'include' })
      const json = await response.json()
      setUser(json.user)
    }

    getUser()
  }, [])

  const logout = async () => {
    const url = `${API_URL}/auth/logout`
    const response = await fetch(url, { credentials: 'include' })
    const json = await response.json()
    window.location.href = '/'
  }

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    setCurrentView('project');
  };

  const handleNewProject = () => {
    setCurrentView('new-project');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedProjectId(null);
  };

  // Show login page if user is not authenticated
  if (!user || !user.id) {
    return <Login api_url={API_URL} />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar logout={logout} user={user} />
      
      {currentView === 'dashboard' && (
        <Dashboard 
          onSelectProject={handleSelectProject}
          onNewProject={handleNewProject}
        />
      )}
      
      {currentView === 'project' && (
        <ProjectDetails 
          projectId={selectedProjectId} 
          onBack={handleBackToDashboard} 
        />
      )}

      {currentView === 'new-project' && (
        <NewProject onBack={handleBackToDashboard} user={user} />
      )}
    </div>
  );
}
