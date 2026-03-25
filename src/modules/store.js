import { parseISO, format } from 'date-fns';
const STORAGE_KEY = 'todo-projects';

function load(){
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function getAllTasks(){
  return projects.flatMap(p => p.tasks);
}

//Tasks factory function
function createTask(title, description, dueDate, priority) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate: parseISO(dueDate), // store as Date object
    priority,
    completed: false,
    createdAt: new Date(),
  };
}

let projects = load(); 

function getAllTasks() {
  return projects.flatMap(p => p.tasks);
}

export const Store = {

  //Projects
  getProjects() {
    return projects;
  },

  addProject(name) {
    projects.push({ id: crypto.randomUUID(), name, tasks: [] });
  },
  
  deleteProject(projectId) {
    projects = projects.filter(p => p.id !== projectId);
    save();
  },

  //Tasks
  addTask(projectId, title, description, dueDate, priorirt) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    project.tasks.push(createTask(title, description, dueDate, priority));
    save();
  },

  deleteTask(projectId, taskId){
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    project.tasks = project.tasks.filter(t => t.id !== taskId);
    save();
  },

  toggleComplete(projectId, taskId){
    const project = projects.find(p => p.id === projectid);
    if (!project) return;
    const task = project.tasks.find(t => t.id === taskId)
    task.completed = !task.completed;
    save();
  },

  //Filter views 
  getToday(){
    const today = format(new Date(), 'yyyy-MM-dd');
    return getAllTasks().filter(t => t.dueDate === today);
  },

  getOverdue(){
    const today = format(new Date(), 'yyyy-MM-dd');
    return getAllTasks().filter(t => t.dueDate < today && !t.completed)
  },

  getCompleted(){
    return getAllTasks().filter(t => t.completed);
  },
};