// Simple, dependency-free "View Tasks" page module.
// Exports a function that renders the task list from localStorage
// and provides actions to toggle completion and delete tasks.

export function ViewTasks(container) {
	container.innerHTML = `
		<section class="view-tasks">
			<h2>Your Tasks</h2>
			<div class="controls">
				<button id="refreshTasks">Refresh</button>
				<button id="clearTasks">Clear All</button>
			</div>
			<ul class="tasks-list" aria-live="polite"></ul>
			<p class="no-tasks">No tasks yet. Create one!</p>
		</section>
	`;

	const listEl = container.querySelector('.tasks-list');
	const noTasks = container.querySelector('.no-tasks');
	const refreshBtn = container.querySelector('#refreshTasks');
	const clearBtn = container.querySelector('#clearTasks');

	function readTasks() {
		try {
			return JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
		} catch (e) {
			return [];
		}
	}

	function writeTasks(tasks) {
		localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
	}

	function render() {
		const tasks = readTasks();
		listEl.innerHTML = '';
		if (!tasks || tasks.length === 0) {
			noTasks.style.display = 'block';
			return;
		}
		noTasks.style.display = 'none';

		tasks.forEach((t) => {
			const li = document.createElement('li');
			li.className = 'task-item' + (t.completed ? ' completed' : '');
			li.innerHTML = `
				<div class="task-main">
					<input type="checkbox" class="toggle-completed" data-id="${t.id}" ${t.completed ? 'checked' : ''} />
					<div class="task-content">
						<div class="task-title">${escapeHtml(t.title)}</div>
						<div class="task-meta">${t.due ? 'Due: ' + escapeHtml(t.due) : ''}</div>
						<div class="task-desc">${escapeHtml(t.description || '')}</div>
					</div>
				</div>
				<div class="task-actions">
					<button class="delete" data-id="${t.id}">Delete</button>
				</div>
			`;

			listEl.appendChild(li);
		});

		// attach handlers
		listEl.querySelectorAll('.toggle-completed').forEach(cb => {
			cb.addEventListener('change', (e) => {
				const id = e.target.getAttribute('data-id');
				const tasks = readTasks();
				const idx = tasks.findIndex(x => x.id === id);
				if (idx >= 0) {
					tasks[idx].completed = e.target.checked;
					writeTasks(tasks);
					render();
				}
			});
		});

		listEl.querySelectorAll('.delete').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const id = e.target.getAttribute('data-id');
				let tasks = readTasks();
				tasks = tasks.filter(x => x.id !== id);
				writeTasks(tasks);
				render();
			});
		});
	}

	refreshBtn.addEventListener('click', render);

	clearBtn.addEventListener('click', () => {
		if (!confirm('Clear all tasks?')) return;
		writeTasks([]);
		render();
	});

	render();
}

function escapeHtml(s) {
	if (!s) return '';
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export default ViewTasks;
