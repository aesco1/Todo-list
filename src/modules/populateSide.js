import avatarIcon from './assets/user_icon.svg';
import { Store } from './store';

export class Sidebar{

    createUserArea(){
        const userAreaDiv = document.createElement('div');
        userAreaDiv.classList.add('user-area')

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

    createProjectsArea(){
        const projectsAreaDiv = document.createElement('div');
        projectsAreaDiv.classList.add('project-area')

        const projectsTitle = document.createElement('h1');
        projectsTitle.classList.add('project-area-title');
        projectsTitle.textContent = "Projects";
        

        const projectListContainer = document.createElement('div');
        projectListContainer.classList.add("proj-list-container");

        //Add logic to iterate through store and display projects
        const projects = Store.getProjects();
        
        projects.forEach((project) =>{
            const projectName = document.createElement('h2');
            projectName.textContent = project.name;
            projectListContainer.appendChild(projectName);
        }
        );

        projectsAreaDiv.appendChild(projectsTitle);
        projectsAreaDiv.appendChild(projectListContainer);
        
        
        return projectsAreaDiv;
    }

    createUserArea(){
        const userAreaDiv = document.createElement('div');
        userAreaDiv.classList.add('userArea')

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

    render(){

    }
}