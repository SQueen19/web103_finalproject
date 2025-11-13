import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ProjectDetails } from './components/ProjectDetails';
import { NewProject } from './components/NewProject';


export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {currentView === 'dashboard' && (
        <Dashboard 
          onSelectProject={handleSelectProject}
          onNewProject={handleNewProject}
        />
      )}
      
      {currentView === 'project' && (
        <ProjectDetails onBack={handleBackToDashboard} />
      )}

      {currentView === 'new-project' && (
        <NewProject onBack={handleBackToDashboard} />
      )}
    </div>
  );
}
