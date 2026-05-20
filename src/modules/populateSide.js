import avatarIcon from '../assets/icons/user_icon.svg';
import addTaskIcon from '../assets/icons/add-circle.svg'
import allTasksIcon from '../assets/icons/checklist-icon.svg'
import collabIcon from '../assets/icons/collab-icon.svg';
import peopleIcon from '../assets/icons/group-icon.svg';
import groupProjectIcon from '../assets/icons/group-project-icon.svg';
import projectTitleIcon from '../assets/icons/project-icon.svg';

import { Store } from './store';
import { AddTaskModal, AddProjectModal } from './modals/index.js';

export class Sidebar{
    constructor(taskModal, projectModal){
        this.taskModal = taskModal;
        this.projectModal = projectModal;
        document.addEventListener('projectAdded', () => this.rerender());
        document.addEventListener('projectDeleted', () => this.rerender());
    }

    createUserArea(){
        const userAreaDiv = document.createElement('div');
        userAreaDiv.classList.add('user-area',  'sidebar-content-area');

        const avatarUserDiv = document.createElement('div');
        avatarUserDiv.classList.add('user-avatar-area');

        const avatar = document.createElement('div');
        avatar.innerHTML = avatarIcon;
        avatar.classList.add('avatar');

        const userName = document.createElement('div');
        userName.classList.add('user-name');
        userName.textContent = "User";

        avatarUserDiv.append(avatar, userName);
        userAreaDiv.appendChild(avatarUserDiv);
        
        return userAreaDiv;
    }

    createTasksArea(){
        const tasksAreaContainer = document.createElement('div');
        tasksAreaContainer.classList.add('task-area', 'sidebar-content-area');

        const addTaskContainer = document.createElement('button');
        addTaskContainer.classList.add('icon-title-container', 'add-task-button');

        const addTaskImage = document.createElement('div');
        addTaskImage.innerHTML = addTaskIcon;
        addTaskImage.classList.add('add-task-icon', 'sidebar-icon');

        const addTaskTitle = document.createElement('h1');
        addTaskTitle.classList.add('add-task-title', 'sidebar-title');
        addTaskTitle.textContent = "Add Task";

        addTaskContainer.append(addTaskImage, addTaskTitle);
        addTaskContainer.addEventListener('click', () => this.taskModal.open());

        //All Tasks Title
        const allTaskContainer = document.createElement('button');
        allTaskContainer.classList.add('icon-title-container', 'all-tasks-container');

        const allTaskImage = document.createElement('div');
        allTaskImage.innerHTML = allTasksIcon;
        allTaskImage.classList.add('all-tasks-icon', 'sidebar-icon');

        const allTaskTitle = document.createElement('h1');
        allTaskTitle.classList.add('all-task-title', 'sidebar-title');
        allTaskTitle.textContent = "All Tasks";

        allTaskContainer.append(allTaskImage, allTaskTitle);

        //Append to main section div
        tasksAreaContainer.append(addTaskContainer, allTaskContainer);
        
        return tasksAreaContainer;
    }

    createProjectsArea(){
        const projectsAreaDiv = document.createElement('div');
        projectsAreaDiv.classList.add('project-area',  'sidebar-content-area');

        //Projects Main Title
        const projectsIconTitleContainer = document.createElement('div');
        projectsIconTitleContainer.classList.add('icon-title-container');

        const projectAreaIcon = document.createElement('div');
        projectAreaIcon.innerHTML = projectTitleIcon;
        projectAreaIcon.classList.add('project-main-icon', 'sidebar-icon');

        const projectsTitle = document.createElement('h1');
        projectsTitle.classList.add('project-area-title', 'sidebar-title');
        projectsTitle.textContent = "Projects";
        
        projectsIconTitleContainer.append(projectAreaIcon, projectsTitle);

        //Iterate through projects
        const projectListContainer = document.createElement('div');
        projectListContainer.classList.add("proj-list-container");

       Store.getProjects().forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');

            const projectName = document.createElement('button');
            projectName.classList.add('project-title');
            projectName.textContent = project.name;

            //Clicking proj sets it as active
            projectName.addEventListener('click', () => {
                Store.activeProjectId = project.id;
                document.dispatchEvent( new CustomEvent('projectSelected'));
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('project-delete-btn');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                Store.deleteProject(project.id);
                document.dispatchEvent(new CustomEvent('projectDeleted'));
            });

            projectItem.append(projectName, deleteBtn);
            projectListContainer.appendChild(projectItem);
        });
        
        //new project
        const newProjectContainer = document.createElement('button');
        newProjectContainer.classList.add('new-project-container', 'sidebar-title');
        newProjectContainer.textContent = "New Project +"
        newProjectContainer.addEventListener('click', () => this.projectModal.open()); 

        projectsAreaDiv.append(projectsIconTitleContainer, projectListContainer, newProjectContainer, );
        
        
        return projectsAreaDiv;
    }

    createPeopleArea(){
        
        //People title
        const peopleIconTitleContainer = document.createElement('button');
        peopleIconTitleContainer.classList.add('icon-title-container', 'people-container');

        const peopleImage = document.createElement('div');
        peopleImage.innerHTML = peopleIcon;
        peopleImage.classList.add('people-icon', 'sidebar-icon');

        const peopleTitle = document.createElement('h1');
        peopleTitle.classList.add('people-title', 'sidebar-subtitle');
        peopleTitle.textContent = "People";

        peopleIconTitleContainer.append(peopleImage, peopleTitle, );
        
        return peopleIconTitleContainer;
    }

    createGroupProjectsArea(){
        //Group Project title
        const groupProjIconTitleContainer = document.createElement('button');
        groupProjIconTitleContainer.classList.add('icon-title-container', 'group-proj-area');

        const groupProjectImage = document.createElement('div');
        groupProjectImage.innerHTML  = groupProjectIcon;
        groupProjectImage.classList.add('gp-icon', 'sidebar-icon');

        const groupProjectTitle = document.createElement('h1');
        groupProjectTitle.classList.add('gp-title', 'sidebar-subtitle' );
        groupProjectTitle.textContent = "Collaborate";

        groupProjIconTitleContainer.append(groupProjectImage, groupProjectTitle);
        return groupProjIconTitleContainer;
    }

    render(){
        const sidebarDiv = document.createElement('div');

        sidebarDiv.append(
            this.createUserArea(),
            this.createTasksArea(),
            this.createProjectsArea(),
            this.createPeopleArea(),
            this.createGroupProjectsArea()
        );
        return sidebarDiv;
    }

    rerender(){
        console.log('Rerender triggered');
        const sidebarElement = document.getElementById('sidebar');
        sidebarElement.innerHTML = '';
        sidebarElement.appendChild(this.render());
    }
}