import {Store} from 'store'
import projectTitleIcon from '../assets/icons/project-icon.svg'

export class ProjectsPage{ 
    render(){
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

        const projects = Store.getProjects();
        
        projects.forEach(project => {
            const projectName = document.createElement('h3');
            projectName.textContent = project.name;
            projectListContainer.appendChild(projectName);
            }
        );

        //new project
        const newProjectContainer = document.createElement('button');
        newProjectContainer.classList.add('new-project-container', 'sidebar-title');
        newProjectContainer.textContent = "New Project +"
        newProjectContainer.addEventListener('click', () => this.displayNewProjectModal()); 

        projectsAreaDiv.append(projectsIconTitleContainer, projectListContainer, newProjectContainer, );
        
        
        return projectsAreaDiv;
    } 

   
}
