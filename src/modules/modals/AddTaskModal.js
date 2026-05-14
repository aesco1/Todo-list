import Modal from './Modal';
import { Store } from '../store';

export default class AddTaskModal extends Modal{
    constructor(){
        super('task-modal');
        this.render();
        this.form = this.modal.querySelector('form');
        this.bindEvents();
    }
    
    open(){
        super.open();
    }

    render(){
        this.modal.innerHTML = `
        <form>
            <h2>New Task</h2>
            <input type="text" id="task-title" placeholder="Title" required />
            <textarea id="description" placeholder="Description"></textarea>
            <input type="date" id="due-date" required />
            <select id="task-priority" required> 
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="button" id="task-submit-btn">Add Task</button>
        </form>
        `;
    }

    bindEvents(){
        document.getElementById('task-submit-btn').addEventListener('click', () => {
            this.handleSubmit();
        });
    }

    handleSubmit(){
        if (!this.isValid()) return;

        Store.addTask(
            Store.activeProjectID,
            document.getElementById('task-title').value,
            document.getElementById('description').value,
            document.getElementById('due-date').value,
            document.getElementById('task-priority').value,
        )

        this.close();
    }
    
}