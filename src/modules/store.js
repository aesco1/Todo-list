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
  return projects.flatMap(project => project.tasks);
}

//Tasks factory function
function createTask(title, description, dueDate, priority) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

let projects = load(); 

export const Store = {

  //Projects
  getProjects() {
    return projects;
  },

  addProject(name) {
    projects.push({ id: crypto.randomUUID(), name, tasks: [] });
    save();
  },
  
  deleteProject(projectId) {
    projects = projects.filter(project => project.id !== projectId);
    save();
  },

  //Tasks
  addTask(projectId, title, description, dueDate, priority) {
    const project = projects.find(project => project.id === projectId);
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
    const project = projects.find(project => project.id === projectId);
    if (!project) return;
    const task = project.tasks.find(task => task.id === taskId)
    task.completed = !task.completed;
    save();
  },

  //Filter views 
  getToday(){
    const today = format(new Date(), 'yyyy-MM-dd');
    return getAllTasks().filter(task => task.dueDate === today);
  },

  //upcoming
  getUpcoming(){
    const today = format(new Date(), 'yyyy-MM-dd');
    return getAllTasks().filter(task => task.dueDate > today);
  },


  getOverdue(){
    const today = format(new Date(), 'yyyy-MM-dd');
    return getAllTasks().filter(t => t.dueDate < today && !t.completed)
  },

  getCompleted(){
    return getAllTasks().filter(t => t.completed);
  },
};