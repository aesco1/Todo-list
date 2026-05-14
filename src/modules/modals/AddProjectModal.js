import Modal from './Modal';
import { Store } from '../store';

export default class AddProjectModal extends Modal {
  constructor() {
    super('project-modal');
    this.render();
    this.form = this.modal.querySelector('form');
    this.bindEvents();
  }

  render() {
    this.modal.innerHTML = `
      <form>
        <h2>New Project</h2>
        <input type="text" id="project-name" placeholder="Project name" required />
        <button type="button" id="project-submit-btn">Add Project</button>
      </form>
    `;
  }

  bindEvents() {
    document.getElementById('project-submit-btn').addEventListener('click', () => {
      this.handleSubmit();
    });
  }

  handleSubmit() {
    if (!this.isValid()) return;

    Store.addProject(
      document.getElementById('project-name').value,
    );

    this.close();
  }
}