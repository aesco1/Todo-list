import avatarIcon from './assets/user_icon.svg';
import addTaskIcon from './assets/add-circle.svg'
import allTasksIcon from './assets/checklist-icon.svg'
import projectTitleIcon from './assets/project-icon.svg'
import collabIcon from './assets/collab-icon.svg';
import peopleIcon from './assets/group-icon.svg';
import groupProjectIcon from './assets/group-project-icon.svg';


import { Store } from './store';

export class Sidebar{

    createUserArea(){
        const userAreaDiv = document.createElement('div');
        userAreaDiv.classList.add('user-area',  'sidebar-content-area');

        const avatar = document.createElement('img');
        avatar.src = avatarIcon;
        avatar.alt = 'User Avatar';
        avatar.classList.add('avatar');

        const userName = document.createElement('div');
        userName.classList.add('user-name');
        userName.textContent = "User";

        userAreaDiv.appendChild(avatar);
        userAreaDiv.appendChild(userName);
        
        return userAreaDiv;
    }

    createTasksArea(){
        const addTasksAreaDiv = document.createElement('div');
        addTasksAreaDiv.classList.add('task-area', 'sidebar-content-area');

        //Add task title
        const addTaskImage = document.createElement('img');
        addTaskImage.src = addTaskIcon;
        addTaskImage.alt = 'Add Task Image Icon';
        addTaskImage.classList.add('add-task-icon', 'sidebar-icon');

        const addTaskTitle = document.createElement('h1');
        addTaskTitle.classList.add('add-task-title', 'sidebar-title');
        addTaskTitle.textContent = "Add Task";

        //All Tasks Title
        const allTaskImage = document.createElement('img');
        allTaskImage.src = allTasksIcon;
        allTaskImage.alt = 'All Tasks Icon';
        allTaskImage.classList.add('all-tasks-icon', 'sidebar-icon');

        const allTaskTitle = document.createElement('h1');
        allTaskTitle.classList.add('all-task-title', 'sidebar-title');
        allTaskTitle.textContent = "All Tasks";

        addTasksAreaDiv.append(addTaskImage, addTaskTitle);
        addTasksAreaDiv.append(allTaskImage, allTaskTitle);
        
        return addTasksAreaDiv;
    }

    createProjectsArea(){
        const projectsAreaDiv = document.createElement('div');
        projectsAreaDiv.classList.add('project-area',  'sidebar-content-area');

        //Projects Main Title
        const projectAreaIcon = document.createElement('img');
        projectAreaIcon.src = projectTitleIcon;
        projectAreaIcon.alt = 'Project Area Icon';
        projectAreaIcon.classList.add('project-main-icon', 'sidebar-icon');

        const projectsTitle = document.createElement('h1');
        projectsTitle.classList.add('project-area-title', 'sidebar-title');
        projectsTitle.textContent = "Projects";
        
        //Iterate through projects
        const projectListContainer = document.createElement('div');
        projectListContainer.classList.add("proj-list-container", 'sidebar-content-area');

        const projects = Store.getProjects();
        
        projects.forEach(project => {
            const projectName = document.createElement('h2');
            projectName.textContent = project.name;
            projectListContainer.appendChild(projectName);
        }
        );

        //new project
        const newProjectContainer = document.createElement('div');
        newProjectContainer.classList.add('new-project-container', 'sidebar-title');
        //!!!!CHANGE MODAL TO A SEPERATE MODULE
        newProjectContainer.addEventListener('click', () => this.createProjectModal()); 

        projectsAreaDiv.append(projectsTitle, newProjectContainer, projectListContainer);
        
        
        return projectsAreaDiv;
    }

    createCollabArea(){
        const collabAreaDiv = document.createElement('div');
        collabAreaDiv.classList.add('collabArea', 'sidebar-content-area');

        //Collab title
        const collabImage = document.createElement('img');
        collabImage.src = collabIcon;
        collabImage.alt = 'Collaborate Icon';
        collabImage.classList.add('collab-icon', 'sidebar-icon');

        const collabTitle = document.createElement('h1');
        collabTitle.classList.add('collab-title', 'sidebar-title');
        collabTitle.textContent = "Collaborate";

        //People title
        const peopleImage = document.createElement('img');
        peopleImage.src = peopleIcon;
        peopleImage.alt = 'People Icon';
        peopleImage.classList.add('people-icon', 'sidebar-icon');

        const peopleTitle = document.createElement('h2');
        peopleTitle.classList.add('people-title', 'sidebar-subtitle');
        peopleTitle.textContent = "People";

        //Group Project title
        const groupProjectImage = document.createElement('img');
        groupProjectImage.src = groupProjectIcon;
        groupProjectImage.alt = 'Group Project Icon';
        groupProjectImage.classList.add('gp-icon', 'sidebar-icon');

        const groupProjectTitle = document.createElement('h2');
        groupProjectTitle.classList.add('gp-title', 'sidebar-subtitle' );
        groupProjectTitle.textContent = "Projects";

        collabAreaDiv.append(collabImage, collabTitle);
        collabAreaDiv.append(peopleImage, peopleTitle);
        collabAreaDiv.append(groupProjectImage, groupProjectTitle);
        
        return collabAreaDiv;
    }

    createProjectModal(){

    }

    render(){
        const sidebarDiv = document.createElement('div');

        sidebarDiv.append(this.createUserArea(), this.createTasksArea(), this.createProjectsArea(), this.createCollabArea(),);
        return sidebarDiv
    }
}