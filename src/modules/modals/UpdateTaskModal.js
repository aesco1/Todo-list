import Modal from './Modal';
import { Store } from '../store';

export default class UpdateTaskModal extends Modal{
    constructor(){
        super('update-task-modal');
        this.task = null;
        this.render();
        this.form = this.modal.querySelector('form');
        this.bindEvents();
    }
    
    open(task){
        this.task = task;
        this.task = task;
        this.modal.querySelector('#task-title').value = task.title;
        this.modal.querySelector('#description').value = task.description;
        this.modal.querySelector('#due-date').value = task.dueDate;
        this.modal.querySelector('#task-priority').value = task.priority;
        super.open();
    }

    render(){
        this.modal.innerHTML = `
        <form>
            <h2>Edit Task</h2>
            <input type="text" id="task-title" placeholder="Title" required />
            <textarea id="description" placeholder="Description"></textarea>
            <input type="date" id="due-date" required />
            <select id="task-priority" required> 
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="button" id="task-submit-btn">Save Changes</button>
        </form>
        `;
    }

    bindEvents(){
        const btn = this.modal.querySelector('#task-submit-btn');
        btn.addEventListener('click', () => this.handleSubmit());
    }

    handleSubmit(){
        console.log('handleSubmit fired');
        if (!this.isValid()) return;

        Store.updateTask(
            Store.activeProjectId,
            this.task.id,
            {
                title: this.modal.querySelector('#task-title').value,
                description: this.modal.querySelector('#description').value,
                dueDate: this.modal.querySelector('#due-date').value,
                priority: this.modal.querySelector('#task-priority').value,
            }
        );

        this.close();
        document.dispatchEvent(new CustomEvent('taskUpdated'));
    }
}