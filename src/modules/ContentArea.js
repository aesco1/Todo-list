import { Store } from './store';
import { AddTaskModal } from './modals/index';
import { UpdateTaskModal } from './modals/index';

export class ContentArea {
     constructor(taskModal, updateTaskModal){
          this.taskModal = taskModal;
          this.updateTaskModal = updateTaskModal;
          document.addEventListener('taskAdded', () => this.rerender());
          document.addEventListener('taskUpdated', () => this.rerender());
          document.addEventListener('projectSelected', () => this.rerender());
     }

     createTaskItem(task) {
          const li = document.createElement('li');
          li.classList.add('task-item');

          const titleRow = document.createElement('div');
          titleRow.classList.add('task-title-row');

          const title = document.createElement('span');
          title.classList.add('task-title');
          title.textContent = task.title;

          const chevron = document.createElement('span');
          chevron.classList.add('task-chevron');
          chevron.textContent = '›';

          titleRow.append(title, chevron);

          const details = document.createElement('div');
          details.classList.add('task-details');

          const detailsInner = document.createElement('div');
          detailsInner.classList.add('task-details-inner');

          const description = document.createElement('p');
          description.classList.add('task-description');
          description.textContent = task.description || 'No description';

          const meta = document.createElement('div');
          meta.classList.add('task-meta');

          const dueDate = document.createElement('span');
          dueDate.textContent = `Due: ${task.dueDate}`;

          const priority = document.createElement('span');
          priority.classList.add(`priority-${task.priority}`);
          priority.textContent = task.priority;

          meta.append(dueDate, priority);

          const actions = document.createElement('div');
          actions.classList.add('task-actions');

          const completeBtn = document.createElement('button');
          completeBtn.classList.add('task-btn', 'complete-btn');
          completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
          completeBtn.addEventListener('click', (e) => {
               e.stopPropagation();
               Store.toggleComplete(Store.activeProjectId, task.id);
               this.rerender();
          });

          const deleteBtn = document.createElement('button');
          deleteBtn.classList.add('task-btn', 'delete-btn');
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', (e) => {
               e.stopPropagation();
               Store.deleteTask(Store.activeProjectId, task.id);
               this.rerender();
          });

          const editBtn = document.createElement('button');
          editBtn.classList.add('task-btn', 'edit-btn');
          editBtn.textContent = 'Edit';
          editBtn.addEventListener('click', (e) => {
               e.stopPropagation();
               this.updateTaskModal.open(task);
               this.rerender();
          });

          actions.append(completeBtn, deleteBtn, editBtn);
          detailsInner.append(meta, actions);
          details.appendChild(detailsInner);
          li.append(titleRow, description, details);

          titleRow.addEventListener('click', () => {
               details.classList.toggle('expanded');
               chevron.classList.toggle('rotated');
          });

          if (task.completed) li.classList.add('task-completed');

          return li;
     }

     createSection(title,tasks, emptyMessage){
          const container = document.createElement('div');
          container.classList.add('section-container');

          const header = document.createElement('h2');
          header.classList.add('section-header');
          header.textContent = title;

          const list = document.createElement('ul');
          list.classList.add('task-list');

          if (tasks.length === 0) {
               const empty = document.createElement('li');
               empty.classList.add('empty-placeholder');
               empty.textContent = emptyMessage;
               list.appendChild(empty);
          } else {
               tasks.forEach(task => list.appendChild(this.createTaskItem(task)));
          }

          container.append(header, list);
          return container;   
     }

     renderProjectView() {
          console.log('active id:', Store.activeProjectId);
          console.log('projects:', Store.getProjects());
          const project = Store.getProjects().find(p => p.id === Store.activeProjectId);
          console.log('found project:', project);
          if (!project) return document.createElement('div');

          const today = new Date().toISOString().split('T')[0];

          const todayTasks = project.tasks.filter(t => t.dueDate === today);
          const upcomingTasks = project.tasks.filter(t => t.dueDate > today);

          const container = document.createElement('div');
          container.classList.add('project-view');

          const header = document.createElement('h1');
          header.classList.add('project-view-header');
          header.textContent = project.name;

          const addTaskButton = document.createElement('button');
          addTaskButton.classList.add('add-task-btn');
          addTaskButton.textContent = '+ Add Task';
          addTaskButton.addEventListener('click', () => this.taskModal.open());

          container.append(
               header,
               this.createSection('Today', todayTasks, 'Nothing for today'),
               this.createSection('Upcoming', upcomingTasks, 'Nothing upcoming'),
               addTaskButton,
          );

          return container;
     }

  rerender() {
     console.log('Rerender triggered');
     const contentEl = document.getElementById('content');
     contentEl.innerHTML = '';
     contentEl.appendChild(this.render());
  }

  render() {
    const contentParent = document.createElement('div');
    contentParent.classList.add('content-area');
    contentParent.appendChild(this.renderProjectView());
    return contentParent;
  }
}    