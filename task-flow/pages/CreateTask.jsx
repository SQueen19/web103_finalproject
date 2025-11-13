// Simple, dependency-free "Create Task" page module.
// Exports a function that renders a task creation form into a container element
// and saves tasks into localStorage under the key `taskflow_tasks`.

export function CreateTask(container, onCreated) {
	container.innerHTML = `
		<section class="create-task">
			<h2>Create Task</h2>
			<form id="createTaskForm" class="create-form">
				<label class="field">Title
					<input name="title" required maxlength="100" />
				</label>
				<label class="field">Description
					<textarea name="description" rows="3"></textarea>
				</label>
				<label class="field">Due date
					<input type="date" name="due" />
				</label>
				<div class="actions">
					<button type="submit">Create Task</button>
				</div>
			</form>
			<p class="message" aria-live="polite"></p>
		</section>
	`;

	const form = container.querySelector('#createTaskForm');
	const message = container.querySelector('.message');

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

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(form);
		const title = (fd.get('title') || '').toString().trim();
		if (!title) {
			message.textContent = 'Please enter a title.';
			return;
		}

		const task = {
			id: Date.now().toString(),
			title,
			description: (fd.get('description') || '').toString().trim(),
			due: fd.get('due') || '',
			completed: false,
			createdAt: new Date().toISOString(),
		};

		const tasks = readTasks();
		tasks.unshift(task);
		writeTasks(tasks);

		message.textContent = 'Task created.';
		form.reset();

		// small delay so user sees feedback, then call callback if provided
		setTimeout(() => {
			message.textContent = '';
			if (typeof onCreated === 'function') onCreated(task);
		}, 500);
	});
}

export default CreateTask;
