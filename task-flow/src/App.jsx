import { useEffect, useRef, useState } from 'react'
import renderCreateTask from '../pages/CreateTask'
import renderViewTasks from '../pages/ViewTasks'
import '../pages/CreateTask.css'
import '../pages/ViewTasks.css'
import './App.css'

function App() {
  const [page, setPage] = useState(null) // null | 'create' | 'view'
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // clear container before rendering
    container.innerHTML = ''

    if (page === 'create') {
      // renderCreateTask(container, onCreated)
      renderCreateTask(container, () => setPage('view'))
    } else if (page === 'view') {
      renderViewTasks(container)
    }
    // if page is null we leave container empty (shows welcome message)
  }, [page])

  return (
    <div style={{ padding: 12 }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to Taskflow</h1>

      <div style={{ gap: '10px', display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <button onClick={() => setPage('create')}>Create Task</button>
        <button onClick={() => setPage('view')}>View all Tasks</button>
        <button onClick={() => setPage(null)}>Home</button>
      </div>

      <div ref={containerRef} style={{ marginTop: 20 }} />
    </div>
  )
}

export default App
