import './styles.css';
import { Store } from './modules/store.js';
import { Sidebar } from './modules/populateSide.js'
import { ContentArea } from './modules/ContentArea.js';
import { AddTaskModal, AddProjectModal, UpdateTaskModal } from './modules/modals/index.js';

const taskModal = new AddTaskModal();
const projectModal = new AddProjectModal();
const updateTaskModal = new UpdateTaskModal();

const sidebarElement = document.getElementById('sidebar');
const sidebarInstance = new Sidebar(taskModal, projectModal);
sidebarElement.append(sidebarInstance.render());

const contentElement = document.getElementById('content');
const contentInstance = new ContentArea(taskModal, updateTaskModal);
contentElement.append(contentInstance.render());
